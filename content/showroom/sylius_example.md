+++
title = "My first post"
date = 2023-03-18
+++

A [docker image](https://hub.docker.com/repository/docker/abjorkland/sylius-showcase/general) to easily get a demo site up and going.  
It makes use of _supervisord_ to have every piece running inside one container:  
* MariaDB
* Nginx
* PHP 8

All to get Sylius up and running, this is what you need to do:
1. `docker run -v $(pwd)/media:/app/public/media --rm -d -p 8080:80 abjorkland/sylius-showcase`
2. `docker exec -it <container-id> bin/console sylius:fixtures:load`

This will get you a demo Sylius e-commerce website loaded with example products.