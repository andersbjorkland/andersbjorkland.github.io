+++
title = "Cons is Good - or why concatenating lists is slower than prepending elements"
date = 2024-12-08
updated = 2024-12-08
weight = 3
authors = ["Anders Björkland"]
description = "There are different ways to add an element to a list, but some ways are better than others. In Elixir this comes down to the difference between copying new lists for each element versus just referencing the list from the new element."
draft = true

[taxonomies] 
category=["Elixir"]
tags=["Elixir", "Data Science"]
+++

{{ articleHeader(
path='articles/elixir/opensource-models/hero.png'
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
```

As we can see, `span_list_cons` performs way better. The offficial documentation has this to say about that:  
> Due to their cons cell based representation, prepending an element to a list is always fast (constant time), while appending becomes slower as the list grows in size (linear time)  

But why is that? What does it mean that cons cells are faster than appending? Let's take a look at how they work:  

### Cons Cells

A [cons cell](https://en.wikipedia.org/wiki/Cons) is a data structure that holds two values or reference to values. The first value is the `head` while the second value is the `tail`, or rather; it points to the tail. In Elixir we can have a list `[1, 2, 3]`. When we look at the first element in the list we will have a cons cell where the head is `1` and the tail is referencing the rest of the list - or rather, it is pointing to its next neightbour. When we use this structure for lists we have a linked list. 

This leads us into why appending values is more expensive than prepending them: any value we want to add to the end of the list, we need to traverse the whole list to find the last element and then append it there. This means that every time we append an element to a list, we have to do this traversal which takes linear time `O(n)`. On top of this, in Elixir, we will have a new list without the reference to the old list. So we are creating a new list for each appended value. As we are abandoning the old list, this will be marked for [garbage collection](https://www.erlang.org/doc/apps/erts/garbagecollection). Imagine that this will have to be done for each new element, this will be very expensive for large number of elements!

On the other hand, when we prepend an element to a list, we only need to update the head of the list. The tail is still pointing to the rest of the list and we don't need to traverse it. This means that prepending elements is constant time `O(1)`, and we don't have to create a new list, because the "old" list still makes up the rest of the "new" list. 