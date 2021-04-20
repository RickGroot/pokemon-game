# Real-Time Web @cmda-minor-web · 2020/21

## Who's that pokemon?
This game let's you guess the pokemon based on a darkened image. If you get the Pokémon right, you score a point. First to get 5 pokémon right wins!

## Link to game
[Enter a game here!](https://rick-groot-pokemon-game.herokuapp.com/)

## Table of contents
- [Features](#features)
- [API](#api)
- [Installation](#run-locally)
- [Spike](#spike)
- [Sketches](#sketches)
- [To-Do](#to-do)

## Features
- Play a game with friends
- Guess the Pokémon in a live chat
- Create new rooms
- See user and user-scores in rooms

## API
This application uses the [PokéAPI](https://pokeapi.co/). The server fetches Pokémon from this API, and sends it to the in-game clients. Whenever the Pokémon is guessed, the server fetches a new image and starts a new round. The APi sends images of the Pokémon, and the name. This data gets sent to the game-clients, which can now see the data in their game. The API data gets rendered on the page, and the round can start.

### Data model
This model illustrates a broad overview of the possibilities of the PokéAPI. It shows the different endpoints of this API.
![Data-model](https://github.com/rickgroot/pokemon-game/blob/main/assets/data-model.png?raw=true)

### Data example
```js
const fetchURL = "https://pokeapi.co/api/v2/pokemon-form/374/";
```
```json
{
    "form_name": "",
    "form_names": [],
    "form_order": 1,
    "id": 374,
    "is_battle_only": false,
    "is_default": true,
    "is_mega": false,
    "name": "beldum",
    "names": [],
    "order": 506,
    "pokemon": {
        "name": "beldum",
        "url": "https://pokeapi.co/api/v2/pokemon/374/"
    },
    "sprites": {
        "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/374.png",
        "back_female": null,
        "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/374.png",
        "back_shiny_female": null,
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/374.png",
        "front_female": null,
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/374.png",
        "front_shiny_female": null
    },
    "types": [{
        "slot": 1,
        "type": {
            "name": "steel",
            "url": "https://pokeapi.co/api/v2/type/9/"
        }
    }, {
        "slot": 2,
        "type": {
            "name": "psychic",
            "url": "https://pokeapi.co/api/v2/type/14/"
        }
    }],
    "version_group": {
        "name": "ruby-sapphire",
        "url": "https://pokeapi.co/api/v2/version-group/5/"
    }
}
```

## Data-flow diagram
To get a better view of the stucture of this application, I made a diagram. This diagram illustrates the connections between client, sockets and API.
![Data-flow](https://github.com/rickgroot/pokemon-game/blob/main/assets/data-flow.png?raw=true)
(Data-model is still work in progress...)

### Real time events
- Joining users
- Chat with guesses
- Live user score

Whenever a user joins it stores data into a variable on the server. This data is passed to the connected sockets and gets sent when a client connects. The chat is simple and uses sockets to sow data to every connected socket in a room. When a user guesses correctly the score is updated and sent to the clients in that room.

## Run Locally
**In your terminal**, clone this project to your own computer:
```bash
$ git clone https://github.com/RickGroot/pokemon-game.git
```

Navigate to the right folder:
```bash
$ cd pokemon-game
```

Run code in dev environment:
```bash
$ npm run dev
```

Watch and build changes to CSS and client JS:
```bash
$ npm run watch
```

Start script:
```bash
$ npm start
```

## Spike
The spike for this project is using rooms. I made this functionality in the main application, on a different URL path. This saved me some time because I didn't need to make another project and implementation became more easy. For this spike I used the URL to define a room name, and then sent messages and active usernames to the clients in that room. 

## Sketches
| Sketch 1, game with multiple pokemon | Sketch 2, only front-view | Sketch 3, multiple choice  |
| :---: | :---: | :---: |
| ![sketch 1][sk1] | ![sketch 2][sk2] | ![sketch 3][sk3] |

[sk1]: https://github.com/rickgroot/pokemon-game/blob/main/assets/sketch1.jpeg?raw=true "Sketch 1"
[sk2]: https://github.com/rickgroot/pokemon-game/blob/main/assets/sketch2.jpeg?raw=true "Sketch 2"
[sk3]: https://github.com/rickgroot/pokemon-game/blob/main/assets/sketch3.jpeg?raw=true "Sketch 3"

## To-Do
- [x] Make rooms
- [x] Show active members in rooms
- [x] Implement API data
- [x] Make the "game" part of the game
- [x] Delete rooms when it has no users
- [ ] Stop game after x amount of wins
- [ ] Show a win screen

# Licence
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Synopsis](#synopsis)
- [Description](#description)
- [Communication](#communication)
- [Goals](#goals)
- [Grading](#grading)
- [Programme](#programme)

## Synopsis
- Course: Real-Time Web
- Minor: [Web Design and Development](https://dlo.mijnhva.nl/d2l/le/content/275640/Home) (*login required)
- Course Coordinator: Justus Sturkenboom ([@ju5tu5](https://github.com/ju5tu5))
- Minor Coordinator(s): Koop Reynders ([@KoopReynders](https://github.com/KoopReynders))
- Lecturers: Justus Sturkenboom ([@ju5tu5](https://github.com/ju5tu5)) & Lukas van Driel ([@lukasvan3l](https://github.com/lukasvan3l))
- Student Assistants: Robin ([@]()) & Wouter ([@]())
- Credit: 3 ECTS credits
- Academic year: 2020-2021
- Programme: Communication and Multimedia Design (full time bachelor)
- Language: Dutch instructions and English resources

## Description
During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

## Communication
- [Github](https://github.com/cmda-minor-web/pokemon-game)
- [Microsoft Teams](https://teams.microsoft.com/l/channel/19%3aeb75a05580374dfbb61a479e14cbcbe6%40thread.tacv2/06%2520-%2520Real-Time%2520Web?groupId=5d001f9a-0a4b-4768-92b1-0f1768328ba3&tenantId=0907bb1e-21fc-476f-8843-02d09ceb59a7)
- [Brightspace](https://dlo.mijnhva.nl/d2l/le/content/275640/Home)

If you have questions:
- [Look at the additional resources]()
- [Use a search engine like startpage](https://www.startpage.com/)
- [Ask questions on MS Teams](https://teams.microsoft.com/l/channel/19%3aeb75a05580374dfbb61a479e14cbcbe6%40thread.tacv2/06%2520-%2520Real-Time%2520Web?groupId=5d001f9a-0a4b-4768-92b1-0f1768328ba3&tenantId=0907bb1e-21fc-476f-8843-02d09ceb59a7) (please help each other!)
- [Contact a student-assisstant](#synopsis)
- [Contact a lecturer](#synopsis)

## Goals

After finishing this program you can:
- _deal with real-time complexity;_
- _handle real-time client-server interaction;_
- _handle real-time data management;_
- _handle multi-user support._

## Grading
Your efforts will be graded using a single point rubric (see below). You will have to pass the criterion (centre column) to pass the course. During the test you will be consulted and will be given feedback on things we think deficient and things we think are an improvement on the criterion.

| Deficiency | Criterion | Improvement |
|:--|:--|:--|
|  | *Project* Your app is working and published on Heroku. Your project is thoroughly documented in the `README.md` file in your repository. Included are a description of the data-lifecycle, real-time events and external data source used by your app. |  |
|  | *Complexity* You’ve implemented enough real-time functionality for us to test your comprehension of the subject. A lot of functionality is self-written. You are able to manipulate online examples live. |  |
|  | *Client-server interaction* By interacting with the app, a user can influence the data model of the server in real time by directly modifying data OR by influencing API requests between server and source. The student has set up the data manipulations. |  |
|  | *Data management* The server maintains a data model and each client is continuously updated with the correct data. |  |
|  | *Multi-user support* Multiple clients can connect to the server. Interaction works as expected and is not dependent on the number of clients. You can explain how your app approaches this. |  |

## Programme

### Daily schedule
To keep things simple we use a daily schedule that will be used during normal course days. We make exceptions for checkups and assessments, on these days a different schedule will be given.

| Time | Who | Activity |
|:--|:--|:--|
| *~09:00* | *(Lukas, Justus, Robin, Wouter)* | *Standup* |
| 09:30 | Tribe *+(Lukas, Justus, Robin, Wouter)* | Talk with crucial information (make sure you attend!) |
| 11:00 | Teams in MS Teams: *(ex. R2D2 Team A)* | Work on the (day)assignment |
|  | Squad R2D2 Team B *+(Justus, Wouter)* | Standup |
|  | Squad SQUID Team B *+(Lukas, Robin)* | Standup |
| 11:30 | Squad R2D2 Team C *+(Justus, Wouter)* | Standup |
|  | Squad SQUID Team C *+(Lukas, Robin)* | Standup |
| 12:00 | Squad R2D2 Team A *+(Justus, Wouter)* | Standup |
|  | Squad SQUID Team A *+(Lukas, Robin)* | Standup |
| 13:00 | Tribe *+(Robin, Wouter)* | Continue work on the (day)assignment |
| 16:00 | Squad R2D2 Team B *+(Wouter)* | Standup |
|  | Squad SQUID Team B *+(Robin)* | Standup |
| 16:15 | Squad R2D2 Team C *+(Wouter)* | Standup |
|  | Squad SQUID Team C *+(Robin)* | Standup |
| 16:30 | Squad R2D2 Team A *+(Wouter)* | Standup |
|  | Squad SQUID Team A *+(Robin)* | Standup |

### Week 1 - Getting a grip
Goal: Build and deploy a simple but unique real-time app

#### Tuesday 6 April
**Talk subjects:** Hit the ground running... [(slides)](https://docs.google.com/presentation/d/1Z-zOIDvFB0P2qGHV0F74n9T4kprgybJ_8GYU-1MaKfM/edit?usp=sharing) Course objective and explanation of the assignment, examples from last year, explanation of real-time, (live coded) bare bone chat app and deployment on Heroku.\
**Day assignment:** [(assignment)](./course/week-1.md#assignment-1-make-it-so) Make it so *(as a team)*: Implement (code/style/discuss/deploy) basic chat (or other realtime) functionality on your teampage!

#### Friday 9 April
**Talk subjects:** My first realtime web app! [(slides)](https://docs.google.com/presentation/d/18eftO3epzIXDjdwl3cn5Wq99fkQYCUnExUqq9P72A3k/edit?usp=sharing) Short recap, (local) data management, using (wire) flows for realtime web apps, (live coded) multi-user woordzoeker.\
**Day assignment:** [(assignment)](./course/week-1.md#assignment-2-make-it-so) Make it so *(individually)*. i) Create (code/style/discuss/deploy) a chat app (or other realtime functionality) based on the examples and ii) add your own unique feature!

### Week 2 - Sockets and data
Goal: Store, manipulate and share data between server-client   

#### Monday 12 April
**Talk subjects:** Data driven development?! [(slides)](https://docs.google.com/presentation/d/1WC1DxkQm2eUCTQp7dEfv0cTVMK7zlg3der0P0qP7S5I/edit?usp=sharing) *Gastcollege Thijs Spijker* Feedback about last week, final assignment and conditions (rubric), explanation of data management, (live coded) Long polling vs Websockets. \
**Day assignment:** [(assignment)](./course/week-2.md#assignment-1-proof-of-concept) (Proof of) Concept *(individually)*. i) Create a (3 > 1) concept based on existing data from an API and ii) map this data using modelling techniques.

#### Tuesday 13 April
**Talk subjects:** Above all else, show the data. [(slides)](https://docs.google.com/presentation/d/1tW4klrDjt1AfWte311uKkfQYwaHwokzQ-ue3a4VphqA/edit?usp=sharing) Securing real-time web apps, offline support, the publication/subscription model and (case study) Quek!\
**Day assignment:** [(assignment)](./course/week-2.md#assignment-2-proof-of-concept) Proof of concept *(individually)*: i) Create (code/style/discuss/deploy) part of the core functionality for your concept and ii) show the  corresponding data lifecycle diagram.

#### Friday 16 April - Checkup!
Instead of our talk we will have a [peer review session](./course/peer-review.md). You will read, comment and fire issues on each others code. Doing this is really good for your programming insight and helps others refining/refactoring their code.

| Time | Who | Activity |
|:--|:--|:--|
| 09:30 | Tribe *+(Lukas, Justus, Robin, Wouter)* | Peer review |
| 10:30 | Squad R2D2 Team B.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team B.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team B.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team B.2 *+(Robin)* | Checkup |
| 11:00 | Squad R2D2 Team C.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team C.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team C.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team C.2 *+(Robin)* | Checkup |
| 11:30 | Squad R2D2 Team A.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team A.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team A.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team A.2 *+(Robin)* | Checkup |

### Week 3 - Dealing with multiple users
Goal: Handle data sharing and multi-user support 

#### Monday 19 April
**Talk subjects:** Roll your own... [(slides) ](https://docs.google.com/presentation/d/1Cx9qCo8QQXH5Btbtwg0L61so-wn2OxFQZdphIhbumQk/edit?usp=sharing) Data management, the functional programming trinity (map, filter and reduce). OAuth?!
**Day assignment:** [(assignment)](./course/week-3.md#assignment-1-data-management)

#### Tuesday 20 April
**Talk subjects:** Not ignoring the UI-Stack! [(slides)](https://docs.google.com/presentation/d/1ACuUJ-B19hgFN2CCTYH8ClN0WD69ok8ZVnkRGbU0FjA/edit?usp=sharing). Usability, feedback, feedforward etc. in real-time web apps, (case study) postNL loader and FAQ.
**Day assignment:** [(assignment)](./course/week-3.md#assignment-2-user-testing)

#### Friday 23 April
We will have our final [peer review session](./course/peer-review.md). You will read, comment and fire issues on each others code. Doing this helps others dotting the i’s on their project.

| Time | Who | Activity |
|:--|:--|:--|
| 09:30 | Tribe *+(Lukas, Justus, Robin, Wouter)* | Peer review |
| 10:30 | Squad R2D2 Team B.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team B.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team B.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team B.2 *+(Robin)* | Checkup |
| 11:00 | Squad R2D2 Team C.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team C.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team C.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team C.2 *+(Robin)* | Checkup |
| 11:30 | Squad R2D2 Team A.1 *+(Justus)* | Checkup |
|  | Squad R2D2 Team A.2 *+(Wouter)* | Checkup |
|  | Squad SQUID Team A.1 *+(Lukas)* | Checkup |
|  | Squad SQUID Team A.2 *+(Robin)* | Checkup |

### Week 4
Goal: Assess and wrap-up the course!

#### Wednesday 28 April
**09.30** [*Lukas, Justus*] Assessments (scheduled) SQUID A.1/B.1/C.1 and R2D2 A.1/B.1/C.1

#### Thursday 29 April
**09.30** [*Lukas, Justus*] Assessments (scheduled) SQUID A.2/B.2/C.2 and R2D2 A.2/B.2/C.2

#### Friday 30 April 
**15.00** [*Everyone*] Wrap-up for the course. (drinks?!)



<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->
