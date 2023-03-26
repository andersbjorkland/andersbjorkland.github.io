+++
title = "Discovering API Platform"
date = 2023-03-22
weight = 1
+++

{{ articleHeader(
path='articles/exploration/api_platform/hero.png'
title='Discovering API Platform'
) }}

The story of API Platform is a story of standards. Some would say it is best-in-class API framework! 
It is a stand-alone library in the PHP flora, and is a popular pairing with Symfony projects. 
In this article we will discover what API Platform is, from initial setup to basic usage.
Let's tickle some endpoints!

{% quoter(author='Dave Winer, pioneer of web services (including SOAP)') %}REST is for data what SOAP is for dirt.{% end %} 

A RESTful API is the starting point for any API Framework project. 
While GraphQL may be related to REST the way that REST was to SOAP, RESTful API:s are still popular. And in fact,
API Platform supports both. So let's get acquainted with this PHP library!

## The setup
We will leverage Symfony for building APIs. As API Platform is paired with Symfony the same way that wine and cheese is, 
this will be our starting point:

`composer create-project symfony/skeleton:"6.2.*" apiplatform`

Symfony loves to make a developer's life easy, something called `symfony/flex` has been installed for us, so we can move 
in to the project directory (`cd apiplatform`) and install API Platform: `composer require api`. Not only will this 
install API Platform, it also adds some additional configurations such as exposing an api-route, such as `/api`.

Visiting the `api` route right now will display an OpenAPI (*swagger*) UI 👇

{{ imager_standard(asset='articles/exploration/api_platform/api-platform-0.jpeg', alt='Swagger UI, but no resources available') }}

{% quoter() %}We don't do this because it is easy, we do it because we thought it would be easy. {% end %}

## Adding resources
Being a lazy developer, it is nice being spoiled by Symfony. We just saw that we have set up API Platform just by the virtue 
of having `symfony/flex` handling setting up the configurations for us. We also saw that we do not have any resources or 
operations available in our API. So would it not be so very endearing to have another tool helping us out here? 

**Indeed**, it would! It is called *maker-bundle* and it allows us to specify an entity, its fields, and if it should be available 
in our API. We install it with `symfony require maker` (again, `symfony/flex` allows us to be so incredible lazy as not even 
typing out the whole package name).

Once it is installed, we will make use of it with `bin/console make:entity` to create our first entity: a *cassette tape*.
It will be called `Cassette`, it will be exposed in the API, and it will have a single field to start with:

```bash
apiplatform ➤ bin/console make:entity

Class name of the entity to create or update (e.g. AgreeableElephant):
> Cassette

Mark this class as an API Platform resource (expose a CRUD API for it) (yes/no) [no]:
> yes

created: src/Entity/Cassette.php
created: src/Repository/CassetteRepository.php

Entity generated! Now lets add some fields!
You can always add more fields later manually or by re-running this command.

New property name (press <return> to stop adding fields):
> title

Field type (enter ? to see all types) [string]:
>

Field length [255]:
>

Can this field be null in the database (nullable) (yes/no) [no]:
>

updated: src/Entity/Cassette.php

Add another property? Enter the property name (or press <return> to stop adding fields):
>

Success!

Next: When you are ready, create a migration with php bin/console make:migration
```

We are about to start using a database. Our basic project comes with a Docker Compose setup configured to run a 
PostgreSQL database, so let's get the container started: `docker-compose up -d` 

>Alternatively we can switch the database to a MariaDB from the comfort of the CLI:  
>`bin/console make:docker:database`  
  
Our next task is to make a migration file. This will contain our Entity schema and will be available at `./migrations/`. We create it with:  
`symfony php bin/console make:migration`  
  
> `symfony` is a CLI-tool that in this context will infer docker environments for us, such as database connection details. Without it, you would get a "*connection refused*" error until you update your .env-file with the correct connection details.
  
Having a new migration-file, we will execute it by running `symfony php bin/console doctrine:migrations:migrate`. If we revisit our `/api` route, we will see that we have all the possible operations available to us that we might like. Maybe too many? 🤔



{{ imager_standard(asset='articles/exploration/api_platform/api-platform-cassette-1.jpeg', alt='Swagger UI with a cassette resource, and POST, GET, PUT, DELETE, PATCH operations available') }}  
*You might have noticed a spider in your API. Don't worry, it's just Webby.*

Either through an API client like Postman or from the comfort of the browser, API Platform is already allowing us to interact with our defined entity. And we haven't written a line of code yet. Let's give it a try! 

{{ videoer(source='articles/exploration/api-platform/api-platform-create-cassette-1.webm', type='video/webm')}}

Now let's imagine, this is just too much freedom for us. We rather not have all these options, or these *vocabularies* at our fingertips. Let's say that we never ever want to replace a Cassette; **PUT** will not be in our API repertoire!  
  
This is our current `Cassette` entity (previously generated by the `make:entity` command):  
```php
<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CassetteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CassetteRepository::class)]
#[ApiResource]
class Cassette
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
}

```

