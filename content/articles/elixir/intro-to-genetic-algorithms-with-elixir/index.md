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

In this article we will solve a simple problem: "what is the target phrase?". This is not a real-world problem, but suitable enough to showcase each component of a Genetic Algorithm; like a "Hello World" of Genetic Algorithms. With the foundation provided by this, I hope this can give you a better understanding of GAs, and an appreciation for using Elixir with them.  
  
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

### The target phrase
Our goal is via random chromosomes start selecting the best fit ones to crossover with each other. They will be selected based on how well they fit with the target phrase. It will be a phrase based on characters from 'a' to 'z', with space included. Let's define this:  

```elixir
defmodule GeneticString do
  # We define the target phrase here but it might as well be passed in via the evolve function.
  @target_phrase "Hello Elixir"

  # Defines which characters can be present in the target phrase
  defp possible_characters() do
    Enum.to_list(?a..?z) ++
      Enum.to_list(?A..?Z) ++
      [?_, ?\s]
  end

end
```

### The first chromosome
The first step towards arriving at a solution is a function to generate a random chromosome. It will produce a chromosome of length `length` by random characters present in `possible_characters`. This function will be used to generate the initial population.

```elixir
defmodule GeneticString do
  # ...

  # Generate a random chromosome (potential solution)
  defp random_chromosome() do
    Enum.map(
      1..String.length(@target_phrase),  # We will help the GA along the way by letting it set correct length
      fn _ -> possible_characters() |> Enum.random() end
    )
    |> List.to_string()
  end

end
```

### Evaluating fitness
The fitness evaluation is an important part in the genetic algorithm. It will tell the algorithm when it is moving closer towards a solution. In our case, we will do a fairly simple evalutaion. The fitness score will represent how many characters are correctly placed in the chromosome when compared to `target_phrase`. A more evolved fitness evaluation might take into account its length as well as maybe its [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance), and so on. 
  
We will see that our fitness evaluation will also take a map, a "memo" of already evaluated chromosomes. This way an already evaluated chromosome will not have to be calculated again. This would be a trade-off between memory/retrieval and calculation cycles.

```elixir
defmodule GeneticString do
  # ...

  # Calculate fitness based on if a character is placed in the correct n:th place.
  defp fitness_calc(chromosome) do
    chromosome
    |> String.graphemes()
    |> Enum.zip(String.graphemes(@target_phrase))
    |> Enum.count(fn {char1, char2} -> char1 == char2 end)
  end

  # Either retrieve fitness score for a chromosome or calculate it and place it in the map
  defp fitness(chromosome, memo \\ %{}) do
    case Map.get(memo, chromosome) do
      nil ->
        fitness = fitness_calc(chromosome)
        updated_memo = Map.put(memo, chromosome, fitness)
        {fitness, updated_memo}

      fitness ->
        {fitness, memo}
    end
  end

  # Updates the fitness map for all chromosomes
  defp memoize_fitness([], memo), do: memo
  defp memoize_fitness([chromosome | tail], memo) do
    {_, new_memo} = fitness(chromosome, memo)
    memoize_fitness(tail, new_memo)
  end

end
```

### Parents, offsprings and mutations
We have now defined fitness and chromosomes. Let's go to the next part, which is selecting parents to produce offsprings via the components `crossover` and `mutation`. The idea is to get at least one parent from the ones with the best fitness score, and the other parent from the broader population. Once selected, these will be passed to the crossover function to produce the offspring, and a mutation function that will introduce a bit of variation. Currently we will only make a mutation in one randomly chosen spot.  

