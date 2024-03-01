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
    alt='The landing page with default Phoenix Framework splash screen', 
    class='center'
) }}

Clicking it will open a new page where you can enter a URL to your local or cloud hosted Livebook application. You may also configure `hexdocs.pm` so it remembers your URL. 

{{ imager_standard(
    asset='articles/elixir/interactive-documents-with-livebook/livebook_install.png', 
    alt='The landing page with default Phoenix Framework splash screen', 
    class='center'
) }}