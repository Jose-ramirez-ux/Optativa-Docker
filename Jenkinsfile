pipeline {
    agent any

    stages {
        stage('Clonar repositorio / Preparar entorno') {
            steps {
                echo 'Preparando archivos para despliegue...'
                sh 'mkdir -p tmp_app && cp server.js package*.json tmp_app/'
            }
        }

        stage('Copiar a ubuntu-docker') {
            steps {
                echo 'Copiando aplicación al contenedor ubuntu-docker...'
                sh 'docker cp tmp_app/. ubuntu-docker:/app/'
            }
        }

        stage('Instalar dependencias en ubuntu-docker') {
            steps {
                echo 'Instalando Node.js y dependencias en ubuntu-docker...'
                sh '''
                docker exec ubuntu-docker bash -c "
                    apt-get update &&
                    apt-get install -y curl && 
                    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&
                    apt-get install -y nodejs &&
                    cd /app &&
                    npm install
                "
                '''
            }
        }

        stage('Iniciar servidor') {
            steps {
                echo 'Iniciando servidor Node.js dentro del contenedor ubuntu-docker...'
                sh 'docker exec -d ubuntu-docker bash -c "cd /app && node server.js"'
            }
        }

        stage('Pruebas Locust - 50 usuarios') {
            steps {
                echo 'Ejecutando pruebas de carga con 50 usuarios...'
                sh 'locust -f locustfile.py --headless -u 50 -r 10 -t 10s --host=http://localhost:3000'
            }
        }

        stage('Pruebas Locust - 100 usuarios') {
            steps {
                echo 'Ejecutando pruebas de carga con 100 usuarios...'
                sh 'locust -f locustfile.py --headless -u 100 -r 20 -t 10s --host=http://localhost:3000'
            }
        }

        stage('Pruebas Locust - 150 usuarios') {
            steps {
                echo 'Ejecutando pruebas de carga con 150 usuarios...'
                sh 'locust -f locustfile.py --headless -u 150 -r 30 -t 10s --host=http://localhost:3000'
            }
        }
    }

    post {
        always {
            echo 'Limpiando archivos temporales...'
            sh 'rm -rf tmp_app'
        }
    }
}
