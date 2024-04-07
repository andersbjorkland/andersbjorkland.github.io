+++
title = "Taking on the Traveller Salesman Problems with Genetic Algorithm"
date = 2024-04-10
updated = 2024-04-10
weight = 2
authors = ["Anders Björkland"]
description = "Solve the Traveller Salesman Problem by finding the shortest route among multiple cities with the help of genetic algorithm and Elixir."
draft = true

[taxonomies] 
category=["Elixir"]
tags=["elixir", "livebook", "algorithms"]
+++  

{{ articleHeader(
path='articles/elixir/taking-on-the-traveller-salesman-problem/hero.png'
title='Intro to Genetic Algorithms with Elixir'
) }}

{{ companyAuthor(author="Anders Björkland", occupation="Web Developer", company="Umain", url="https://www.umain.com/") }}

I was looking out my window and saw a delivery truck passing by on the street the other day. This got me thinking about a classic algorithm challenge: *The Traveller Salesman Problem* (TSP for short).  
  
The challenge goes like this: *A salesman has a list of cities they need to visit. They need to visit each and every single one of them and then return to their starting position. **What is the shortest route they can take?***  
  
{{ imager(
    asset='cities-map.svg',
    alt='city plots'
) }}


This is of course a problem that has been solved in multiple ways,  thousands upon thousands of times over. The delivery driver has a route already preprogrammed - they don't need my help mulling it over. *So why am I thinking about it?*  
  
One could say such everyday problems are more fun when applying algorithms to solve them, and I am looking for a reason to pull out my algorithmic toolbox. It's a fair statement! I recently put a new hammer in that toolbox and I've been on the lookout for a reason to hammer away with it.  
  
While rifling through the toolbox I see some useful tools that I for a short second consider:  
  
* **Brute force**: The hammer of all hammers, *brute forcing* is not elegant but it gets the job done... eventually. If we were to use brute force to solve TSP we would be calculating each possible solution and then select the best one. The number of possible solutions to TSP is given by the formula `(n-1)!/2`. It's a factorial representing each possible combination of visits to the cities, and as it loops back to the beginning, the direction of the loop does not matter. So if the salesman had to visit `18` cities, this would be `(18-1)!/2)` which comes out to <code>1.8 × 10<sup>14</sup></code> possible soultions. It's entirely possible, but I rifle on.  

* **Nearest neighbor**: A screw driver in comparison, this algorithm is focused on the here-and-now with disregard for the larger picture. With a *nearest neighbor* the salesman would always travel to whichever city is closest to the city they are currently in. While this might see them cover a larger distance than brute forcing, it is much faster and can be good enough. But if you've read [my previous article](@/articles/elixir/intro-to-genetic-algorithms-with-elixir/index.md), you might suspect that I'm on the look out for another tool.  
  
* **Genetic Algorithm**: Now this is what I'm talking about! Genetic Algorithms (*GA*) might find the best possible route, but they might also find a solution that is just good enough. This is my hammer, saw, and ruler - all combined. It might look a bit freakish, but it's so fun to use! GA is inspired by evolutionary processes. Survival of the fittest and mutations will play a role in it finding a good enough solution. As long as we can define the solution as a "chromosome" and a way to measure the "fitness", GA will be possible to use.  
  
So how would I use a Genetic Algorithm (GA) to find a short enough route for the salesman? Let's consider this; is it possible to describe a possible solution as a "chromosome"? I will say an emphatic **yes!** A route can be described as a series of cities in the order in which they will be visited. If we have the 3 cities *A*, *B*, and *C*, a chromosome could be a list: `[A, B, C]` or `[B, A, C]`, and so on. As long as we have coordinates for each city we will also be able to calculate the distance between them, a.k.a: their "fitness" (where shorter is better).  
  
Knowing this we can continue to plan out how to implement the algorithm. We will need a logic for selecting "chromosomes" that should be parents. The parents will be passed to a function that will combine two chromosomes with each other via "crossover", and the new combination of "genes" will be "mutated" in a random place of the chromosome. The least fit chromosomes will leave place to the next generation via a process I will dispassionately call "pruning". (It's less on the nose than "the purge", but we might imagine that's what's going on behind the scenes.)

{{ imager(
    asset='quokka-work.png',
    alt='A quokka holding a weird metal-wood tool'
) }}

