+++
title = "Schroedinger's Snack Stash"
date = 2023-12-28
weight = 2
authors = ["Anders Björkland"]
description = "A tale of Elixir programming, sea serpents, and the legendary Schroedinger’s Snack Stash. Join Keith, the Quantum Quokka, in the quirky town of Beakerage as he finds a way to improve how to store confections in a 'safer' way."

[taxonomies] 
category=["beakerage"]
tags=["Elixir"]
+++

{{ articleHeader(
path='articles/beakerage_chronicles/schroedingers_snack_stash/hero.png'
title="Schroedinger's Snack Stash"
subtitle=''
) }}  

_In the heart of Beakerage, where sea serpents sunbathed and pocket-sized black holes were as common as gossip at the local bakery, Keith - the Quantum Quokka - awoke with a start! “**May your macarons never vanish into the void**.” The ethereal voice was still echoing in Keith’s mind. He couldn’t recall anyone making such an astute statement, yet here it was: haunting him! His pocket-blackhole had been in a binging phase lately, often pulling each of his emergency snacks beyond the event horizon, leaving barely a crumb for sustenance._

> **Beyond Beakerage - Elixir conundrums and learnings**
> * Module Definition
> * Aliasing modules
> * Struct Definition
> * Struct Manipulation
> * Pipelining
> * Elixir Documentation
> * Function Definition
> * Private Function
> * Pattern Matching
> * DateTime Manipulation
> * String Interpolation
> * Enum Mapping
> * Writing tests
> * Test for errors

It had been a conundrum, one which he thought he had solved with the help of his sunspot friend, Sylvie. Keith put on his slippers and waddled over to his desk while pondering. He always carried his pocket-blackhole in his ‘emergency’-pocket, and could not make use of his ‘safekeeping’-pocket for his snacks. That would violate the quantum coherence keeping his blackhole functional. But a third pocket would keep a snack in superposition in perpetuity, until observed! He had deftly solved it by adding a `QuantumPocket`, but feared that it was not as robust as he would like. These thoughts kept bugging his dreams.

Carefully sorting away his notes on “the great disco ball multiverse theory” (this is a story for another time), he laid down a fresh sheet of paper and sat down. “No sleep tonight, but a solution to behold I hope”, Keith thought to himself as he leaned over the desk and grabbed a pair of safety goggles and put them on. His tiny hands started scribbling furiously. His quokka brain buzzed with ideas. He needed a pocket that defied both entropy and existential uncertainty: a pocket that would not collapse into a probability haze!

As the night turned to dawn, the first glimpses of a solution appeared on the horizon. Keith had his blueprint ready. He found that his pocket would need three components:
Stardust Silk, a robust and hardy material that would withstand quantum fluctuations by weaving memories together.
Time-sprinkled Velcro, would stick to itself across parallel dimensions, fastening past with the future.
Uncertainty Thread, would surely leave snacks in a delightful superposition by threading memories within a bubble beyond space-time.

{{ imager(
    asset='articles/beakerage_chronicles/schroedingers_snack_stash/keith_in_goggles_blueprint.png', 
    alt='A quokka with a lab coat, sitting by a workbench waring safety goggles.', 
    class='center',
    subtext='A typical early day, Keith with sketches for a new invention or discovery [SDXL generation]'
) }}

While many would need to cross the Severely Sinister Sea in search of moon spiders and pixieworms, Keith had all he needed in his right pocket: a blackhole with an Elixir interface!

Setting out to construct the weave, Keith pulled out an otherworldly silk by his fingertips:
```elixir
defmodule StardustSilk do
  @doc """
  Weave the Stardust Silk, capturing cosmic memories
  """
  def weave(memories) when is_list(memories) do
    memories
    |> Enum.map(&capture_memory/1)
    |> Enum.join
  end

  defp capture_memory(memory) do
    "🌟 #{memory} 🌟"
  end
end
```

To make sure to keep the nightmares at bay, Keith realized he would need to construct tests for each module as well:

```elixir
defmodule StardustSilkTest do
  use ExUnit.Case

  test "weave memories into Stardust Silk" do
    memories = ["Galaxy memories", "Comet sighs", "Black hole laughter"]
    expected_result = "🌟 Galaxy memories 🌟🌟 Comet sighs 🌟🌟 Black hole laughter 🌟"

    assert StardustSilk.weave(memories) == expected_result
  end
end
```

Keith threaded his tiny needle, its tip sharper than a quasar’s wit. The Stardust Silk shimmered, each strand holding a memory: the birth of a galaxy, the sigh of a comet, the laughter of a black hole. Keith’s quokka brain buzzed with anticipation. He was ready to weave eternity. Safe, knowing it would hold a cosmic weight worth of snacks - as long as it withstood the pressure and tearing of the space-time-continuum.

