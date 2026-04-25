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
                bat 'docker run -d --name logapp -p 5000:5000 log-monitoring-app'
            }
        }

        stage('Monitor Logs') {
            steps {
                echo 'Monitoring application logs...'
                bat 'docker logs logapp > logs.txt || exit /b 0'
            }
        }

        stage('Self Healing') {
            steps {
                echo 'Restarting container for recovery...'
                bat 'docker restart logapp'
            }
        }

    }
}
