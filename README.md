# TradExc App

Ironhack project at end of module 2 of Barcelona Full Stack Web Development Part Time March 2020

# Developers:

[Chus Santana](https://www.linkedin.com/in/chusantana/)
[Marc De Mena](https://www.linkedin.com/in/mdemena/)

# Link to App:

## Description

An app for improve your money gaming with a Global Digital Coin Exchange.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **about** - As a user I want to be know who are rear this project and know how to contact if I have a problem
- **signup** - As a user I want to sign up on the application so that I can trade with my money
- **login** - As a user I want to be able to log in on the application so that I can get back to my account
- **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account
- **dashboard** - As a logged user I want to trade whit global exchange markets like NASDAQ, IBEX35 or CryptoMoney
- **wallet** - As a user I want to work and know all the information of my money and my investments.
- **trade** - As a user I want trade with investments, buy or selling in the market.
- **transactions** - As a user I want to see all the transaction I made.
- **markets** - As a user I want to be able to attend to event so that the organizers can count me in.
- **profile** - As a user I want to see which escape-rooms are available so I can explore them.
- **support** - As a user I want to see which escape-rooms are available so I can explore them.

## Backlog

List of other features outside of the MVPs scope

REAL Transactions

## ROUTES:

| Method | URL         | Description                                              |
| ------ | ----------- | -------------------------------------------------------- |
| GET    | /           | Home page                                                |
| GET    | /about      | About page                                               |
| GET    | /auth/login | Redirects to /app/ if user logged in. Renders auth/login |
| POST   | /auth/login | Redirects to /app/ if user logged in.                    |

```
body:
    - username
    - password
```

GET | /auth/signup| redirects to / if user logged in. Renders auth/signup

```
body:
    - username
    - password
```

GET | / | renders the homepage. if the user is not logged in, render access.
GET | /event/id | renders event-detail
POST | /event/id | update event. redirect /event-detail

```
body:
    - username
    - event id
    - image
```

GET | /escape-room-list | renders escape-room-list
POST | /logout | redirects to /
GET | /escape-room-detail | renders escape-room-detail
POST | /escape-room/id |

```
body:
    - username
    - escape-room
    - date
    - reserved time
    - escape-room id
```

## Models

```
User model
- username: String
- password: String
- email: String
- avatar: String
```

```
Wallet model
- user: Object ID
- amount: Number
- movements: [{ date: Date, type: String, amount: Number}]
```

```
Stocks model
- user: Object ID
- symbol: String
- name: String
- units: Number
```

```
Transactions model
- date: Date
- user: Object ID
- stock: Object ID
- type: String
- units: Number
- price: Number
```

```
Log model
- date: Date
- user: Object ID
- description: String
```

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/mdemena/project-tradexc)
[Wireframe Link](https://excalidraw.com/#room=6c51c435333ae206c22e,ndG86DZm6bAAMowyCLuXDw)
[Trello Linl](https://trello.com/b/rCNCcPCD/tradexc)
[Deploy Link](https://tradexc.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

```

```
