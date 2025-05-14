pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Construir la imagen de Docker
                    sh 'docker-compose build'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Levantar los contenedores
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}

