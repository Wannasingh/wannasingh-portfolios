pipeline {
    agent {
        docker {
            image 'oven/bun:latest'
            alwaysPull true
            // Run container as root to avoid permission issues in Jenkins workspace
            args '-u root'
        }
    }

    environment {
        // Load credentials configured in Jenkins (Manage Jenkins -> Credentials)
        VERCEL_TOKEN      = credentials('VERCEL_TOKEN')
        VERCEL_ORG_ID     = credentials('VERCEL_ORG_ID')
        VERCEL_PROJECT_ID = credentials('VERCEL_PROJECT_ID')
        // Disable Next.js telemetry
        NEXT_TELEMETRY_DISABLED = '1'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'bun install --ignore-scripts'
            }
        }

        stage('Build') {
            steps {
                sh 'bun run build'
            }
        }

        stage('Lint') {
            agent {
                docker {
                    image 'node:20-slim'
                    args '-u root'
                }
            }
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:20-slim'
                    args '-u root'
                }
            }
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy to Vercel') {
            when {
                branch 'main'
            }
            steps {
                // Deploy to Vercel Production using Vercel CLI
                // The Vercel CLI automatically detects VERCEL_ORG_ID and VERCEL_PROJECT_ID from the environment variables.
                sh 'bun x vercel deploy --prod --token=$VERCEL_TOKEN'
            }
        }
    }

    post {
        always {
            // Clean workspace to avoid disk space buildup
            cleanWs()
        }
    }
}
