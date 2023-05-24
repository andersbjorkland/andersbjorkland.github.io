+++
title = "Laugh Out Loud with LiveView"
date = 2023-05-23
weight = 2
authors = ["Anders Björkland"]
draft = false

[taxonomies] 
category=["Elixir"]
tags=["elixir", "phoenix", "liveview", "PubSub"]
+++

{{ articleHeader(
path='articles/elixir/liveview_and_broadcast/hero-slim.png'
title='Laugh Out Loud with LiveView'
) }}

Are you ready to take your website to the next level? Phoenix LiveView is here to help! In this article, we’ll show you how to create a website that’s not only interactive but also hilarious. Visitors will be able to make their mark by showing their taste in humor, and see how their taste align with others´. It’s the perfect way to engage your audience and keep them coming back for more. All powered by LiveView for instant updates, and the Publish-Subscribe pattern to broadcast updates to all the other visitors.
  
## Where we begin
In an earlier article we saw how to create a simple API with Phoenix. It was our [Jokes API](/articles/exploration/discovering-phoenix/). In today's article we will switch it up. We will build upon same schema of jokes, but we will introduce LiveView and PubSub. You can go back to the article if you want to see how to easily set up a project and build schemas with some excellent `mix` build-tools.

While we are on the same page, and so we don't get hard to understand errors when following this tutorial, check which versions of these you are using. In this article we will be using following major tech:  

`Elixir 1.14`  
`Docker Compose 2.17`
`Phoenix 1.7`  

### Create the 'Jokers' project
It starts with a command: `mix phx.new Jokers`. 

Then we will add a PostgreSQL Docker container to manage our database.
`./docker-compose.yaml`
```yaml
version: "3.4"

services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdb:/var/lib/postgresql/data

volumes:
  pgdb:
```

Get the database up and the Phoenix server:
`docker-compose up -d`  
`mix ecto.create` 
`mix phx.server` 

When we go to `localhost:4000` we will see the default Phoenix landing-page. We will switch most of this out for a simple jokes list with like/dislike buttons later on.
{{ imager(
    asset='articles/elixir/liveview_and_broadcast/start-screen.png', 
    alt='The landing page with default Phoenix Framework splash screen', 
    class='center'
) }}

### And add Jokes schema
You will recognize the schema from an earlier article on Phoenix. We create it by running the following commands in a terminal:  
`mix phx.gen.json Jokes Joke jokes text:text likes:integer dislikes:integer`  
`mix ecto.migrate`  

### And add API-routes
We will use the API to add new Jokes for our application. This is also a repetition of earlier article, but as it is with repetition: it makes the love grow fonder. (Or is that distance?)

We will add the API-routes by adding the following to the module in `./lib/lean_jokers_web/router.ex`:
```ex
  scope "/api", LeanJokersWeb do
    pipe_through :api

    resources "/jokes", JokeController, except: [:new, :edit, :delete]
  end
```

And we will update the Joke-schema to default `likes` and `dislikes` to `0`:
In `./lib/lean_jokers/jokes/joke.ex`:
```ex
  schema "jokes" do
    field :dislikes, :integer, default: 0
    field :likes, :integer, default: 0
    field :text, :string

    timestamps()
  end
```
We are now ready to add a couple of classic bad-jokes (or absolutely-brilliant-jokes): 
* Why did the coffee file a police report? It got mugged.  
* Why don’t skeletons fight each other? They don’t have the guts.  
* There are 10 types of people in the world: those who understand binary, and those who don’t.
* What do you call cheese that isn’t yours? Nacho cheese.  
* Why don’t scientists trust atoms? Because they make up everything. 

Make a POST-request for each joke to the endpoint `http://localhost:4000/api/jokes` with the following JSON payload:  
```json 
{
    "joke": {
        "text": "Why did the coffee file a police report? It got mugged."
    }
}
```

## Coming alive!  
Our next task is to show these jokes on our homepage. The recommended way to build with LiveView is to let all LiveView logic live in its own namespace under the web-paradigm. So lets add a `live` folder at `./lib/lean_jokers_web/` and create two new files in it: `home.ex` and `home.html.heex`. 

The first file, `home.ex`, will contain our logic, while `home.html.heex` will contain our view. Let's just see if we can get it all to run.  

`./lib/lean_jokers_web/home.ex`:  
```ex
defmodule LeanJokersWeb.Live.Home do
  use LeanJokersWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
```

`./lib/lean_jokers_web/home.html.heex`:
```heex
<h1>Hello World</h1>
```

`./lib/lean_jokers_web/router.ex`:
```ex
  scope "/", LeanJokersWeb do
    pipe_through :browser

    live "/", Live.Home
  end
```
  