```elixir
defmodule GeneticString do
  # ...

  # Randomly select two "parents" from the provided list of chromosomes
  defp select_parents([]), do: []
  defp select_parents(possible_parents) do
    possible_parents
    |> Enum.shuffle()
    |> Enum.take(2)
  end

  # Combine first part of one chromosome to the second part of another. 
  # The resulting chromosome will have features from both "parents"
  defp crossover(chromosome1, chromosome2) do
    crossover_point = Enum.random(1..(String.length(chromosome1) - 1))

    String.slice(chromosome1, 0, crossover_point) <>
      String.slice(chromosome2, crossover_point, String.length(chromosome2) - crossover_point)
  end

  # Introduce a random mutation to a chromsome. 
  # The spot where the mutation will happen is randomly chosen, as is the possible character introduced.
  defp mutation(chromosome) do
    mutation_point = Enum.random(0..(String.length(chromosome) - 1))

    String.slice(chromosome, 0, mutation_point) <>
      List.to_string([possible_characters() |> Enum.random()]) <>
      String.slice(
        chromosome,
        mutation_point + 1,
        String.length(chromosome) - (mutation_point + 1)
      )
  end

```  
  
### Evolution - the iterative process to produce best fit chromosome  
We will be using a evolve mechanism where we will initialize a starter population with a radom chromosomes and set an *elitism rate*. These initial values will be passed into a recursive evolve mechanism (our evolution loop). Once we've either gotten a perfect fitness score, or we have hit the generation limit, we will return the best suited chromosome. 

(While we are at it we will also bundle in which iteration - *n*:th generation - we were at when the chromosome was produced.)

```elixir
defmodule GeneticString do
  # ...

  #  Our ENTRY POINT to the evolution
  def evolve(population_size, generation_limit \\ 100) do
    population = Enum.map(1..population_size, fn _ -> random_chromosome() end)
    elitism_rate = 0.01

    evolve_mechanism(
      %{i: 0, limit: generation_limit}, # generation data
      %{population: population, size: population_size}, # population data
      %{rate: elitism_rate, count: floor(elitism_rate * population_size)}, # elitism data (suitable for adding an adaptive mechanism)
      %{} # fitness map
    )
  end

  # Recursive function that will continue evolving the chromosomes until a perfect fitness score is reached, 
  # or the generation limit has been reached.
  defp evolve_mechanism(generation, %{population: [best_match | _]}, _elitism, _fitness_memo)
      when generation.limit == generation.i,
      do: %{chromosome: best_match, generation: generation.i}

  defp evolve_mechanism(generation, population_data, elitism, fitness_memo) do
    memoized_fitness = memoize_fitness(population_data.population, fitness_memo)

    # Sort population based on fitness
    sorted_population =
      population_data.population
      |> Enum.sort_by(fn chromosome -> Map.get(memoized_fitness, chromosome) end, :desc)

    # Select number of population that will have a higher chance to survive, and produce offspring
    elite_population =
      sorted_population
      |> Enum.take(elitism.count)

    rest_population = Enum.drop(sorted_population, elitism.count) |> Enum.shuffle()

    possible_parents = case length(elite_population) do
      x when x < 2 -> elite_population ++ Enum.take(sorted_population, 2)
      _ -> elite_population
    end
    [parent1, parent2] = select_parents(possible_parents)

    # Produce offspring by combining parents and introduce a mutation
    offspring = crossover(parent1, parent2) |> mutation()

    # Keep an elite-num of chromosome, and drop less fortunate chromomse before appending the offspring
    new_population =
      (elite_population ++ rest_population)
      |> Enum.drop(-1)
      |> Kernel.++([offspring])

    [elite | _] = new_population
    fitness_score = Map.get(memoized_fitness, elite)
    max_score = String.length(@target_phrase)

    # If perfect fitness score, then return the elite chromosome.
    case fitness_score do
      x when x == max_score ->
        %{chromosome: elite, generation: generation.i}

      _ ->
        evolve_mechanism(
          %{i: generation.i + 1, limit: generation.limit},
          %{population: new_population, size: population_data.size},
          elitism,  # Might be switched for adaptive elitism
          memoized_fitness
        )
    end
  end
end
```  

The `evolve_mechanism` function is recursive in that it will take as an argument a function which will be called as long as we either haven't gotten a perfect fitness or we have hit a generation limit. We will be passing `evolve_mechanism` into itself as this function.  
  
Now it's finally time to define our entry-point to this genetic algorithm: