+++
title = "Discovering Phoenix"
date = 2023-04-15
weight = 2
draft = false
+++

{{ articleHeader(
path='articles/exploration/discovering_phoenix/hero-wide.png'
title='Discovering Phoenix'
) }}

Phoenix is a web development framework written in Elixir that uses a server-side model-view-controller (MVC) pattern. It’s perfect for building highly scalable and fault-tolerant applications. In this article, we’ll explore Phoenix by building a simple RESTful API with it. But not just any API - we’ll build a dad-joke machine! We’ll show you how to generate schemas and controllers in one fell swoop, add new fields to an API endpoint, and rediscover the ancient wisdom of dad-jokers before us.

{% quoter() %}What do you get when you cross a phoenix and a unicorn? A magical mystery tour!{% end %}

## Project Setup
To get smooth sailing with this discovery we will be using **Elixir 1.14** and **Phoenix v1.7**. If you don’t have it setup already you can [follow the instructions over at hexdocs](https://hexdocs.pm/phoenix/installation.html).

To create a new Phoenix project suitable for an API we will run the following command:  
`mix phx.new jokes_api --no-html --no-assets`


Here's the anatomy of the command:  

|  |  |
| ----------------------- | --- |
| **mix**   | The Elixir build tool and dependency chief-coordinator |
| **phx.new** | A *Mix* build task that creates a Phoenix project |
| **jokes_api** | Our project’s name |
| **--no-html** | instructs *phx.new* to not create any templates for us |
| **--no-assets**    | instructs *phx.new* to not create any static assets (such as CSS- and JS-files) |
  
After creating the project structure with all the necessary dependencies we can take our next step. As we will be doing some reading and writing to a database, let's set it up. We want a PostgreSQL database for the project, so let's add a docker-container for it. We move in to the project directory and create a *docker-compose.yaml*:  
```yaml
version: "3.7"
services:
 db:
   image: postgres
   environment:
     POSTGRES_USER: postgres
     POSTGRES_PASSWORD: postgres
   ports:
     - "5432:5432"
   volumes:
     - pg_db:/var/lib/postgresql/data


volumes:
 pg_db:
```

We specify that we want the database to have a user called `postgres` and the password `postgres`. We need to update (or confirm) that our Phoenix project has these credentails as well. We find the configuration for this in *config/dev.exs*
```ex
config :jokes_api, JokesApi.Repo,
 username: "postgres",
 password: "postgres",
 hostname: "localhost",
 database: "jokes_api_dev",
 stacktrace: true,
 show_sensitive_data_on_connection_error: true,
 pool_size: 10
```  

It’s looking good. It has the correct credentials. It's also referenceing a database, `jokes_api_dev`, which we will create now. From the command line:
`mix ecto.create`
  
> ecto is the database schema manager that Phoenix relies on. It creates our databases and database schemas. `ecto.create` is the `mix` build task which will create the database defined in our configuration. `ecto` can be used with other types of databases as well, such as MySQL and SQLite3.  
  
## The anatomy of a joke  
For our dad-joke machine to get going, we will want a schema for it. Let's imagine that a joke has text-content, and that we will want to be able to rate it. Either we like it, or we dislike it. Our model should be something like this: 

| field    | type |
| -----    | ---- |
| text     | text |
| likes    | integer |
| dislikes   | integer |

{{ image_overlayer(
  text_up="What do you call a fish with no eye?", 
  text_down="Fsh", 
  asset="articles/exploration/discovering_phoenix/bad-joke-chick.png"
) }}