When we now go to `localhost:4000` we should see a simple `Hello World`. If you do, we are ready to display some jokes. Head back to the `home.ex` file, and let's use an Ecto repository to get our jokes, and assign them to the socket.
  
`./lib/lean_jokers_web/home.ex`: 
```ex
defmodule LeanJokersWeb.Live.Home do
  use LeanJokersWeb, :live_view

  def mount(_params, _session, socket) do
    jokes = LeanJokers.Jokes.Joke
      |> LeanJokers.Repo.all()

    socket = socket
      |> assign(:jokes, jokes)

    {:ok, socket}
  end
end
```

Our next task is to access the jokes from the socket in our view.
`./lib/lean_jokers_web/home.html.heex`: 
```heex
<div class="flex flex-col gap-4">
<%= for joke <- @jokes do %>
    <div>
        <p><%= joke.text %></p>
        <div class="flex gap-2">
            <div>Likes: <%= joke.likes %></div>
            <div>Disikes: <%= joke.dislikes %></div>
        </div>
    </div>
<% end %>
</div>
```

Phoenix comes packed with TailwindCSS, so we are using some of its utility classes to list our jokes with gap in between them by the power of flex and flex-gap. We are then looping through the `jokes` variable that we fetch from `socket.assigns.jokes`. We are using its shorthand `@jokes` to get it. After saving the file we will have all the jokes displayed on our website, along with their likes and dislikes.

### Add interactivity  
Our Lean Jokes website is not very exciting at the moment, but it soon will be. We will be adding <em>buttons</em> to like or dislike a joke. By doing this we will update a joke and see it change in real-time! The difference between this and a simple incremented counter may not look like much, but all the changes occur on the server with updates to the database. Only the necessary data is exchanged between our frontend and backend. We will take a look at what happens in the network, but first we add the buttons to our view.

`./lib/lean_jokers_web/home.html.heex`: 
```heex
<div class="flex flex-col gap-4">
<%= for joke <- @jokes do %>
    <div>
        <p><%= joke.text %></p>
        <div class="flex gap-2">
            <div>
                <button phx-click="like_joke" phx-value-joke_id={joke.id}>Like</button> <%= joke.likes %>
            </div>
            <div>
                <button phx-click="dislike_joke" phx-value-joke_id={joke.id}>Dislike</button> <%= joke.dislikes %>
            </div>
        </div>
    </div>
<% end %>
</div>
```

Next up, we will want to add event-handlers for these buttons. We should handle `like_joke` and `dislike_joke`, and the passed `joke.id` will be used to update the correct `joke`. With the power of pattern-matching, we will get the variable `joke_id` from the parameters that are passed along with the event. This will help us with two things. First, it will help us update the correct joke in the database. Second, it will help us insert the updated joke in the jokes-list and pass it back in the socket.

`./lib/lean_jokers_web/home.ex`: 
```ex
  def handle_event("like_joke", %{"joke_id" => joke_id} = _params, socket) do

    # Elixir cares about types, but the joke_id is a string here as it was a templated variable
    {joke_id, _} = Integer.parse(joke_id)
    
    # Filter out the joke with the help of the id
    socket_jokes = socket.assigns.jokes
    [socket_joke | _rest ] = Enum.filter(socket_jokes, &(&1.id == joke_id))

    # Increment the value and update the joke in the database
    {:ok, joke} = LeanJokers.Jokes.update_joke(socket_joke, %{likes: socket_joke.likes + 1 })

    # Replace the joke with our updated joke in the list 
    jokes =
      socket.assigns.jokes
        |> Enum.map(fn
          %LeanJokers.Jokes.Joke{id: ^joke_id} -> joke
          element -> element
        end)

    # and add the list to the sockets assigns
    socket = socket
      |> assign(:jokes, jokes)
    {:noreply, socket}
  end

  def handle_event("dislike_joke", %{"joke_id" => joke_id} = _params, socket) do
    {joke_id, _} = Integer.parse(joke_id)
    socket_jokes = socket.assigns.jokes
    [socket_joke | _rest ] = Enum.filter(socket_jokes, &(&1.id == joke_id))

    {:ok, joke} = LeanJokers.Jokes.update_joke(socket_joke, %{dislikes: socket_joke.dislikes + 1 })

    jokes =
      socket.assigns.jokes
        |> Enum.map(fn
          %LeanJokers.Jokes.Joke{id: ^joke_id} -> joke
          element -> element
        end)

    socket = socket
      |> assign(:jokes, jokes)
    {:noreply, socket}
  end
```