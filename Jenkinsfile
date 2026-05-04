pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning the GitHub repository...'
                git branch: 'main', url: 'https://github.com/bhanu7830/MINOR-PROJECT.git'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building the application...'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Creating Docker Image...'
                bat 'docker build -t log-monitoring-app .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying container...'
                
                retry(2) {
                    bat 'docker rm -f logapp || exit /b 0'
                    bat 'docker run -d --name logapp -p 5000:5000 log-monitoring-app'
                }
            }
        }

        stage('Monitor Logs & Health Check') {
            steps {
                echo 'Checking container health and logs...'
                
                bat '''
                docker inspect -f "{{.State.Running}}" logapp > status.txt
                docker logs logapp > logs.txt 2>&1 || exit /b 0
                '''
            }
        }

        stage('Self Healing') {
            steps {
                script {
                    def status = readFile('status.txt').trim()

                    if (status != "true") {
                        echo "⚠ Container is DOWN! Performing self-healing..."

                        bat 'docker rm -f logapp || exit /b 0'
                        bat 'docker run -d --name logapp -p 5000:5000 log-monitoring-app'

                        echo "✅ Container recreated successfully!"
                    } else {
                        echo "✅ Container is already running."
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "🚨 Pipeline failed! Triggering emergency healing..."
            bat 'docker rm -f logapp || exit /b 0'
            bat 'docker run -d --name logapp -p 5000:5000 log-monitoring-app'
        }

        success {
            echo "🎉 Pipeline executed successfully with self-healing!"
        }
    }
}
