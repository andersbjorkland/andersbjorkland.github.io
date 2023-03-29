+++
title = "Discovering the Elixir programming language"
date = 2023-03-20
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
{{ imager(
    asset='articles/exploration/discovering_elixir/chart-2-lines.jpeg', 
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
  require Fibonacci

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
testing application for it to be run our test-cases. We define a few test-cases, just to see that we have defined the 
constraints for the sequence correctly, and that a few n-th positions returns correct values. 