Looking over his blueprint again; time-sprinkled velcro would hold the snack secure over past, present, and future - up until the time the bubble would be burst by Keith’s nimble fingers searching for a macaron. Knowing that the velcro will require a datetime, he deftly made use of pattern matching to structure the time-cohesive:

```elixir
defmodule TimeSprinkledVelcro do
  @doc """
  Attach the Velcro to moments, bridging past and future
  """
  def attach(%DateTime{} = moment) do
    past = DateTime.add(moment, -1, :day)
    future = DateTime.add(moment, 1, :day)

    "🕰️ (from #{past} to #{future}) 🕰️"
  end
end
```

And the accompanying tests:
```elixir
defmodule TimeSprinkledVelcroTest do
  use ExUnit.Case

  test "attach Velcro to moments" do
    datetime = ~U[2023-12-26T07:51:11Z]
    past = ~U[2023-12-25T07:51:11Z]
    future = ~U[2023-12-27T07:51:11Z]

    # Test the function with a specific moment
    expected_result = "🕰️ (from #{past} to #{future}) 🕰️"

    assert TimeSprinkledVelcro.attach(datetime) == expected_result
  end

  test "raises an error for invalid input" do
    assert_raise FunctionClauseError, fn ->
      TimeSprinkledVelcro.attach("2023-12-26T07:51:11Z")
    end
  end
end
```

Having pulled both the stardust silk and the time-sprinkled velcro from the abyss, the Quantum Quokka contemplated how the uncertainty thread best would keep its characteristics once it was drawn from the blackhole as well. It all would come down to how the thread was observed! So letting something else do its magic with the thread would solve the dilemma: 

```elixir
defmodule UncertaintyThread do
  alias StardustSilk, as: Silk
  alias TimeSprinkledVelcro, as: Velcro

  @doc """
  Thread each possible outcome together with rigorous uncertainty
  """
  def thread(unknown, %Silk{} = silk_struct) when is_function(unknown, 1) do

    memories_with_result =
      Enum.map(silk_struct.memories, fn memory ->
        amount = unknown.(:rand.uniform(42))
        "#{memory} (#{amount})"
      end)

    silk = Silk.weave(memories_with_result)
    velcro = Velcro.attach(DateTime.utc_now)

    %{silk: silk, velcro: velcro}
  end
end
```

And testing for the expected behavior:  
```elixir
ExUnit.start()

defmodule UncertaintyThreadTest do
  use ExUnit.Case

  test "threads memories and results" do
    silk_struct = %StardustSilk{memories: ["Galaxy memories", "Comet sighs"]}
    result = UncertaintyThread.thread(fn _ -> 42 end, silk_struct)

    assert result.silk == "🌟 Galaxy memories (42) 🌟🌟 Comet sighs (42) 🌟"

    expected_pattern = ~r/🕰️ \(from \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}Z to \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}Z\) 🕰️/
    assert Regex.match?(expected_pattern, result.velcro)
  end
end

```

StardustSilk and TimeSprinkledVelcro with UncertaintyThread weaves a handsomely new pocket under Keith’s nimble fingers. When he attached the new pocket to his coat he already felt a light tingle of anticipation. Schroedingers Snack Stash 2.0! While he could never be certain of the number of snacks he could retrieve, he now knew that the combination of the memories of the universe and the time spent in the past would fix some amount of snacks into the present. No longer was the dilemma whether there would be a snack or not, but whether there would be plenty or a few.

{{ imager(
    asset='articles/beakerage_chronicles/schroedingers_snack_stash/keith_in_a_macaron_rain.png', 
    alt='A quokka with a lab coat, looking with wonder around him', 
    class='center',
    subtext='Wonder of all wonders, a rain of macarons [SDXL generation]'
) }}

And the Quantum Quokka reached into his pocket and found a fistful of probability-flavored macarons. A comet far-away sighed with relief, and on a beach much closer a sea serpent blessed the sun as it turned over to bathe in its rays. Who knew when a day would come when tampering with the space-time continuum would break Beakerage, but today was not that day. The Quantum Quokka looked at the fistful of macarons and thought to himself; “may you never vanish into the void”, and stuffed his mouth full of the delightful confections. 

> **Beyond Beakerage - check your Elixir knowledge**
> * How do you define a module?
> * Why would you use a struct instead of a map?
> * Did you see any use of pipelining?
> * Would you prefer using pattern matching or a “when” guard for making sure a function gets the correct type of argument?
> * How can you test that an error will be thrown?

