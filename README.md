# RTW-stonks

_A project by Jordy Fronik, Lars Ruijs, Max Mulder, Guus Maij, Ben Langenberg, Vincent van Leeuwen en Rick Groot_

## Real Time Web course group exercise

We've made a working chat app that allows you to enter an username and chat with other people, in theme with our team name: 'Stonks'.
Our app is called StonksBot. Here you can talk with fellow StonkHolders. You'll be greeted by Elon Musk when entering the chat.
We've also created the option to see when someone is typing, how late the message was send and who sent it.

## Live link

[Visit our chat app](https://rtwstonkbot.herokuapp.com/)

## Wireflow

![](https://i.imgur.com/rrxbImI.jpg)

## Features

- Users can send messages between each other in a chatroom
- Support added for nicknames
- "{user} is typing" functionality
- Timestamps when a message is send
- Bot that sends a message when a user `connects` or `disconnects` to the chatroom

## Division of labor

We all worked on the code together using [Live Share](https://code.visualstudio.com/blogs/2017/11/15/live-share). Doing this together, we also came up with features together and fixed all the occurring bugs.
All of the awesome styling was also based on our team page and our own creative minds.

## Getting started

1. Clone the repository

```
git clone https://github.com/tsjuusmei/RTW-stonks.git
```

2. Change directory

```
cd RTW-stonks
```

3. Installing packages

```
yarn # or npm install
```

4. Running the project

```
yarn dev # or npm run dev
```

## Dependencies

- Express
- Moment
- Socket.io
- ESlint
- Prettier
