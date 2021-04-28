# Real-Time Web @cmda-minor-web · 2020/21

## Who's that pokemon?
This game let's you guess the pokemon based on a darkened image. If you get the Pokémon right, you score a point. First to get 5 pokémon right wins!

## Link to game
[Enter a game here!](https://rick-groot-pokemon-game.herokuapp.com/)

## Table of contents
- [Features](#features)
- [API](#api)
- [Spike](#spikes)
- [Installation](#run-locally)
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

### Real time events
- Joining (and disconnecting) users
- Chat with guesses
- Live user score
- End of a game
- Correct user guesses
- New Pokémon data

Whenever a user joins the application stores data into a variable on the server. This data is passed to the connected sockets and gets sent when a client connects. The chat is simple and uses sockets to sow data to every connected socket in a room. When a user guesses correctly the score is updated and sent to the clients in that room. When a Pokémon is guessed the server will fetch and send new data to the clients. If a user has 5 points the room will be closed.

## Spikes
Disclamer: The spikes created in this project were made and deployed on the main branch, these spikes were tested on a different URL path. This saved me time because I didn't need to create a whole new project for a specific subject, and implementation was made easier using this approach.

### Different rooms
My first spike contains using different game rooms. For this spike I used the URL to define a room name, as well as a username of the connected client. Then I sent messages and active usernames to the clients in that room, using socket events and usernames stored in a variable on the server.

### API data
To make the game I created a spike which requests the API data. The data is fetched on the server, and stored in a variable which also contains the room name. When a client joins the room the data gets sent to the client, is saved in a variable on the client side, and gets projected it into the browser. With the use of a test button I could simulate a "win event" and fetch new data on the server using another socket event. Old data gets deleted from the variable, new data gets stored and then gets send back to all clients in that specific room.

### Guesses
In the different rooms I already had a chat system and API data, but for this spike I needed to check the messages for a correct guess. I did this using client side JavaScript. The Pokémon name was already declared and all I needed to do was implement some new socket events for winning a game (*flow is shown down below*). When someone has got 5 points, the server will send out a different event which shows a win message and deletes the room some time after.

> Correct guess (if statement on a message) -> Socket event to server with current score -> Add a point to score -> Re-send all scores and users to the room

## Run Locally
**In your terminal**, navigate to a ma of choice, and clone this project to your own computer:
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
- [x] Stop game after x amount of wins
- [x] Show a win screen
- [ ] Make everything responsive

# Licence
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)