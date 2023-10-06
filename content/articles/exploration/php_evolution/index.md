+++
title = "How PHP has evolved over the years"
date = 2023-10-06
weight = 1
authors = ["Anders Björkland"]
description = "A look at how PHP has evolved over the years and what has been the driving force behind it."
draft = false

[taxonomies] 
category=["Exploration"]
tags=["PHP"]
+++

{{ articleHeader(
path='articles/exploration/php_evolution/hero.png'
title='Evolution of PHP'
) }}


*While there have been articles before foretelling about both the death and the rebirth of PHP, this time we will simply look at how PHP has evolved over the years and what has been the driving force behind it.*

## The beginning
PHP was created by Rasmus Lerdorf in 1994. It was originally a collection of C programs that he used to track visitors to his online resume. It was later rewritten in C and released as PHP/FI (Personal Home Page/Forms Interpreter) in 1995. It was a simple set of Common Gateway Interface (CGI) binaries written in C. It was later renamed to PHP: Hypertext Preprocessor in Version 3. The first version of PHP was released in 1995.[1]

So it started from a very personal need, but Rasmus kept developing and rewriting his PHP scripts. He strived to keep it similar to C, which meant that developers familiar with C and PERL could pick it up with "ease". 

In 1997, having experienced limitations of PHP, two Israeli developers approaced Rasmus with suggestions for improvement. This led to a rewrite of the parser in C, and PHP 3 was released. It came with support for multiple database interfaces and support for classes and objects. With version 3, PHP now had support for Object Oriented Programming, and its popularity grew.

In similar way, PHP kept evolving and growing. With input and development from all around the world, PHP got more and more features and improvements to its underlying architecture.

When we now look at PHP, we see a language that has evolved from a simple set of CGI binaries to a full fledged programming language. It has evolved from a language that was used to track visitors to a resume, to a language that powers a large part of the web. And we can follow the discussions that have led the language where it is today.

## The collaborative nature of PHP
PHP started out as one man's effort. It has become a language developed by the community, for the community. We can follow the discussions leading up to new features and improvements to the language. We can see how the community has shaped the language. And we can see how the community has shaped the language. It's all available for public view in the [Internals mailing list](https://news-web.php.net/php.internals).

The point of the discussions are to inform the community and language feature voters on what and how features should be implemented, if they at all should be implemented. 

So what PHP have is a pool of voters that take a stand on the features that are being discussed. It's up to the community to make a [suggestion for improvement](https://wiki.php.net/rfc/voting) and the request for comments about it. The voters then vote on the feature, and if it gets enough votes, it will be implemented.

Let's look at a popular feature which was finally introduced in PHP 7; [Return type declaration](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.return-type-declarations). This feature meant that a function now could declare which type it would return.

```php
function sum(int $a, int $b): int {
    return $a + $b;
}
```

The [return types-RFC](https://wiki.php.net/rfc/return_types) shows it being introduced in 2014, but a [pre-cursor](https://wiki.php.net/rfc/returntypehint2) to it was introduced in 2011 and withdrawn. The mailing list means that questions and concerns can be raised and discussed before the vote, and thus increasing the likelihood of a successful vote. For example, here's a concern that was raised what return types would mean for using of types in closures:
```
On Fri, Jan 16, 2015 at 4:53 PM, Simon J Welsh <simon@welsh.co.nz> wrote:

> The tests have it after the use():
> https://github.com/php/php-src/pull/997/files#diff-e306c6e99612ba59b00a4fe435b287e5R9
>
> This was discussed in depth a couple of times in the related threads.
>

Thank you for the information. It should be in the RFC. IMHO.
I feels natural to have type spec after function parameter definition
rather than
after "use".

Anyway, I looked HACK/HHVM manual
http://docs.hhvm.com/manual/en/index.php
and couldn't find the syntax.

If it's the same, then it should be OK.
I'm just making sure before voting.
```
[Re: [RFC][Vote] Return Types, 16th January 2015](https://news-web.php.net/php.internals/80663)

The final vote ended up with 47 in favor and 3 against. And the feature was introduced in PHP 7.0. 

> **Who can vote?**
> Two type of voters exists: Members of the core team, and members of the community deemed to be major contributors by the core team. 


## The evolution of PHP code

Here's a simple object-oriented example to showcase how PHP has evolved, by providing an example of a code in PHP 4, and then how it would look like in PHP 5, 7, and 8:
    
```js
// PHP 4
class User {
    var $name;
    var $age;
    var $email;

    function User($name, $age, $email) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }

    function getName() {
        return $this->name;
    }

    function getAge() {
        return $this->age;
    }

    function getEmail() {
        return $this->email;
    }
}

$user = new User('Anders', 37, 'anders.bjorkland@umain.com');
echo 'Hello ' . $user->getName();
```

```js
// PHP 5
class User {
    // introduced accessor keywords
    private $name;
    private $age;
    private $email;

    public function __construct($name, $age, $email) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }

    public function getName() {
        return $this->name;
    }

    public function getAge() {
        return $this->age;
    }

    public function getEmail() {
        return $this->email;
    }
}
```

```js
// PHP 7.4
class User {
    // introduced types for properties (7.4)
    private string $name;
    private string $age;
    private string $email;

    // introduced types for parameters (7.0)
    public function __construct(string $name, int $age, string $email) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }

    // ...and for return types (7.0)
    public function getName(): string 
    {
        return $this->name;
    }

    public function getAge(): int 
    {
        return $this->age;
    }

    public function getEmail(): string 
    {
        return $this->email;
    }
}
```

```js
// PHP 8
class User {
    // introduced property promotion (8.0)
    public function __construct(
        private string $name,
        private int $age,
        private string $email
    ) {}

    // introduced union types (8.0)
    public function getName(): string|int 
    {
        return $this->name;
    }

    public function getAge(): int 
    {
        return $this->age;
    }

    public function getEmail(): string 
    {
        return $this->email;
    }
}
```

What we can see is an improved support for types, and a more concise syntax. In addition to this, there have been improvements with the underlying code parser, which has led to [better performance](https://onlinephp.io/benchmarks/2023/39). In a benchmark test (a script is executed 100 times), we can see its execution time going from 237 seconds (PHP 4.0.6) to 17 seconds (PHP 8.0). Which in most worlds would be considered a significant improvement. But then again, this has been a development over 20+ years.

[1. https://www.php.net/manual/en/history.php.php]