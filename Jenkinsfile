pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning the GitHub repository...'
                git 'https://github.com/bhanu7830/MINOR-PROJECT.git'
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
                sh 'docker build -t log-monitoring-app .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying container...'
                sh 'docker run -d -p 5000:5000 log-monitoring-app'
            }
        }

    }
}