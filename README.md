
## 📋 Requisitos previos

Verificar tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Angular CLI](https://angular.dev/tools/cli) (versión 17)
- [Git](https://git-scm.com/)

Verifica las versiones instaladas:
```bash
node -v
npm -v
ng version
```
## Instalación

Clona el repositorio:
```bash
https://github.com/Jorge-Urquiza/blog-front
cd blog-front
```


## Instalar dependencias y levantar el proyecto en desarrollo
```bash
npm install
ng serve

```
## Configuración del nginx.cnf:

```bash
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        # Raíz principal
        location / {
            root   C:/nginx/html;
            index  index.html index.htm;
        }

        # Ambiente DEV
        location /dev/ {
            root   C:/nginx/html;
            index  index.html;
            try_files $uri $uri/ /dev/index.html;
        }

        # Ambiente UAT
        location /uat/ {
            root   C:/nginx/html;
            index  index.html;
            try_files $uri $uri/ /uat/index.html;
        }

        # Errores
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   C:/nginx/html;
        }

        # Archivos estáticos compartidos (js, css, imágenes, fuentes, etc.)
        location ~* \.(?:js|css|ico|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$ {
            root   C:/nginx/html;
            access_log off;
            expires 30d;
            add_header Cache-Control "public";
        }
    }
}
```
