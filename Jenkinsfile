pipeline {
    agent any

    tools {
        nodejs "Nodejs"
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main',
                url: 'https://github.com/tu-usuario/landing-angular17.git',
            }
        }

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build del proyecto') {
            steps {
                bat 'npm run build'
                bat 'dir www /S'
            }
        }

        stage('Desplegar en Nginx') {
            steps {
                bat '''
                    echo "Deteniendo Nginx..."
                    net stop nginx

                    echo "Limpiando directorio de Nginx..."
                    rmdir /Q /S "C:\\nginx\\html\\*"

                    echo "Copiando nuevos archivos..."
                    xcopy /Y "www\\browser\\*" "C:\\nginx\\html\\" /E

                    echo "Iniciando Nginx..."
                    net start nginx
                '''
            }
        }
    }

    post {
        success {
            echo '✅ ¡Despliegue exitoso! La landing está en http://localhost'
        }
        failure {
            echo '❌ Error en el despliegue. Revisa los logs.'
        }
    }
}
