+++
title = "Mysterious Crystal Ball"
date = 2024-02-29
weight = 1
draft = false
authors = ["Anders Björkland"]
description = "An Elixir Livebook project showcasing process messages and Machine Learning model usage"
+++

{{ articleHeader(
path='showroom/mysterious-crystal-ball/hero.webp'
title='Mysterious Crystal Ball'
) }}

A Livebook application that behind the scenes fetches 10 of the latest news stories from the previous day based on a randomly selected subject. 
It then applies the [HuggingFaceTB/cosmo-1b](https://huggingface.co/HuggingFaceTB/cosmo-1b) to generate a cryptic message about the news stories which are then stored into a term-file. 
One of these stories are selected and displayed.  
  
As the app does not have access to a GPU, the text-generation task that *cosmo-1b* performs can take 5 minutes which is handled concurrently in a separate task. 
If the latest messages has not been loaded in this way, the app will choose one from the day before while this is taking place.  
  
[***Check Mysterious Crystal Ball out on Hugging Face***](https://beercan-unsmart.hf.space/apps/mystery)
