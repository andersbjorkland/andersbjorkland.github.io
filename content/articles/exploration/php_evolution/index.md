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
Let's take a journey back to the early days of the web, when Rasmus Lerdorf created PHP in 1994. It all started with a simple idea - to track visitors to his online resume. Rasmus wrote a collection of C programs to do just that, and thus PHP was born.[1]

So it started from a very personal need, but Rasmus kept developing and rewriting his PHP scripts. He strived to keep it similar to C, which meant that developers familiar with C and PERL could pick it up with "ease". 

In 1997, two Israeli developers were using PHP and found that it had some limitations. They decided to approach the creator of PHP, Rasmus Lerdorf, with suggestions for improvement. This was a pivotal moment in the evolution of PHP, as it led to a complete rewrite of the parser in C and the release of PHP 3.

With PHP 3, the language gained support for multiple database interfaces and Object Oriented Programming. This was a huge leap forward for PHP, and its popularity grew rapidly. People from all around the world started contributing to the development of PHP, adding new features and improving its underlying architecture.

Today, PHP is a full-fledged programming language that powers a large part of the web. It has come a long way from its humble beginnings as a tool to track visitors to a resume. And the discussions and contributions that have shaped the language are a testament to the power of collaboration and community in software development.

## The collaborative nature of PHP
PHP is a language that has been shaped by its community. While it started out as one man's effort, it has grown into a language that is developed by the community, for the community. The discussions leading up to new features and improvements to the language are open for public view in the [Internals mailing list.](https://news-web.php.net/php.internals).

The purpose of these discussions is to inform the community and language feature voters on what features to implement, and how to do that. This is where the community comes together to make [suggestions for improvement](https://wiki.php.net/rfc/voting) and request feedback on their ideas.

The voters in the PHP community are responsible for taking a stand on the features that are being discussed. They vote on the features, and if a feature gets enough votes, it will be implemented. This democratic process ensures that the community has a say in the direction of the language, and that the language continues to evolve to meet the needs of its users.

So if you're a PHP developer, you have the power to shape the future of the language. You can make suggestions for improvement, provide feedback on other people's ideas, and (if you get recognized as a main contributor) vote on the features that you think are important. By participating in the PHP community, you can help to ensure that PHP continues to be a language that is developed by the community, for the community.


Let's look at a popular feature which was finally introduced in PHP 7; [Return type declaration](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.return-type-declarations). This feature meant that a function now could declare which type it would return.

```js
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
// PHP 5.3
namespace App\Entity; // namespaces are introduced

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
    // introduced property promotion and named arguments
    public function __construct(
        private string $name,
        private int $age,
        private ?string $email = null
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

    public function getEmail(): ?string 
    {
        return $this->email;
    }
}

$user = new User(
    name: 'Anders', 
    age: 37
);

echo 'Hello ' . $user->getName();
```

What we can see is an improved support for types, and a more concise syntax. In addition to this, there have been improvements with the underlying code parser, which has led to [better performance](https://onlinephp.io/benchmarks/2023/39). In a benchmark test (a script is executed 100 times), we can see its execution time going from 237 seconds (PHP 4.0.6) to 17 seconds (PHP 8.0). Which in most worlds would be considered a significant improvement. But then again, this has been a development over 20+ years.

### Bonus-features
#### Attributes
PHP 8.0 also introduced [attributes](https://www.php.net/manual/en/language.attributes.php), which is a way to add metadata to classes, methods, and functions. Its predecessor were annotations via PHPDocs, but this is now the native way to do that.

```js
class User {
    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\Column(type: "integer")]
    private int $age;

    #[ORM\Column(type: "string", length: 255)]
    private string $email;

    public function __construct(
        private string $name,
        private int $age,
        private string $email
    ) {}
}
```

#### Arrow-functions
PHP 7.4 introduced [arrow-functions](https://www.php.net/manual/en/functions.arrow.php), which is a more concise way to write anonymous functions. 

```js
// PHP 7.4
$numbers = [1, 2, 3, 4, 5];

$multiplier = 2;

$multiplied = array_map(fn($x) use ($multiplier) => $x * $multiplier, $numbers);

var_export($multiplied);

/* Output:
array (
  0 => 2,
  1 => 4,
  2 => 6,
  3 => 8,
  4 => 10,
)
 */
```

#### Null coalescing assignment operator
PHP 7.4 has also introduced the [null coalescing assignment operator](https://www.php.net/manual/en/migration74.new-features.php#migration74.new-features.core.null-coalescing-assignment-operator), which is a more concise way to assign a value to a variable if it's not already set.

```js
$foo = $bar ?? 'default';
```

#### Nullsafe operator
PHP 8.0 introduced the [nullsafe operator](https://www.php.net/manual/en/migration80.new-features.php#migration80.new-features.core.nullsafe-operator), which is a more concise way to check if a property or method exists on a variable.

```js
$foo = $bar?->baz();
```

#### Match expression
PHP 8.0 also introduced the [match expression](https://www.php.net/manual/en/control-structures.match.php), which (kind-of) is a more concise way to write switch statements.

```js
$bar = 5;

$foo = match ($bar) {
    1 => 'one',
    2 => 'two',
    3 => 'three',
    4, 5, 6 => 'four to six',
    default => 'unknown'
};

echo $foo; // 'four to six'


// alternate match:
$foo = match (true) {
    $bar < 4 => 'less than four',
    $bar >= 4 => '4 or greater',
    default => 'unknown'
};

echo $foo; // '4 or greater'

```

#### Union types
PHP 8.0 introduced [union types](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.union), which is a way to declare that a variable can be of multiple types.

```js
class User {
    public function __construct(
        private string|int $name,
        private int $age,
        private ?string $email = null
    ) {}

    public function getName(): string|int 
    {
        return $this->name;
    }

    public function getAge(): int 
    {
        return $this->age;
    }

    public function getEmail(): ?string 
    {
        return $this->email;
    }
}

$user = new User(24, 37);

echo $user->getName(); // 24
```

#### ENUMERATIONS!!!
PHP 8.1 finally introduced [enumerations](https://www.php.net/manual/en/language.enums.php), which is a way to declare a set of named constants.

```js
enum Fruit {
    case Apple;
    case Banana;
    case Orange;
}

function eatFruit(Fruit $fruit) {
    switch ($fruit) {
        case Fruit::Apple:
            echo 'Yummy';
            break;
        case Fruit::Banana:
            echo 'B & NaN';
            break;
        case Fruit::Orange:
            echo 'Red-yello treat';
            break;
    }
}
```

#### Fibers
PHP 8.1 also introduced [fibers](https://www.php.net/manual/en/language.fibers.php), which is a way to create interruptible functions, enhancing PHP's ability to handle asynchronous tasks. This has come to be used to great effect in asynchronous frameworks such as [ReactPHP](https://reactphp.org/).


## Conclusion
In conclusion, PHP has come a long way since its early days as a simple tool for tracking visitors to a resume. Over the years, the language has evolved to become a powerful and feature-rich language that is used by millions of developers around the world.

One of the key factors in PHP's success has been its ability to evolve with the needs of its users. From the addition of object-oriented programming in PHP 4 to attributes and fibers in PHP 8, PHP has continued to add new features and improve its syntax to make it more powerful and flexible.

As PHP continues to evolve, it will be interesting to see what new features and improvements are added to the language. But one thing is certain - PHP will continue to be a language that is developed by the community, for the community. And that is what makes it such a powerful and enduring language.

[1. PHP: History of PHP](https://www.php.net/manual/en/history.php.php)

Additional tools: [onlinephp.io](https://onlinephp.io/)