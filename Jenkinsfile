pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  tools {
    nodejs "Nodejs"   // Configurado en Jenkins > Global Tool Configuration
  }

  environment {
    REPO_URL     = 'https://github.com/Jorge-Urquiza/blog-front.git'
    REPO_BRANCH  = 'master'
    NGINX_ROOT   = 'C:\\nginx\\html'
    NGINX_EXE    = 'C:\\nginx\\nginx.exe'
    BUILD_BASE   = 'www\\browser'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: env.REPO_BRANCH, url: env.REPO_URL
      }
    }

    stage('Install deps') {
      steps {
        bat '''
          if exist package-lock.json (
            echo === Using npm ci ===
            npm ci
          ) else (
            echo === Using npm install ===
            npm install
          )
        '''
      }
    }

    stage('Build + Deploy (Parallel)') {
      parallel {

        stage('DEV') {
          stages {

            stage('Build DEV') {
              steps {
                bat '''
                  echo === Build DEV ===
                  call npx ng build --base-href /dev/ --deploy-url /dev/
                  if not exist "%BUILD_BASE%" (
                    echo [ERROR] Build folder not found: %BUILD_BASE%
                    dir
                    exit /b 1
                  )
                  dir "%BUILD_BASE%" /S
                '''
              }
            }

            stage('Deploy DEV') {
              steps {
                bat '''
                  set "TARGET=%NGINX_ROOT%\\dev"
                  if not exist "%TARGET%" mkdir "%TARGET%"

                  robocopy "%BUILD_BASE%" "%TARGET%" . /E /MIR /NFL /NDL /NJH /NJS /NP /R:1 /W:1

                  set "RC=%ERRORLEVEL%"
                  echo Robocopy RC=%RC%
                  if %RC% GEQ 8 (
                    echo [ERROR] Robocopy failed
                    exit /b %RC%
                  ) else (
                    echo [INFO] DEV deploy OK (RC=%RC%)
                    exit /b 0
                  )
                '''
              }
            }
          }
        }

        stage('STAGING') {
          stages {

            stage('Build STAGING') {
              steps {
                bat '''
                  echo === Build STAGING ===
                  call npx ng build --base-href /staging/ --deploy-url /staging/
                  if not exist "%BUILD_BASE%" (
                    echo [ERROR] Build folder not found: %BUILD_BASE%
                    exit /b 1
                  )
                '''
              }
            }

            stage('Deploy STAGING') {
              steps {
                bat '''
                  set "TARGET=%NGINX_ROOT%\\staging"
                  if not exist "%TARGET%" mkdir "%TARGET%"

                  robocopy "%BUILD_BASE%" "%TARGET%" . /E /MIR /NFL /NDL /NJH /NJS /NP /R:1 /W:1

                  set "RC=%ERRORLEVEL%"
                  echo Robocopy RC=%RC%
                  if %RC% GEQ 8 (
                    echo [ERROR] Robocopy failed
                    exit /b %RC%
                  ) else (
                    echo [INFO] STAGING deploy OK (RC=%RC%)
                    exit /b 0
                  )
                '''
              }
            }
          }
        }

        stage('TEST') {
          stages {

            stage('Build TEST') {
              steps {
                bat '''
                  echo === Build TEST ===
                  call npx ng build --base-href /test/ --deploy-url /test/
                  if not exist "%BUILD_BASE%" (
                    echo [ERROR] Build folder not found: %BUILD_BASE%
                    exit /b 1
                  )
                '''
              }
            }

            stage('Deploy TEST') {
              steps {
                bat '''
                  set "TARGET=%NGINX_ROOT%\\test"
                  if not exist "%TARGET%" mkdir "%TARGET%"

                  robocopy "%BUILD_BASE%" "%TARGET%" . /E /MIR /NFL /NDL /NJH /NJS /NP /R:1 /W:1

                  set "RC=%ERRORLEVEL%"
                  echo Robocopy RC=%RC%
                  if %RC% GEQ 8 (
                    echo [ERROR] Robocopy failed
                    exit /b %RC%
                  ) else (
                    echo [INFO] TEST deploy OK (RC=%RC%)
                    exit /b 0
                  )
                '''
              }
            }
          }
        }
      }
    }

    stage('Reload Nginx') {
      steps {
        bat '''
          "%NGINX_EXE%" -t
          if %ERRORLEVEL% NEQ 0 (
            echo [ERROR] nginx config test failed
            exit /b 1
          )
          "%NGINX_EXE%" -s reload
        '''
      }
    }
  }

  post {
    success {
      echo ' - http://localhost/dev/'
      echo ' - http://localhost/staging/'
      echo ' - http://localhost/test/'
      cleanWs()
    }
    failure {
      echo 'Falló el pipeline'
    }
  }
}
