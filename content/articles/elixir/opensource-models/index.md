+++
title = "Top 6 uses of open source machine learning models (and more)"
date = 2023-05-30
weight = 2
authors = ["Anders Björkland"]
draft = false

[taxonomies] 
category=["Elixir"]
tags=["axon", "AI", "ONNX", "BumbleBee", "HuggingFace"]
+++

{{ articleHeader(
path='articles/elixir/opensource-models/hero.png'
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

An up-and-coming large language model, [Falcon](https://huggingface.co/blog/falcon), is another open-source model. Compared to the other alternatives here, this one is bigger and more resource-intensive. But work is being done to make it work on lighter commercial machines. 

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
Question and Answer is a task well suited for models that take context of words into account. The BERT-family of models are often used here. In general, there are in general three types of Q/A models: extractive, open-generative, and closed-generative. Extractive models can *extract* the answer from the provided context (be it text, table, or markup). Open-generative models glean the answer from the context and generate free text as an answer. Closed-generative models do not need a provided context. They are trained within a domain and the answer is purely generated by the model.

### Extractive model example
With the [DistilBERT](https://huggingface.co/distilbert-base-cased-distilled-squad?context=Quantum+machine+learning+is+the+integration+of+quantum+algorithms+within+machine+learning+programs.+The+most+common+use+of+the+term+refers+to+machine+learning+algorithms+for+the+analysis+of+classical+data+executed+on+a+quantum+computer%2C+i.e.+quantum-enhanced+machine+learning.+While+machine+learning+algorithms+are+used+to+compute+immense+quantities+of+data%2C+quantum+machine+learning+utilizes+qubits+and+quantum+operations+or+specialized+quantum+systems+to+improve+computational+speed+and+data+storage+done+by+algorithms+in+a+program.&question=What+is+an+advantage+of+using+quantum+machine+learning%3F) model, we can see how it finds the sentence that best can answer the question and extract it from the provided context:

>**Context**:  
`Quantum machine learning is the integration of quantum algorithms within machine learning programs. The most common use of the term refers to machine learning algorithms for the analysis of classical data executed on a quantum computer, i.e. quantum-enhanced machine learning. While machine learning algorithms are used to compute immense quantities of data, quantum machine learning utilizes qubits and quantum operations or specialized quantum systems to improve computational speed and data storage done by algorithms in a program.`
>  
>**Question**:  
>What is an advantage of using quantum machine learning?  
>   
>**Answer**:  
>`improve computational speed and data storage`
  
There are also contexts that can be in table-format. The [Google/TAPAS](https://huggingface.co/google/tapas-base-finetuned-wtq) model is used in this example to find the correct answer from a table-cell:

{{ imager_standard(
    asset='articles/elixir/opensource-models/tapas-01.png', 
    alt='Prompt: "How many stars does the transformers repository have?". 1 match :
36542', 
    class='center'
) }}

TAPAS is a BERT-like model trained on English Wikipedia articles. It trained in a  self-supervised way where it learned to associate texts with tables, as well as learned numerical reasoning. Read more about the model in its accompanying paper from 2020 by Google Research: [TAPAS: Weakly Supervised Table Parsing via Pre-training](https://arxiv.org/abs/2004.02349).

### Open-generative model example  
An open-generative model will rely on contexts to freely generate answers. The context is sometimes a database of documents, as is the case for [Wikipedia Assistant](https://huggingface.co/spaces/deepset/wikipedia-assistant). It provides a Long-Form Question Answering that can encode the question to fetch relevant documents (context) and a BART model that can parse the provided context to generate an answer.

>**Question**:  
>What is an advantage of using quantum machine learning?  
>  
>**Answer**  
>`Quantum machine learning is an area of research that is still very much in its infancy. The most common use of the term refers to machine learning algorithms for the analysis of classical data executed on a quantum computer, i.e. "quantum-enhanced machine learning" (QML). The main advantage of QML is that it can be applied to a large number of data sets at once. For example, if you have a large set of data, and you want to learn how to classify it, you can use QML to do this. However, the problem is that QML can't be used to solve all of the data sets in the same way that a classical machine learning algorithm can. For instance, you might want to use a QML algorithm to solve the problem of how to categorize a large collection of images, but you can't use a classical algorithm to do the same thing with the same number of images. So, you need to use quantum machine learning to solve this problem. Another advantage is that you don't have to worry about the fact that the data set you're trying to classify is quantum.`  
>
>  
<blockquote>
<details>
    <summary><b>Found contexts:</b></summary>
    <pre data-lang="json" style="background-color:#2b303b;color:#c0c5ce;" class="language-json "><code class="language-json" data-lang="json"><span>[
</span><span>  {
</span><span>    "</span><span style="color:#a3be8c;">wikipedia_id</span><span>": "</span><span style="color:#a3be8c;">30303286</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">title</span><span>": "</span><span style="color:#a3be8c;">Decoding Reality</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">text</span><span>": "</span><span style="color:#a3be8c;">Quantum computers offer a search advantage over classical computers by searching many database elements at once as a result of quantum superpositions. A sufficiently advanced quantum computer would break current encryption methods by factorizing large numbers several orders of magnitude faster than any existing classical computer. Any computable problem may be expressed as a general quantum search algorithm although classical computers may have an advantage over quantum search when using more efficient tailored classical algorithms. The issue with quantum computers is that a measurement must be made to determine if the problem is solved which collapses the superposition. Vedral points out that unintentional interaction with the environment can be mitigated with redundancy, and this would be necessary if we were to scale up current quantum computers to achieve greater utility, i.e. to utilize 10 qubits have a 100 atom quantum system so that if one atom decoheres a consensus will still be held by the other 9 for the state of the same qubit.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">section</span><span>": "</span><span style="color:#a3be8c;">Section::::Contents.:</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">Surfing the Waves: Hyper-Fast Computers</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">start_paragraph_id</span><span>": </span><span style="color:#d08770;">20</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_paragraph_id</span><span>": </span><span style="color:#d08770;">20</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">start_character</span><span>": </span><span style="color:#d08770;">0</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_character</span><span>": </span><span style="color:#d08770;">1055</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">answer_similarity</span><span>": "</span><span style="color:#a3be8c;">0.82</span><span>"
</span><span>  },
</span><span>  {
</span><span>    "</span><span style="color:#a3be8c;">wikipedia_id</span><span>": "</span><span style="color:#a3be8c;">44108758</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">title</span><span>": "</span><span style="color:#a3be8c;">Quantum machine learning</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">text</span><span>": "</span><span style="color:#a3be8c;">Quantum machine learning is an emerging interdisciplinary research area at the intersection of quantum physics and machine learning. The most common use of the term refers to machine learning algorithms for the analysis of classical data executed on a quantum computer, i.e. </span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">quantum-enhanced machine learning</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">. While machine learning algorithms are used to compute immense quantities of data, quantum machine learning increases such capabilities intelligently, by creating opportunities to conduct analysis on quantum states and systems. This includes hybrid methods that involve both classical and quantum processing, where computationally difficult subroutines are outsourced to a quantum device. These routines can be more complex in nature and executed faster with the assistance of quantum devices. Furthermore, quantum algorithms can be used to analyze quantum states instead of classical data. Beyond quantum computing, the term </span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">quantum machine learning</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;"> is often associated with classical machine learning methods applied to data generated from quantum experiments (i.e. </span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">machine learning of quantum systems</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">), such as learning quantum phase transitions or creating new quantum experiments. Quantum machine learning also extends to a branch of research that explores methodological and structural similarities between certain physical systems and learning systems, in particular neural networks. For example, some mathematical and numerical techniques from quantum physics are applicable to classical deep learning and vice versa. Finally, researchers investigate more abstract notions of learning theory with respect to quantum information, sometimes referred to as </span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">quantum learning theory</span><span style="color:#96b5b4;">\"</span><span style="color:#a3be8c;">.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">section</span><span>": "",
</span><span>    "</span><span style="color:#a3be8c;">start_paragraph_id</span><span>": </span><span style="color:#d08770;">1</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_paragraph_id</span><span>": </span><span style="color:#d08770;">1</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">start_character</span><span>": </span><span style="color:#d08770;">0</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_character</span><span>": </span><span style="color:#d08770;">1704</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">answer_similarity</span><span>": "</span><span style="color:#a3be8c;">0.70</span><span>"
</span><span>  },
</span><span>  {
</span><span>    "</span><span style="color:#a3be8c;">wikipedia_id</span><span>": "</span><span style="color:#a3be8c;">44108758</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">title</span><span>": "</span><span style="color:#a3be8c;">Quantum machine learning</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">text</span><span>": "</span><span style="color:#a3be8c;">Another approach to improving classical machine learning with quantum information processing uses amplitude amplification methods based on Grover's search algorithm, which has been shown to solve unstructured search problems with a quadratic speedup compared to classical algorithms. These quantum routines can be employed for learning algorithms that translate into an unstructured search task, as can be done, for instance, in the case of the k-medians and the k-nearest neighbors algorithms. Another application is a quadratic speedup in the training of perceptron.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">section</span><span>": "</span><span style="color:#a3be8c;">Section::::Machine learning with quantum computers.:Quantum machine learning algorithms based on Grover search.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">start_paragraph_id</span><span>": </span><span style="color:#d08770;">10</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_paragraph_id</span><span>": </span><span style="color:#d08770;">10</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">start_character</span><span>": </span><span style="color:#d08770;">0</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_character</span><span>": </span><span style="color:#d08770;">569</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">answer_similarity</span><span>": "</span><span style="color:#a3be8c;">0.70</span><span>"
</span><span>  },
</span><span>  {
</span><span>    "</span><span style="color:#a3be8c;">wikipedia_id</span><span>": "</span><span style="color:#a3be8c;">44108758</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">title</span><span>": "</span><span style="color:#a3be8c;">Quantum machine learning</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">text</span><span>": "</span><span style="color:#a3be8c;">Quantum-enhanced machine learning refers to quantum algorithms that solve tasks in machine learning, thereby improving and often expediting classical machine learning techniques. Such algorithms typically require one to encode the given classical data set into a quantum computer to make it accessible for quantum information processing. Subsequently, quantum information processing routines are applied and the result of the quantum computation is read out by measuring the quantum system. For example, the outcome of the measurement of a qubit reveals the result of a binary classification task. While many proposals of quantum machine learning algorithms are still purely theoretical and require a full-scale universal quantum computer to be tested, others have been implemented on small-scale or special purpose quantum devices.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">section</span><span>": "</span><span style="color:#a3be8c;">Section::::Machine learning with quantum computers.</span><span style="color:#96b5b4;">\n</span><span>",
</span><span>    "</span><span style="color:#a3be8c;">start_paragraph_id</span><span>": </span><span style="color:#d08770;">3</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_paragraph_id</span><span>": </span><span style="color:#d08770;">3</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">start_character</span><span>": </span><span style="color:#d08770;">0</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">end_character</span><span>": </span><span style="color:#d08770;">833</span><span>,
</span><span>    "</span><span style="color:#a3be8c;">answer_similarity</span><span>": "</span><span style="color:#a3be8c;">0.64</span><span>"
</span><span>  }
</span><span>]
</span></code></pre>
</details>
</blockquote>  

Read about Long-Form Question Answering in this article from February 2022 by Vladimir Blagojevic: [Long-Form QA beyond ELI5: an updated dataset and approach](https://towardsdatascience.com/long-form-qa-beyond-eli5-an-updated-dataset-and-approach-319cb841aabb) 

> If you are intrigued by Quantum Machine Learning (QML), there's a course from IBM for self-learners: [Quantum Machine Learning](https://learn.qiskit.org/course/machine-learning).

### Closed-generative model example 
From OpenAssistant comes the supervised-fine-tuning model: [Open-Assistant SFT-4 12B](https://huggingface.co/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5?text=%3C%7Cprompter%7C%3EWhat+is+a+meme%2C+and+what%27s+the+history+behind+this+word%3F%3C%7Cendoftext%7C%3E%3C%7Cassistant%7C%3EA+meme+is+a+cultural+idea%2C+behavior%2C+or+style+that+spreads+from+person+to+person+within+a+culture.+It+is+often+used+to+describe+a+unit+of+cultural+information+that+is+passed+from+one+individual+to+another.+The+word+%22meme%22+was+first+used+in+the+1960s+to+describe+a+type+of).  

>**Question**:  
>What is a meme, and what's the history behind this word?  
>  
>**Answer**  
>`A meme is a cultural idea, behavior, or style that spreads from person to person within a culture. It is often used to describe a unit of cultural information that is passed from one individual to another. The word "meme" was first used in the 1960s to describe a type of cultural unit that was similar to a gene in that it could be passed from one individual to another.`
  
## In closing
We have seen many different ML tasks - and that different models are seemed to be used for different tasks. BERT and BART are models that looks to be used in similar contexts, but whereas BERT seem better suited for taking apart a sentence, BART seem better at distilling meaning from a larger body of text into a summarized body, and for text generation. We have also seen models for making sense of images (ResNet), voice recognition (Whisper), and image generation (Stable Diffusion). 

We have given a quick overview over some of the most exciting models and how they are used. But there are a tonne more out there to discover. And to use. You can start exploring by heading over to [huggingface.co](https://huggingface.co/) and take some models for a spin, right on their site.

{{ imager(
    asset='articles/elixir/opensource-models/yellow-smiley-spaced.png', 
    alt='yellow smiley face with its arms hugging itself. The background is other-wordly.', 
    class='center',
    subtext='User generated image using SDXL Beta'
) }}