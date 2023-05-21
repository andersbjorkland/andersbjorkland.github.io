+++
title = "Sylius Showcase Docker Image"
date = 2023-03-30
weight = 1
draft = false
authors = ["Anders Björkland"]
description = "A docker image to easily set up a showcase of a Sylius shop"
+++

{{ articleHeader(
path='showroom/sylius-showcase/hero.jpeg'
title='Sylius Showcase Docker Image'
) }}

A Docker Image built with ease of use in mind, to easily set up a showcase should the need arise.
The image uses supervisord to run the following services:
* PHP-FPM
* Nginx
* MariaDB

The image showcases the Sylius example shop and allows for loading its fixtures for example content. 
Check the image out on [Docker Hub](https://hub.docker.com/r/abjorkland/sylius-showcase) 

{{ youtuber(token="kSjYe0zhnrQ") }}


