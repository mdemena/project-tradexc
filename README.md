# TradExc App

Ironhack project at end of module 2 of Barcelona Full Stack Web Development Part Time March 2020

# Developers:

- [Chus Santana](https://github.com/chusantana/)
- [Marc De Mena](https://github.com/mdemena/)

# Link to App:

## Description

An app for improve your money gaming with a Global Digital Coin Exchange.

## Epics / User Stories

- Website

  - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
  - **about** - As a user I want to be know who are rear this project and know how to contact if I have a problem
  - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
  - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- Authentication

  - **signup** - As a user I want to sign up on the application so that I can trade with my money
  - **login** - As a user I want to be able to log in on the application so that I can get back to my account
  - **logout** - As a user I want to be able to log out from the application so that I can make sure no one will access my account

- Applicaction

  - **dashboard** - As a logged user I want to trade whit global exchange markets like NASDAQ, IBEX35 or CryptoMoney
  - **wallet** - As a user I want to work and know all the information of my money and my investments.
  - **trade** - As a user I want trade with investments, buy or selling in the market.

- Reports

  - **transactions** - As a user I want to see all the transaction I made.
  - **markets** - As a user I want to be able to attend to event so that the organizers can count me in.

- Utilities

  - **profile** - As a user I want to see which escape-rooms are available so I can explore them.
  - **support** - As a user I want to see which escape-rooms are available so I can explore them.

## Backlog

List of other features outside of the MVPs scope

REAL Transactions

## ROUTES:

| Method | URL         | Description                                              |
| ------ | ----------- | -------------------------------------------------------- |
| GET    | /           | Renders index                                            |
| GET    | /about      | Renders about                                            |
| GET    | /auth/login | Redirects to /app/ if user logged in. Renders auth/login |
| POST   | /auth/login | Redirects to /app/ if user logged in.                    |

```
body:
    - username
    - password
```

| Method | URL          | Description                                               |
| ------ | ------------ | --------------------------------------------------------- |
| POST   | /auth/logout | Reditect to /                                             |
| GET    | /auth/signup | Redirects to /app/ if user logged in. Renders auth/signup |
| POST   | /auth/signup | Redirects to /app/ if user logged in. Redirect auth/login |

```
body:
    - name
    - email
    - password
```

| Method | URL                   | Description                                                               |
| ------ | --------------------- | ------------------------------------------------------------------------- |
| GET    | /app/                 | Redirects to /auth/login/ if user not logged in. Renders dashboard        |
| GET    | /app/wallet           | Redirects to /auth/login/ if user not logged in. Renders wallet           |
| GET    | /app/wallet           | Redirects to /auth/login/ if user not logged in. Renders wallet           |
| GET    | /app/wallet/widthdraw | Redirects to /auth/login/ if user not logged in. Renders wallet/widthdraw |
| POST   | /app/wallet/widthdraw | Redirects to /auth/login/ if user not logged in. Redirect app/wallet      |

```
body:
    - amount
```

| Method | URL                 | Description                                                             |
| ------ | ------------------- | ----------------------------------------------------------------------- |
| GET    | /app/wallet/deposit | Redirects to /auth/login/ if user not logged in. Renders wallet/deposit |
| POST   | /app/wallet/deposit | Redirects to /auth/login/ if user not logged in. Redirect app/wallet    |

```
body:
    - amount
```

| Method | URL                      | Description                                                         |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| GET    | /app/trade               | Redirects to /auth/login/ if user not logged in. Renders trade      |
| GET    | /app/trade/buy           | Redirects to /auth/login/ if user not logged in. Renders trade/buy  |
| GET    | /app/trade/buy/:symbolId | Redirects to /auth/login/ if user not logged in. Renders trade/buy  |
| POST   | /app/trade/buy           | Redirects to /auth/login/ if user not logged in. Redirect app/trade |

```
body:
    - symbol
    - amount
```

| Method | URL                       | Description                                                         |
| ------ | ------------------------- | ------------------------------------------------------------------- |
| GET    | /app/trade/sell/:symbolId | Redirects to /auth/login/ if user not logged in. Renders trade/sell |
| POST   | /app/trade/sell           | Redirects to /auth/login/ if user not logged in. Redirect app/trade |

```
body:
    - symbol
    - units
    - price
```

| Method | URL       | Description                                                        |
| ------ | --------- | ------------------------------------------------------------------ |
| GET    | /app/user | Redirects to /auth/login/ if user not logged in. Renders user      |
| POST   | /app/user | Redirects to /auth/login/ if user not logged in. Redirect app/user |

```
body:
    - name
    - email
    - password
```

| Method | URL               | Description                                                           |
| ------ | ----------------- | --------------------------------------------------------------------- |
| GET    | /app/transactions | Redirects to /auth/login/ if user not logged in. Renders transactions |
| GET    | /app/markets      | Redirects to /auth/login/ if user not logged in. Renders markets      |
| GET    | /app/support      | Redirects to /auth/login/ if user not logged in. Renders support      |
| POST   | /app/support      | Redirects to /auth/login/ if user not logged in. Redirect app/support |

```
body:
    - name
    - email
    - subject
    - description
```

## Models

```
User model
- name: String
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

- [Repository Link](https://github.com/mdemena/project-tradexc)
- [Wireframe Link](https://excalidraw.com/#room=6c51c435333ae206c22e,ndG86DZm6bAAMowyCLuXDw)
- [Trello Linl](https://trello.com/b/rCNCcPCD/tradexc)
- [Deploy Link](https://tradexc.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
