pipeline {
    agent any

    environment {
        LOCUST_CONTAINER_NAME = 'locust-container'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Construir la imagen de Docker de la aplicación
                    docker.build('simple-app')  // Aquí construyes la imagen de tu aplicación
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Ejecutar las pruebas de rendimiento con Locust
                    docker.image('locustio/locust').inside {
                        sh 'locust -f /path/to/your/locustfile.py --headless -u 100 -r 10'  // Ajusta el path al archivo locustfile.py
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Desplegar la imagen de Docker
                    docker.image('simple-app').run()  // Aquí ejecutas el contenedor con la imagen de la aplicación
                }
            }
        }
    }
}

