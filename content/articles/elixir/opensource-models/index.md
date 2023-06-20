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

## 1. Sentiment analysis
Natural language processing (NLP) is a field where we can harness the power of computers to make sense of human language. That's where we see models such as [BERT](https://huggingface.co/blog/bert-101) or [BART](https://huggingface.co/docs/transformers/model_doc/bart) being used for different tasks. When it comes to sentiment analysis, we often see a BERT-type model being used. One example is XLM-RoBERTa, a multilingual model. In this example we can see it being used for classifying a text based on 3 different categories, and the probability that the text expresses a particular sentiment: 

{{ imager_standard(
    asset='articles/elixir/opensource-models/roberta-sentiment.png', 
    alt='Prompt: "If cats ruled the world, nothing would be different. So how do we know that they are not already ruling?". Negative: 0.686, Neutral: 0.276, Positive: 0.038', 
    class='center'
) }}

The model in this case is [cardiffnlp/twitter-xlm-roberta-base-sentiment](https://huggingface.co/cardiffnlp/twitter-xlm-roberta-base-sentiment?text=If+cats+ruled+the+world%2C+nothing+would+be+different.+So+how+do+we+know+that+they+are+not+already+ruling%3F). It is further specialization of XLM-RoBERTa by training on 198M tweets. So to no surprise it can make sense of emojis as well. However, it has difficulty detecting sarcasm. There are particular ventures [1](https://towardsdatascience.com/sarcasm-detection-with-nlp-cbff1723f69a), [2](https://ieeexplore.ieee.org/abstract/document/8284317) that seeks to rectify that!

{{ imager(
    asset='articles/elixir/opensource-models/cat-ruler-01-m.png', 
    alt='Prompt: "If cats ruled the world, nothing would be different. So how do we know that they are not already ruling?". Negative: 0.686, Neutral: 0.276, Positive: 0.038', 
    class='center',
    subtext='User generated image using Bing Image Creator'
) }}

Read the paper introducing XLM-RoBERTa, from November 2019: [Unsupervised Cross-lingual Representation Learning at Scale](https://arxiv.org/abs/1911.02116).

## 2. Image classification with ResNet
From Microsoft Research comes this open source Image Recognition model, Residual Network (ResNet). In its basic form, it will try to classify a single dominant object in a picture. Derived models comes with more features, such as detecting multiple objects in a picture.  
  
In this example, the [facebook/detr-rednet-101](https://huggingface.co/facebook/detr-resnet-101) model detects 3 objects, but gives two classifications for the car, either a truck or a car. It also successfully detects the two persons.

{{ imager_standard(
    asset='articles/elixir/opensource-models/detr-resnet-101-01.png', 
    alt='ResNet analysis of image with a car in the background, and an elderly woman with a young boy in the foreground.', 
    class='center'
) }}

The ResNet model was introduced by Microsoft Research in December 2015 with the paper [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385). The detection transformer (DETR) variant from Facebook AI was introduced in May 2020 with the paper [End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872).

## 3. Voice recognition with Whisper
Automatic speech recognition is a task where a model is used to enable a program to process human speech into text. So in essence, it is a speech-to-text model. Whisper is a popular model from OpenAI. It can be used for transcribing recordings and real-time speech recognition tasks.

In this example I'm posing the model with an important query:
{{ imager_standard(
    asset='articles/elixir/opensource-models/whisper-01.png', 
    alt='Speech is transcribed to "Just because you can Fourier transform a cat doesn't mean you should, but really you really should.".', 
    class='center'
) }}

Whisper was introduced in December 2022 in the paper [Robust Speech Recognition via Large-Scale Weak Supervision](https://arxiv.org/abs/2212.04356).

## 4. Named Entity Recognition
A useful task in processing language is extracting tokens from text, such as recognizing if a location or a person is mentioned, or perhaps some grammatical features. BERT is often used for this as this model is good at taking the context into account, and if multilingual support is needed, XLM-RoBERTa can be applied. 

In this example we are using a RoBERTa model trained on English to detect persons, location, and organization:

{{ imager_standard(
    asset='articles/elixir/opensource-models/RoBERTa-NER-task-01.png', 
    alt='Prompt "Me and my friends Elaine and Karla live on Mêlée Island where we often frequent the Scumm Bar.", highlighted are the words "Elain" and "Karla" which are marked with "PER", "Mêlée Island" is marked with "LOC", and "Scumm Bar" is marked with "ORG".', 
    class='center'
) }}

Read about the RoBERTa model, introduced in July 2019, from Facebook AI in the paper [RoBERTa: A Robustly Optimized BERT Pretraining Approach](https://arxiv.org/abs/1907.11692).

## 5. Text Generation
This is one of the tasks that has lead to some AI-craze of late, especially when a Text Generation model is being used as a chat partner. **ChatGPT** based on GPT versions 3+ and **BARD** based on PaLM, are two examples of this. But neither is currently on an open source license. **HuggingChat** is closer to open-source, but it is based on a LLaMA derivate and so it has a different kind of license attached (not any of the common open-source licenses like Appache 2.0 or MIT). There are more specialized conversational models, like [facebook/blenderbot](https://huggingface.co/facebook/blenderbot-400M-distill).

But if we want to take a look at a simpler text-generation task, without the conversational part, we can find many available models. [DistilGPT2](https://huggingface.co/facebook/blenderbot-400M-distill) is a smaller variant of GPT version 2, an open-source model. Here it is in action, where we can see it generate one word at a time.

{{ videoer(source='articles/elixir/opensource-models/distilgpt2.webm', type='video/webm')}}

Read the paper behind GPT from OpenAI: [Language Models are Unsupervised Multitask Learners](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf).

## 6. Image Generation with Stable Diffusion
Stable Diffusion is a text-to-image diffusion model from Stability AI. Released in [August 2022](https://stability.ai/blog/stable-diffusion-public-release) it is an open-sourced licensed model that in short "[strives for both the open and responsible downstream use of the accompanying model](https://huggingface.co/spaces/CompVis/stable-diffusion-license)". 

{{ videoer(source='articles/elixir/opensource-models/diffusers_showcase.webm', type='video/webm')}}

Hugging Face has released a native application for Mac: [Diffusers](https://apps.apple.com/se/app/diffusers/id1666309574?l=en&mt=12). Showcased above, we can choose one of the available versions, write a prompt, and number of steps (the higher the steps, in general, the higher the quality).

A paid service to use the different versions of Stable Diffusion do also exist. Stability AI offers [DreamStudio](https://dreamstudio.ai/), where we can generate images right in the browser.

## Bubbler: Text Summarization
There are models that have trained on texts that have been distorted and the models then should be able to recreate the text in its original form. This way of training has led to models like BART being well suited to tasks where they should distil a body of text in to smaller segments in a way where it does not lose too much information. 

An example of this is [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn), which is a BART model that has been trained on CNN Daily Mail. When summarizing the very first paragraph of Charles Dickens's "A Tale of Two Cities" we get:  

{% quoter() %}"It was the best of times, it was the worst of times," he says. "We were all going direct to Heaven, we were all going direct the other way". "We had everything before us, we had nothing before us," he adds. "The spring of hope" was the winter of despair.{% end %}

{{ imager(
    asset='articles/elixir/opensource-models/cat-to-heaven.png', 
    alt='A white cat with sunglasses on sitting on top of a stair going towards the sky above a cityscape', 
    class='center',
    subtext='User generated image using SDXL Beta'
) }}

## Bubbler: Q/A
