+++
title = "Cons is Good - or why concatenating lists is slower than prepending elements"
date = 2024-12-08
updated = 2024-12-08
weight = 3
authors = ["Anders Björkland"]
description = "There are different ways to add an element to a list, but some ways are better than others. In Elixir this comes down to the difference between copying new lists for each element versus just referencing the list from the new element."
draft = false

[taxonomies] 
category=["Elixir"]
tags=["Elixir", "Data Science"]
+++

{{ articleHeader(
path='articles/elixir/cons-is-good/hero.png'
title='Cons is Good - or why concatenating lists is slower than prepending elements'
) }}

Recently I sat and leafed through the book *Programming Elixir*. It had a simple challenge to write a function that would create a list from two inputs: `from` and `to`, creating an element for each value between and including `from` and `to`. I wrote something like this:  
```elixir
  def span_list(from, to, acc \\ [])
  def span_list(to, to, acc), do: acc ++ [to]
  def span_list(from, to, acc), do: span_list(from + 1, to, acc ++ [from])
```

This works fine and is easy enough to understand: Starting with `from` we add it to the accumulator (`acc`) and then recursively call the function with `from + 1` as the new `from` value and the same `to` value. This will continue until we reach `to`, where we will return the accumulated list.

But I was curious! I've heard that it is more performant to prepend elements to lists rather than doing concatenations. So I rewrote the function by adding each element to the head of a list and upon returning it I reverse it. How would this other function compare to concatenations? 

The updated functions:  
```elixir 
  def span_list_concats(from, to, acc \\ [])
  def span_list_concats(to, to, acc), do: acc ++ [to]
  def span_list_concats(from, to, acc), do: span_list_concats(from + 1, to, acc ++ [from])

  def span_list_cons(from, to, acc \\ [])
  def span_list_cons(to, to, acc), do: Enum.reverse([to | acc])
  def span_list_cons(from, to, acc), do: span_list_cons(from + 1, to, [from | acc])
```

## Benchmarking

I used the `benchee` library for benchmarking, which is great. It's simple to use and easy to understand. I had it run each function with the values `from = 0` and `to = 1_000`. The results were not too surprising:  

```bash
Name                        ips        average  deviation         median         99th %
span_list_cons         294.28 K     0.00340 ms   ±199.98%     0.00321 ms     0.00938 ms
span_list_concats        0.92 K        1.08 ms    ±11.20%        1.11 ms        1.24 ms

Comparison:
span_list_cons         294.28 K
span_list_concats        0.92 K - 318.86x slower +1.08 ms


Memory usage statistics:

Name                      average  deviation         median         99th %
span_list_cons          0.0211 MB     ±0.00%      0.0211 MB      0.0211 MB
span_list_concats         6.53 MB     ±0.00%        6.53 MB        6.53 MB
```

As we can see, `span_list_cons` performs way better, both in iterations per second (`ips`) and per memory usage. The offficial documentation has this to say about that:  
> Due to their cons cell based representation, prepending an element to a list is always fast (constant time), while appending becomes slower as the list grows in size (linear time)  

But why is that? What does it mean that cons cells are faster than appending? Let's take a look at how they work:  

### Cons Cells

A [cons cell](https://en.wikipedia.org/wiki/Cons) is a data structure that holds two values or reference to values. The first value is the `head` while the second value is the `tail`, or rather; it points to the tail. In Elixir we can have a list `[1, 2, 3]`. When we look at the first element in the list we will have a cons cell where the head is `1` and the tail is referencing the rest of the list - or rather, it is pointing to its next neightbour. When we use this structure for lists we have a linked list. 

This leads us into why appending values is more expensive than prepending them: any value we want to add to the end of the list, we need to traverse the whole list to find the last element and then append it there. This means that every time we append an element to a list, we have to do this traversal which takes linear time `O(n)`. On top of this, in Elixir, we will have a new list without the reference to the old list. So we are creating a new list for each appended value. As we are abandoning the old list we are occupying memory space with unused data and can hope that [garbage collection](https://www.erlang.org/doc/apps/erts/garbagecollection) will handle it for us. Imagine that this will have to be done for each new element, this will be very expensive for large number of elements when we know that there is an alternative.

The alternative is that we prepend an element to a list. When we do that, we only need to update the head of the list. The tail is still pointing to the rest of the list and we don't need to traverse it. This means that prepending elements is constant time `O(1)`, and we don't have to create a new list, because the "old" list still makes up the rest of the "new" list. This is why we see both memory benefits as well as performance benefits when using cons cells for lists. 

## Reflections  
When I first started to write the span function, my natural inclination was that the function should assemble the list in the correct order. Why would I assemble it backwards only to have to reverse it in the last step? Would not the time complexity of the reverse function be linear (`O(n)`) as well? I think the prudent way is to analyse the total time complexity for each function. 

While `span_list_cons` is doing prepending, the function itself is not constant time - as the function is having to do recursive call for each value between `from` and `to`. This means that the function is not constant time, but rather linear. 

So what is going on with `span_list_concats` then? Well, for each `n` it will be doing an `O(n)` operation for each recursive call, meaning that we end up with a time complexity of `O(n^2)`. This is typically not ideal. 

So concluding on why the reverse function is not dragging `span_list_cons` down in the time complexity calculation is because it is only done once, which means that we have its recursive calls being linear, and just adding the linear time complexity of the reverse call: `O(n) + O(n)` which in the grand scheme of things can be summarised as `O(n)` for large number of operations. 

## Conclusion
**Cons are neat, do more cons!** 