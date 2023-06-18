+++
title = "Top 6 uses of open source machine learning models"
date = 2023-05-30
weight = 2
authors = ["Anders Björkland"]
draft = false

[taxonomies] 
category=["Elixir"]
tags=["axon", "AI", "ONNX", "BumbleBee", "HuggingFace"]
+++

{{ articleHeader(
path='articles/elixir/liveview_and_broadcast/hero-slim.png'
title='Top 6 uses of open source machine learning models'
) }}

AI is all the rage right now. While it's not the first time in history that we believe we are on the cusp of a great leap in AI advancement only to have an ["AI winter"](https://en.wikipedia.org/wiki/AI_winter) fall upon the field. This time it feels different, and rather than waning investments in the field, we see many diverse organizations (and individuals) running towards ChatGPT and other ML models to enhance their operations. We can see their uses from Search Algorithms to medical diagnoses. [While some argue](https://www.technologyreview.com/2023/05/12/1072950/open-source-ai-google-openai-eleuther-meta/) that privately owned and privately licensed models will always have the upper hand on open source models, the [opposite sentiment can also be found](https://www.semianalysis.com/p/google-we-have-no-moat-and-neither). No matter which side of the argument you fall, it can't be denied that open source models can provide great value for whomever chooses to use them.

In this article we will dive into a few of these models and see what they are capable of. We will give an overview of different areas they can be used in and provide links for those who want to read their respective research paper. We will see models for sentiment analysis, image recognition, voice recognition, named entity recognition, text generation, and text-to-image generation. And as a surprise (**SPOILER ALERT!**), we may recognize that some of these models have multiple areas of applications.

## Sentiment analysis
Natural language processing (NLP) is a field where we can harness the power of computers to make sense of human language. That's where we see models such as RobertaXLM being used for different tasks, such as making an assessment for if a review of a product was a positive one or not, or if an article is critical of a particular legislation initiative.

## Image Generation with Stable Diffusion
Stable Diffusion is a text-to-image diffusion model from Stability AI. Released in [August 2022](https://stability.ai/blog/stable-diffusion-public-release) it is an open-sourced licensed model that in short "[strives for both the open and responsible downstream use of the accompanying model](https://huggingface.co/spaces/CompVis/stable-diffusion-license)". 

{{ videoer(source='articles/elixir/opensource-models/diffusers_showcase.webm', type='video/webm')}}

Hugging Face has released a native application for Mac: [Diffusers](https://apps.apple.com/se/app/diffusers/id1666309574?l=en&mt=12). Showcased above, we can choose one of the available versions, write a prompt, and number of steps (the higher the steps, in general, the higher the quality).