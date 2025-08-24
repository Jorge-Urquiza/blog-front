pipeline {
    agent any

    tools {
        nodejs "Nodejs"
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'feat/parallel-pipeline',
                url: 'https://github.com/Jorge-Urquiza/blog-front.git'
            }
        }

        stage('Build del proyecto') {
            steps {
                bat 'npm install'
                bat 'npm run build'
                bat 'dir www /S'
            }
        }

        stage('Despliegue Paralelo') {
            parallel {
                stage('Desplegar DEV') {
                    steps {
                        bat '''
                            echo "🚀 Desplegando en ambiente DEV..."
                            echo "Creando carpeta dev..."
                            if not exist "C:\\nginx\\html\\dev" mkdir "C:\\nginx\\html\\dev"

                            echo "Copiando archivos a dev..."
                            xcopy /Y "www\\browser\\*" "C:\\nginx\\html\\dev\\" /E

                            echo "✅ DEV desplegado en: http://localhost/dev/"
                        '''
                    }
                }

                stage('Desplegar STAGING') {
                    steps {
                        bat '''
                            echo "🚀 Desplegando en ambiente STAGING..."
                            echo "Creando carpeta staging..."
                            if not exist "C:\\nginx\\html\\staging" mkdir "C:\\nginx\\html\\staging"

                            echo "Copiando archivos a staging..."
                            xcopy /Y "www\\browser\\*" "C:\\nginx\\html\\staging\\" /E

                            echo "✅ STAGING desplegado en: http://localhost/staging/"
                        '''
                    }
                }

                stage('Desplegar TEST') {
                    steps {
                        bat '''
                            echo "🚀 Desplegando en ambiente TEST..."
                            echo "Creando carpeta test..."
                            if not exist "C:\\nginx\\html\\test" mkdir "C:\\nginx\\html\\test"

                            echo "Copiando archivos a test..."
                            xcopy /Y "www\\browser\\*" "C:\\nginx\\html\\test\\" /E

                            echo "✅ TEST desplegado en: http://localhost/test/"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '🎉 ¡Despliegue paralelo exitoso!'
            echo '🔗 DEV: http://localhost/dev/'
            echo '🔗 STAGING: http://localhost/staging/'
            echo '🔗 TEST: http://localhost/test/'
        }
        failure {
            echo '❌ Error en el despliegue paralelo'
        }
    }
}
