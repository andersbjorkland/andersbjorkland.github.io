+++
title = "The Macaron Paradox"
date = 2023-12-20
weight = 1
authors = ["Anders Björkland"]
description = "A tale of Elixir programming, sea serpents, and the legendary Schroedinger’s Snack Stash. Join Keith, the Quantum Quokka, in the quirky town of Beakerage as he solves The Macaron Paradox."

[taxonomies] 
category=["beakerage"]
tags=["Elixir"]
+++

{{ articleHeader(
path='articles/beakerage_chronicles/macaron_paradox/hero.png'
title='The Macaron Paradox'
subtitle=''
) }}  

> _It was a bustling town tearing by its threads. It was on the cusp of being called a city by the travelers arriving by boatloads each day, were it not for the inhabitants wielding their favorite pastry in a threatening way on even the slightest suggestion that their town was not just a little hamlet by the harbor. Once upon a time it was! And it was the way that many residents would like to keep it; a place separated from the world and the succession of time. But then the sunbathing sea serpents started dwelling on its shores, word spread of its many characters and possibilities, and so the world became aware of the quaint community by the Severely Sinister Sea: Beakerage!_

On a sunny afternoon, Keith reclined on a beach towel. His coat unbuttoned to reveal his small frame as his fur absorbed the sun’s rays like a solar-powered calculator. Many knew him affectionately as the Quantum Quokka. Next to him was one of the sea serpents; Sylvie. Her scales shimmering in the sun in shades of red and purple. They would often find themselves sharing the sunspots and the occasional algebraic equation. Having just ended a lengthy discussion on the application of Schrödinger Equations for slowing down the time in Beakerage, Keith found himself in a sticky situation: his stomach had started growling. His emergency snack radar pinged - it was time for macarons!

Jumping up on his two feet, Keith quickly put his hand down his right pocket, the one designated for emergency but found only void - literal void!

{{ imager(
    asset='articles/beakerage_chronicles/macaron_paradox/keith_quantum_quokka.png', 
    alt='A quokka with a lab coat, sitting on a towel on a sunny beach.', 
    class='center',
    subtext='User generated image using SDXL1'
) }}

Arching a non-existing eyebrow, Sylvie gave a questioning glance. “The pocket-sized black hole, again?”

“Curse you, entropy!” Keith muttered, shaking his tiny fist at the void. “Why must you devour my macarons?”

“Entropy?” Sylvie questioned. “Are you sure it’s not just a hungry singularity?”

“Same difference.” Keith sighed. “But it’s a conundrum I can’t seem to escape: I can’t put my emergency macarons in my left ‘just for safekeeping’ pocket - that would violate the principles of quantum coherence”

Sylvie blinked. “You don’t make much of a coherent sense right now!”

“Quantum coherence,” Keith started. “You see, in our world, pockets exist in a delicate superposition. They’re simultaneously ‘emergency’ and ‘safekeeping.’ If I put an emergency item in my left pocket, it collapses the waveform, and suddenly it’s no longer safekeeping!”

“That’s not how it is in our world. I think it’s only you. But you would need a third pocket?” Sylvie wondered.

Keith jumped at the idea. “Exactly! I need a ‘Schroedinger’s Snack Stash’. It’ll exist in both states until observed. That way, my macarons won’t vanish.”

Opening his pocket-sized black hole (carefully avoiding its event horizon), Keith coded an Elixir module: 

```elixir
defmodule QuantumPocket do
  defstruct snacks: []
  
  def add_snack(pocket, snack) when is_list(snack) do
    %{pocket | snacks: pocket.snacks ++ snack}
  end
end
```

Keith summoned his freshly baked pocket and stored a little macaron crumb in it:
```elixir
keiths_pockets = %QuantumPocket{}
safekeeping_pocket = QuantumPocket.add_snack(keiths_pockets, ["Emergency Macarons (crumb)"])
```

“Are you sure that the little crumb is still there?” Sylvie inquired.

Keith looked in the pocket to verify:
```elixir
IO.inspect(safekeeping_pocket.snacks)  # ["Emergency Macarons (crumb)"]
```

With a sigh of relief Keith looked over at Sylvie. “Yeah, it’s all good. Just wish it was the whole set, a crumb won’t carry me over until lunch.”

“That’s the beauty of sunspot friends then. It’s not a probability flavored macaron, but have some of my milkshake that probably tastes of strawberry”.

Keith grinned. “Looks like I’ve cracked the code, but you sure saved the afternoon”. And so, Keith, the Quantum Quokka, reclined once more. Sylvie nodded approvingly and followed suit. 

And thus, the legend of Schroedinger's Snack Stash was born - a tale of quantum pockets, sweet paradoxes, and the eternal struggle between hunger and coherence. 