We see some metadata about this entity in the form of [PHP attributes](https://www.php.net/manual/en/language.attributes.overview.php). We have ORM-mapping in the form of marking the class as an Entity along with which repository it should use. We also see that it is marked as an `ApiResource`. API Platform will infer all relevant fields to expose and the methods to interact with them. It really wants to help us. But how can we define that API Platform should not have a **PUT** request available for it?  
  
By expanding the `ApiResource` attribute with an `operations` argument we can specify which requests we want to enable for the entity.  
```php
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Delete(),
        new Patch()
    ]
)]
```
These operations are brought from the `ApiPlatform\Metadata` namespace and correspond with each type of request we want to enable. We bring in all the operations here but for the **PUT** operation.

> Most of these operations are straight forward, but they hint at something fundamental. There is something called Collection operations, so there are also something called Item operations. `Post` och `GetCollection` are collection operations. This means that they do not require any item identificator, which Item operations do. 

{% quoter() %}No body puts **PUT** in a corner! {% end %}
{{ imager_standard(asset='articles/exploration/api_platform/baby-in-a-corner.png', alt='Swagger UI, but no resources available', class='center') }}


So a mixtape is not much without any songs. We will create an entity for this and create two collections on Cassette to relate to the songs. It will have a sideA collection of songs, and a sideB collection of songs. We will againg enjoy the ease that is the `bin/console make:entity` command by adding the following fields:
- `bin/console make:entity Song`:
    - *title* [`string`]
    - *artist* [`string`]
    - *duration* [`integer`] (duration in seconds)

- update database for the new entity:
    - `symfony php bin/console make:entity`
    - `symfony php bin/console doctrine:migrations:migrate`

- `bin/console make:entity Cassette` (allows us to update its fields): 
    - *sideA* [`ManyToMany -> Song`, no corresponding field on `Song`]
    - *sideB* [`ManyToMany -> Song`, no corresponding field on `Song`]

- Modify the `ManyToMany` mapping on Cassette with `JoinTable` (*brought in from the `Doctrine\ORM\Mapping` namespace*):
```php
    #[ORM\ManyToMany(targetEntity: Song::class)]
    #[JoinTable(name: 'side_a_songs')]
    private Collection $sideA;

    #[ORM\ManyToMany(targetEntity: Song::class)]
    #[JoinTable(name: 'side_b_songs')]
    private Collection $sideB;
``` 

- Update the new relations.
    - `symfony php bin/console make:entity`
    - `symfony php bin/console doctrine:migrations:migrate`

It may be that the new entity has not been marked as an ApiResource, to remedy that we will simply prepend the `Song` class with the `ApiResource` attribute. This will again expose all the operations we might want. So taking this opportunity to populate our database with some songs we can make a `POST` request to `https://localhost:8000/api/songs` (or whatever port you have your local server running at). May I suggest adding the following payload with the request:
```json
{
  "title": "Never Gonna Give You Up",
  "artist": "Rick Astley",
  "duration": 214
}
```

After adding a few songs, we can fetch them at `https://localhost:8000/api/songs` with a `GET` request. It would return the following response:
```json
{
  "@context": "/api/contexts/Song",
  "@id": "/api/songs",
  "@type": "hydra:Collection",
  "hydra:totalItems": 4,
  "hydra:member": [
    {
      "@id": "/api/songs/1",
      "@type": "Song",
      "id": 1,
      "title": "Never Gonna Give You Up",
      "artist": "Rick Astley",
      "duration": 214
    },
    {
      "@id": "/api/songs/2",
      "@type": "Song",
      "id": 2,
      "title": "If I Could Turn Back Time",
      "artist": "Cher",
      "duration": 239
    },
    {
      "@id": "/api/songs/3",
      "@type": "Song",
      "id": 3,
      "title": "Walking On Sunshine",
      "artist": "Katrina & The Waves",
      "duration": 239
    },
    {
      "@id": "/api/songs/4",
      "@type": "Song",
      "id": 4,
      "title": "Like a Virgin",
      "artist": "Madonna",
      "duration": 219
    }
  ]
}
```

Perhaps we could improve the response for the songs so we could get duration in a minute:seconds format? We could do that by adding a dynamic field! As long as we use a language that API Platform understands, we won't have to add any special configurations!    
  
Add the following method to `App\Entity\Song`:
```php
    public function getFormattedDuration(): ?string
    {
        $duration = $this->duration ?? 0;
        $minutes = $duration > 60 ? (int)($duration / 60) : 0;
        $seconds = $duration > 60 ? $duration % 60 : $duration;

        return sprintf('%d:%02d', $minutes, $seconds);
    }
```

And just like that we get back the following for the first *song*:
```json
    {
      "@id": "/api/songs/14",
      "@type": "Song",
      "id": 14,
      "title": "Never Gonna Give You Up",
      "artist": "Rick Astley",
      "duration": 214,
      "formattedDuration": "3:34"
    }
```

So far, this has been a pleasant journey. But can we add and get a list of songs from the Cassette resource? 