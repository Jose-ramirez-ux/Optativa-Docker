pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t simple-app .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'docker run --rm -d --name simple-app-test -p 5000:5000 simple-app'
                    sleep(time: 5, unit: 'SECONDS') // Espera a que el contenedor inicie
                    sh 'locust -f locustfile.py --headless -u 50 -r 10 --host=http://localhost:5000'
                    sh 'docker stop simple-app-test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -d --name simple-app -p 5000:5000 simple-app'
                }
            }
        }
    }
}
