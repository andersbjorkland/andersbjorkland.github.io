+++
title = "Discovering the Elixir programming language"
date = 2023-03-29
weight = 2
draft = false
+++

{{ articleHeader(
path='articles/exploration/discovering_elixir/hero.png'
title='Discovering the Elixir programming language'
) }}

Elixir is an exciting programming language to learn. Especially coming from an Object Oriented Programming (OOP) background. 
There is so much to discover, because for many, it has flown under the radar. Just look at this chart!  
{% quoter() %}Look at it 👇{% end %}
{% centerer() %}(*ignore the cats*){% end %}
{{ imager(
    asset='articles/exploration/discovering_elixir/cute-cats-chart.jpeg', 
    alt='Two charts, where one is clearly higher than the other.', 
    class='center'
) }}

While OOP is a popular thing, functional programming is growing in usage and being used in more contexts. While some 
languages allows for many approaches, Elixir locks you into its functional approach. We won't see any classes or loops,
and we will soon find out why!

Today we will explore some basic structures of the language by building a [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence)
function and a few tests for it. But before we do. A quick run-down of the Fibonacci Sequence. It follows a principle of 
every number being the sum of the one just before and the one before that. To start off, it is stipulated that the first 
and second number are 1. This means that the third number is (1 + 1) = 2. The fourth will be (2 + 1) = 3. So the first 
7 numbers will be: `1 1 2 3 5 8 13`.

{% quoter() %}Let's ***purr*** some Elixir{% end %}

{{ imager(
asset='articles/exploration/discovering_elixir/cat-pouring.jpeg',
alt='A cat in a lab coat is pouring a liquid out of a beaker.',
class='center'
) }}

We create a new file called `fibonacci.ex` and define a module called `Fibonacci`:

```elixir
defmodule Fibonacci do
  def fib(n) when is_integer(n) and n >= 0 do
    fib_helper(n)
  end

  defp fib_helper(0), do: 0
  defp fib_helper(1), do: 1
  defp fib_helper(n), do: fib_helper(n - 1) + fib_helper(n - 2)
end
```

The Module contains a function called `fib` with a [guard](https://elixirschool.com/en/lessons/basics/functions#guards-6) 
defined for it. This means that the function will only be run on arguments that are positive integers. Inside the 
function is another function-call. We make use of a function called `fib_helper`. This function has 3 definitions;
1. One is matching an argument that is 0 and returns 0.
2. One is matching an argument that is 1 and returns 1.
3. One is the Fibonacci sequence logic all wrapped up in recursion.

When we pass it 3, we will match with the third fib_helper, it will first call, fib_helper(2) + fib_helper(1). 
The first function call will again match the 3rd definition, so recursion, and the second function call will match the 
2nd definition. It will continue to do recursive calls until it does not call itself again. Such as is the case for the 
calls that match either the first or the second definition of `fib_helper`.
> A fun detail about `fib_helper` is that it is private within the module. We can make functions private by using `defp`
instead of `def`.  
> 
> An even more fun (as in fundamental) detail is how Elixir just returns values from our functions without us having to 
> tell it to do so.

{% quoter() %}If you don't like recursions, you gonna have a bad time{% end %}

{{ imager(
asset='articles/exploration/discovering_elixir/cat-falling.jpeg',
alt='A cat in a lab coat is pouring a liquid out of a beaker.',
class='center'
) }}

To run our function we can run `iex` from the terminal where the files are located. This will open up the interactive 
Elixir interface, or a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). From this we will 
compile our file: `c("fibonacci.ex")`. This will compile the module for us so we can call the `fib` function on it.
```zsh
 
iex(1)> c("fibonacci.ex")
[Fibonacci]
iex(2)> Fibonacci.fib(5)
5
iex(3)> Fibonacci.fib(7)
13
```

  
How do we know that our function really works correctly? Usually we would write tests. While many programming languages has excellent 
unit testing frameworks available to them as third party libraries, this is not necessary in Elixir. **Because every 
line of code in Elixir is perfect!** Well, mine are. As long as I keep the number of lines to **0**. 

