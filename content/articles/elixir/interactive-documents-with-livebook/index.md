+++
title = "Interactive documents with Livebook"
date = 2024-03-01
updated = 2024-03-01
weight = 2
authors = ["Anders Björkland"]
draft = true

[taxonomies] 
category=["Elixir"]
tags=["elixir", "livebook"]
+++

We may often argue that a language or a library has underwhelming documentation. The documentation may assume prior knowledge not documented, it may be code heavy without explanations of how or why a specific pattern is used, or the examples provided may just be outdated. The documentation may have any of these issues, or all. Sometimes it is an issue you can live with, since you can find other resources for a particular library. And you may argue that it’s simply just the nature of what the library is dealing with. Take an example, like `ggplot2` in *R*: 
> If you are new to ggplot2 you are better off starting with a systematic introduction, rather than trying to learn from reading individual documentation pages.  
  
`ggplot2` deals with visualization of data, so the subject matter is complicated right from the bat and is not something for newcomers to dive right into.  
  
But what if that was not the case? What if we could have an easy time as newcomers to explore complicated subjects, in a manner where examples are up to date, and where explanations are plentiful?  
  
## Let’s talk about documentation in Elixir-land!  
Imagine if you’re visiting your common dependency registry, where you usually would search and find a package and some instructions for how to install it with your project, and of course a link to the package’s main webpage. In Elixir-land, this is where [hexdocs.pm](https://hexdocs.pm) enters.  
  
*hex* is the ordinary Package Manager, but its documentation site is more than a place for installation instructions. Here you can find documentation for Elixir as well as every package available via *hex*. You would not need to leave `hexdocs.pm` for reading about more than installation instructions. It contains the API for each package, and in many cases the guides/tutorials for how to use them. And as everything with `hexdocs.pm` is managed on GitHub, anyone can be on top of any issues with documentation (such as rectifying poor explanations or adding or fixing examples) by issuing PRs.  
  
Some of these API documents also have guides connected to them; occasionally written in a format called `livemd`. These are markdown files that also works as *live documents*; meaning they are able to be launched with Livebook (either locally hosted or in cloud) and experimented with. This way, anyone can see how each function and struct can be used. 

## What is Livebook  
Livebook is a format for interactive Elixir notebooks. Like Jupyter, but specialized for Elixir (and Erlang). They are run as web applications. And when you have a Livebook application, you may open any *livemd*-document in it. You will see a "Run in Livebook" button on these pages. 

{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/run_in_livebook_btn.webp', 
    alt='A button with the text "Run in Livebook"', 
    class='center'
) }}

Clicking it will open a new page where you can enter a URL to your local or cloud hosted Livebook application. You may also configure `hexdocs.pm` so it remembers your URL. 

{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/livebook_install.png', 
    alt='Image of choosing to install livebook', 
    class='center'
) }}   

### Hosting Livebook on Hugging Face 
Hugging Face offers many alternatives for hosting. All it requires is that you've registered an account. Then you can onboard to their free hosting alternative. I'm registered as `beercan`, and let's see how onboarding would look like for me. 

1. *Create a new Space*: Fill in the basic information for the Hugging Face Space.
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/create_new_space.png', 
    alt='A simple form to select owner, space name, and associated license', 
    class='center'
) }}

2. *Select the Space SDK*: Possibilities are endless, as Hugging Face offers a Docker hosting alternative. Select **Docker** and the **Livebook** template.  
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/docker_choice.png', 
    alt='A simple form to select owner, space name, and associated license', 
    class='center'
) }}

3. *Select hardware*: We will run a basic setup, which offers 2 virtual CPUs with 16GB RAM. Other, priced, alternatives exists. For most cases, vCPUs are enough. If you want to be training your own models or use LLMs, then the need for the GPU alternatives are there for your choosing. You may also upgrade/downgrade at any point. 
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/select_hardware.png', 
    alt='A select menu with multiple alternatives. The first alternative is selected. It is "CPU basic, 2vCPU, 16GB, free".', 
    class='center'
) }}  

4. *Secrets*: Select a password for your Livebook application, and then let `XLA_TARGET` be `cpu`. (This should reflect the type of hardware that you are running your application on.)
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/secrets_form.png', 
    alt='A select menu with multiple alternatives. The first alternative is selected. It is "CPU basic, 2vCPU, 16GB, free".', 
    class='center'
) }}  

5. *Make your Livebook Private or Public*: Select whatever you are comfortable with. Start with `Private` if you don't plan to make it visible to anyone.  

6. *Click on `Create Space`*. This will build the docker image and spin it up. Per default, the container will sleep after 48 hours of inactivity. Any of the paid alternatives allows to change this. 
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/docker_building.png', 
    alt='A screen with logs for docker-building. In the background a information text "Building...".', 
    class='center'
) }}  

When the image is done building, it will be run, and you will be able to see this screen: 
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/new_app_running.png', 
    alt='A page with two links. One is for "Dashboard", the other is under the headline "Apps" and says "Livebook [heart] Hugging Face".', 
    class='center'
) }}  

Clicking on "Dashboard" will lead you to an authentication page where you will enter the password that you set earlier. Once that is passed, you can start to explore what Livebook is. It has multiple livebook documents teaching the basics of Elixir, Livebook, and some common Livebook components.  
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/dashboard.png', 
    alt='A dashboard interface with a vertical menu, and a main section. The menu has the alternatives: Home, Apps, Learn, Settings, and My Hub. The Main section has two buttons: open, and "new notebook", as well as 3 livebook documents: "Welcome to Livebook", "Distributed portals with Elixir", and "Deploy a chat app with Kino"', 
    class='center'
) }}  

## Explore a Livebook document - Bumblebee
Let's head to [hexdocs.pm/bumblebee/examples.html#image-classification](https://hexdocs.pm/bumblebee/examples.html#image-classification). Click the cog-icon in the upper right corner to access the settings and check "Run in Livebook". Paste your Livebook URL in the field. It should be something like `https://beercan-liveboook.hf.space/`, which is `https://{username}-{projectName}.hf.space`. 

{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/hexdocs_settings.png', 
    alt='A settings menu for Hexdocs.pm', 
    class='center'
) }}  

Now when we click on "Run in Livebook" it will initiate a new Livebook document for us in our Huggning Face space. Now we can configure and execute (or *evaluate*) each Elixir code element in our document. The first Elixir element is where we will install all the dependencies that will be covered in the document. It can be executed by hovering the element and click the `Evaluate` button that will appear.  
  
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/evaluate_element.png', 
    alt='Evaluate an Elixir code element', 
    class='center'
) }}  

Clicking it will start the code execution. Each element will have access to variables declared in earlier elexir elements, so you may define variables that will be used later in the code. 
  
With Livebook we have access to a library of Livebook components in the form of the Kino dependency. In this example we will see how it renders an Image input-field:  
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/image_import.png', 
    alt='Rendered Livebook component for importing an Image file.', 
    class='center'
) }}  

And to wrap this gift that is the Bumblebee library in Livebook, let's run an inference model on the image that was imported and see how it classifies the badger laying on the ground.  
{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/image_inference.png', 
    alt='Rendered Livebook component for importing an Image file.', 
    class='center'
) }}  

In this case, the model that was used was pretty sure that it indeed was a badger, with a .3% uncertainty about it. 

## In closing