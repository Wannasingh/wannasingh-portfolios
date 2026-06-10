pipeline {
    agent none

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
            agent {
                docker {
                    image 'oven/bun:latest'
                    alwaysPull true
                    args '-u root'
                }
            }
            steps {
                sh 'bun install --ignore-scripts'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'oven/bun:latest'
                    alwaysPull true
                    args '-u root'
                }
            }
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
            agent {
                docker {
                    image 'oven/bun:latest'
                    alwaysPull true
                    args '-u root'
                }
            }
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
            node {
                // Clean workspace to avoid disk space buildup
                cleanWs()
            }
        }
    }
}
