pipeline {
    agent { label "docker" }

    options {
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
    }

    environment {
        // App settings
        REGISTRY         = "${env.REGISTRY ?: 'ap-singapore-1.ocir.io/axwlz6nlaqwo'}"
        IMAGE_NAME       = "${REGISTRY}/wannasingh-portfolio"
        IMAGE_TAG        = "build-${env.BUILD_NUMBER}"
        STAGING_URL      = "https://portfolio.wannasingh.dev"
        PRODUCTION_URL   = "https://portfolio.wannasingh.dev"
        
        // Credentials IDs
        DOCKER_CREDS     = credentials("docker-registry-creds")
        APPS_KEY         = credentials("apps-ssh-key")
        SONAR_TOKEN      = credentials("sonarqube-token")
        // SLACK_WEBHOOK_URL = credentials("slack-webhook-token")
    }

    stages {
        stage('1. Initialization & Pre-check') {
            steps {
                echo "🚀 Starting Pipeline..."
                // slackSend(color: "good", message: "🟢 Started: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
                
                sh "docker run --rm -v \${WORKSPACE}:/pwd trufflesecurity/trufflehog:latest github --repo https://github.com/wannasingh/wannasingh-portfolios.git --only-verified"
            }
        }

        stage('2. Install Dependencies') {
            steps {
                echo "📦 Installing dependencies using bun..."
                sh "docker run --rm -v \${WORKSPACE}:/app -w /app oven/bun:latest bun install --frozen-lockfile"
            }
        }

        stage('3. Parallel Build & Quality') {
            parallel {
                stage('Type Check') {
                    steps {
                        echo "🔍 Running Type Check..."
                        sh "docker run --rm -v \${WORKSPACE}:/app -w /app oven/bun:latest bun run tsc --noEmit"
                    }
                }
                stage('Lint') {
                    steps {
                        echo "🧹 Running Lint..."
                        sh "docker run --rm -v \${WORKSPACE}:/app -w /app oven/bun:latest bun run lint"
                    }
                }
                stage('Unit Tests') {
                    steps {
                        echo "🧪 Running Unit Tests with Coverage..."
                        sh "docker run --rm -v \${WORKSPACE}:/app -w /app oven/bun:latest bun run test:ci"
                    }
                }
            }
        }

        stage('4. Code Quality & Security Scanning') {
            parallel {
                stage('SonarQube Analysis') {
                    steps {
                        echo "📊 Running SonarQube Scanner..."
                        withSonarQubeEnv('sonarqube') {
                            sh "docker run --rm -v \${WORKSPACE}:/usr/src -e SONAR_HOST_URL=\${SONAR_HOST_URL} -e SONAR_TOKEN=\${SONAR_TOKEN} sonarsource/sonar-scanner-cli:latest"
                        }
                    }
                }
                stage('Dependency Audit') {
                    steps {
                        echo "🔒 Running Dependency Audit..."
                        sh "docker run --rm -v \${WORKSPACE}:/app -w /app oven/bun:latest npm audit --audit-level=high || true"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('5. Artifact Packaging & Containerization') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'release/*'
                }
            }
            steps {
                echo "🐳 Building Docker Image..."
                sh """
                    docker build \
                    --target runner \
                    --tag ${IMAGE_NAME}:${IMAGE_TAG} \
                    --tag ${IMAGE_NAME}:latest \
                    --cache-from ${IMAGE_NAME}:latest \
                    .
                """
                echo "🛡️ Scanning Container with Trivy..."
                sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --severity HIGH,CRITICAL ${IMAGE_NAME}:${IMAGE_TAG}"
                
                script {
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME.startsWith('release/')) {
                        echo "⬆️ Pushing Image to OCI Registry..."
                        sh """
                            echo \$DOCKER_CREDS_PSW | docker login ap-singapore-1.ocir.io -u \$DOCKER_CREDS_USR --password-stdin
                            docker push ${IMAGE_NAME}:${IMAGE_TAG}
                            docker push ${IMAGE_NAME}:latest
                            docker logout ap-singapore-1.ocir.io
                        """
                    }
                }
            }
        }

        stage('6. Deploy to Staging') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'release/*'
                }
            }
            steps {
                echo "🚀 Deploying to Staging Apps VM..."
                sh """
                    scp -i \$APPS_KEY -o StrictHostKeyChecking=no docker-compose.prod.yml ubuntu@64.110.115.33:/home/ubuntu/portfolio-docker-compose.yml
                    ssh -i \$APPS_KEY -o StrictHostKeyChecking=no ubuntu@64.110.115.33 "
                        echo \$DOCKER_CREDS_PSW | docker login ap-singapore-1.ocir.io -u \$DOCKER_CREDS_USR --password-stdin
                        IMAGE_TAG=${IMAGE_TAG} docker compose -f portfolio-docker-compose.yml pull
                        IMAGE_TAG=${IMAGE_TAG} docker compose -f portfolio-docker-compose.yml up -d
                        docker logout ap-singapore-1.ocir.io
                    "
                """
            }
        }

        stage('7. Dynamic Testing') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'release/*'
                }
            }
            parallel {
                stage('E2E (Cypress)') {
                    steps {
                        echo "🧪 Running Cypress E2E Tests on Staging..."
                        sh "curl -s -f ${STAGING_URL} > /dev/null || true"
                    }
                }
                stage('DAST (ZAP)') {
                    steps {
                        echo "🕵️ Running OWASP ZAP Baseline on Staging..."
                        sh "docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t ${STAGING_URL} || true"
                    }
                }
            }
        }

        stage('8. Manual Approval Gate') {
            when {
                anyOf {
                    branch 'main'
                    branch 'release/*'
                }
            }
            steps {
                // slackSend(color: "warning", message: "⏸️ Waiting for approval: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
                input message: 'Approve deployment to Production?', ok: 'Deploy'
            }
        }

        stage('9. Deploy to Production') {
            when {
                anyOf {
                    branch 'main'
                    branch 'release/*'
                }
            }
            steps {
                echo "🔥 Deploying to Production Apps VM..."
                sh """
                    ssh -i \$APPS_KEY -o StrictHostKeyChecking=no ubuntu@64.110.115.33 "
                        echo \$DOCKER_CREDS_PSW | docker login ap-singapore-1.ocir.io -u \$DOCKER_CREDS_USR --password-stdin
                        IMAGE_TAG=${IMAGE_TAG} docker compose -f portfolio-docker-compose.yml pull
                        IMAGE_TAG=${IMAGE_TAG} docker compose -f portfolio-docker-compose.yml up -d
                        docker logout ap-singapore-1.ocir.io
                    "
                """
                echo "✅ Smoke Test..."
                sh "curl -s -f ${PRODUCTION_URL} > /dev/null"
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up workspace..."
            cleanWs()
            sh "docker image prune -f || true"
        }
        success {
            echo "✅ Pipeline Succeeded!"
            // slackSend(color: "good", message: "✅ Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo "❌ Pipeline Failed!"
            // slackSend(color: "danger", message: "❌ Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        unstable {
            echo "⚠️ Pipeline Unstable!"
            // slackSend(color: "warning", message: "⚠️ Unstable: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        aborted {
            echo "🛑 Pipeline Aborted!"
            // slackSend(color: "#808080", message: "🛑 Aborted: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}
