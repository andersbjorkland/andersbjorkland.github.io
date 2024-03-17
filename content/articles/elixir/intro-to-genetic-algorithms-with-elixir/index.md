+++
title = "Intro to Genetic Algorithms with Elixir"
date = 2024-03-17
updated = 2024-03-17
weight = 2
authors = ["Anders Björkland"]
draft = true

[taxonomies] 
category=["Elixir"]
tags=["elixir", "livebook", "algorithms"]
+++

{{ articleHeader(
path='articles/elixir/interactive-documents-with-livebook/hero.webp'
title='Intro to Genetic Algorithms with Elixir'
) }}

[Genetic Algorithms (GA)](https://en.wikipedia.org/wiki/Genetic_algorithm) are algorithms inspired by the evolutionary process found in nature. Sometimes these are called Stochastic Algorithms as they make use of randomness to find an optimal solution, but with features such a "natural selection" to remove less suitable solutions while generating new possible ones. 

Genetic Algorithms are found in [route optimzation problems](https://ieeexplore.ieee.org/document/537939), in engineering (e.g. [evolved antennas](https://en.wikipedia.org/wiki/Evolved_antenna)), in [epidemic mitigation](https://arxiv.org/pdf/1707.05377.pdf), and much more. 

In this article we will solve a simple problem: "what is the key-phrase?". This is not a real-world problem, but suitable enough to showcase each component of a Genetic Algorithm; like a "Hello World" of Genetic Algorithms. With the foundation provided by this, I hope this can give you a better understanding of GAs, and an appreciation for using Elixir with them.  
  
## Anatomy of a Genetic Algorithm
A genetic algorithm will try to promote the possible soultions (*chromosomes*) with the best "fitness" and combine them into a new possible solution, which will inherit features of both. While it does this, it may introduce some mutations (small changes that were not part of its "parents" chromosomes). 

In essence, these are the genetic algorithm's components:  
* *Chromosomes*   
  possible solutions  

* Initial population  
  *random chromosomes*  

* Fitness evaluation  

* Selection  
  *better fitness score are more likely to be chosen as "parents"*  

* Crossover  
  *"mating" of parents to produce an "offspring", a new chromosome*  

* Mutation  
  *small random changes in a chromosome*  

* Evolution Loop  
  *repeating the steps of **selection** -> **crossover** -> **mutation** to arrive at a chromosome that is the best fit for the problem at the hand*

We will add an "elitism" component to this which will make sure that the best possible solutions are never discarded. This is a component that may act dynamic depending on where we are in the evolution loop. But initially we will keep it static. 

> For anyone who has set up a Livebook application and want to experiment, just [grab the source from my **gist**](https://gist.github.com/andersbjorkland/a9a14665d8116204421f84f44718884a) (copy) and click *Open*/*From source*. 
> If you haven't set up a Livebook application, read about how to do that in my article [Interactive documents with Livebook](@/articles/elixir/interactive-documents-with-livebook/index.md#hosting-livebook-on-hugging-face). You can set it up on free hosting via Hugging Face. 