Well, if we do really want tests (and we do), we have a built-in testing-tool called 
[ExUnit](https://hexdocs.pm/ex_unit/ExUnit.html). This means we can start writing tests just by starting a new file. 
Let's create `fibonacci_test.exs`. It will start the ExUnit testing application and make some assertions with the help 
of a module called `ExUnit.Case`. This will make it possible for us to assert that we get the correct Fibonacci value 
for n-th position of the sequence.  
  
```elixir 
Code.require_file("./fibonacci.ex")

ExUnit.start()

defmodule FibonacciTest do
  use ExUnit.Case

  test "fibonacci of 0 is 0" do
    assert Fibonacci.fib(0) == 0
  end

  test "fibonacci of 1 is 1" do
    assert Fibonacci.fib(1) == 1
  end

  test "fibonacci of n is correct" do
    assert Fibonacci.fib(10) == 55
    assert Fibonacci.fib(20) == 6765
    assert Fibonacci.fib(30) == 832040
  end
  
  test "fibonacci of float is not allowed" do
    catch_error Fibonacci.fib(1.2)
  end

  test "fibonacci of negative is not allowed" do
    catch_error Fibonacci.fib(-2)
  end
end

```

For the test file to be aware of the module we want to test, we first have to import the file. Next, we are starting the 
testing application in the file for it to be able to run the module's test-cases. We define a few test-cases, just to 
see that we have defined the constraints for the sequence correctly, and that a few n-th positions returns correct values. 
  
To run the test-file, we will run this in the terminal (not in *iex*):
`elixir fibonacci_test.exs`

Giving us the following output:
```zsh                                                                                                                                                                        
.....
Finished in 0.04 seconds (0.04s on load, 0.00s async, 0.00s sync)
5 tests, 0 failures
```

To dip a bit further into the Elixir pond, let's create a function to return a list of all the values in a sequence up 
to a n-th number, but limit to maximum of 30 numbers. The test for it would look like this: 
```elixir
  test "fibonacci sequence up to 8" do
    assert Fibonacci.seq(8) == [0, 1, 1, 2, 3, 5, 8, 13, 21]
  end
```
> As a matter of the modern take on Fibonacci sequence, the 0-th number is included. 


We create the `seq` function in `fibonacci.ex`. It will make use of our already defined `fib` function. We will see some 
esoteric language, but we will be able to discern the meaning.  

```elixir 
  def seq(n) when is_integer(n) and n >= 0 and n <= 30 do
    Enum.map(0..n, &fib/1)
  end
```
We define the function `seq` to take an integer between (and including) 0 and 30. We then define a list of 
numbers from 0 up to the supplied number (`0..n`) and have a map-function (from `Enum`) to have a function 
applied for each number on the sequence (`&fib/1`). Let's unpack that series of characters a bit!  

- `&` in this context means *(anonymous) function*. 
- `fib/1` is the function with an 
[arity of 1](https://elixirschool.com/en/lessons/basics/functions/#function-naming-and-arity-3) - which means the 
function `fib` that takes 1 argument (no more or less)
- Which means that `&fib/1` is shorthand for writing `fn (n) -> fib n end`.

{% quoter() %}Is that all it takes?{% end %}

{{ imager(
asset='articles/exploration/discovering_elixir/cat-puzzled.jpeg',
alt='Two cats looking up, a bit questioning.',
class='center'
) }}

While this looks neat, let's run the tests:
```zsh 
elixir fibonacci_test.exs                                                                                                                                                                         
......
Finished in 0.04 seconds (0.03s on load, 0.00s async, 0.01s sync)
6 tests, 0 failures
```
***...and all was good!***

Let us now create a print function to print out each value in a sequence. We will see one *convoluted* way of doing it
and refine it later. What we will see is a [pipe operator](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator) 
for passing the result of one function in to the other, [pattern matching](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator) 
to unpack a list, the [unless-condition](https://elixir-lang.org/getting-started/case-cond-and-if.html#if-and-unless) 
to check if a pattern match is not true and a perfectly good for-loop nowhere to be seen and in its place, **recursion**!

In the module `Fibonacci` (`fibonacci.ex`-file) we add these functions:  
```elixir 
  def print_seq(n) do
    seq(n) |> print_seq_helper
  end

  defp print_seq_helper([head|tail]) do
    IO.puts(head)

    unless [] == tail do
      print_seq_helper(tail)
    end

    :ok
  end
```

The first function is the public facing function `print_seq`. This will take an argument and pass it to the `seq` function. 
With `n = 3` the `seq` function would return a list with the value `[0, 1, 2, 3]`. We **pipe** `|> ` this to the next 
function; `print_seq_helper`. Something incredible happens when we do that. We will **pattern match**  the incoming 
argument and have the first element of the list signed onto `head` and keep the rest of the elements as a list in `tail`.  
  
When we call `IO.puts(head)` it will print out the value that is currently in `head`. Next we check that the `tail` is 
not an empty list and again call `print_seq_helper` and let it take the next element in the list to the `head`. And so 
on it goes until the list is empty and a "simple" `:ok` is returned.   
  
The `:ok` is called an 
[atom](https://elixir-lang.org/getting-started/basic-types.html#atoms. It is a constant that has the same value as it is 
named. The name can be most anything we want. We could return `:cat_in_a_hat` if we wanted to! 
  
When we return to `iex` we can compile the latest changes and see what our output will be:
```zsh 
iex(1)> c("fibonacci.ex")
warning: redefining module Fibonacci (current version defined in memory)
  fibonacci.ex:1

[Fibonacci]
iex(2)> Fibonacci.print_seq(8)
0
1
1
2
3
5
8
13
21
:cat_in_a_hat
```

{{ imager(
asset='articles/exploration/discovering_elixir/cat-in-a-hat.jpeg',
alt='A cat in a hat on top of a table with a few beakers surrounding it.',
class='center'
) }}

Great! It's just the way we wanted it. And we got a cat in a hat as well. But why no for loop to go through the list? 
The thing about Elixir is immutability. It just has a complete loathing of variables that are ***variable***... anything 
that changes what they once have said they are. It rather have you trash your variable and replace it with a new than 
you were to change the value of the variable. A for-loop or a for-each-loop would have a variable hold the current 
iteration or element without replacing the variable. So a loop like this would constantly be changing the value of the 
loop variable. 
  
With all of that now out of the way, how could we rewrite the print-function to be a bit more neat? How about this?!

```elixir 
  def print_seq(n) do
    Enum.each(seq(n), &IO.puts/1)
  end
```

No need for a helper-function and everything done in a single row. It looks very nice, and  it has a pretty good 
replacement for a for-each loop. The sad news though: we lost the `:cat_in_a_hat`, but it's **:ok**!

```zsh
iex(3)> r(Fibonacci)
warning: redefining module Fibonacci (current version defined in memory)
  fibonacci.ex:1

{:reloaded, [Fibonacci]}
iex(4)> Fibonacci.print_seq(8)
0
1
1
2
3
5
8
13
21
:ok
```

In this article, we have made some pretty astounding discoveries!
* There are other programming languages out there beside [insert your favourite language here]
* Functional programming is **do-able**
* For-loops are mutable, and mutations are loathed
* Recursions everywhere!
* Pattern matching can be used for unpacking values of a list
* Functions can have guards
* Arity is apparently a thing
* Pipe operators gives this to that
* `fn` needs shortening to `&`
* Tests are right there to be written, if you don't write perfect code from line 0
* The author of this article has a weird fixation to include cats in this article. It has nothing to do with Elixir, 
so why keep it going? Was it so he could have a cat_in_a_hat in the end? Or was it to end it with a pun? In either way,
Elixir looks **purr**fect!

{{ imager(
asset='articles/exploration/discovering_elixir/happy-cat.jpeg',
alt='A happy cat in a top hat on top of a table holding up a vile with liquid in it. The cat, despite doing this, looks professional.',
class='center'
) }}