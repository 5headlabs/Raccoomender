# Raccoomender
This code is part of the the Raccoomender project by [5HeadLabs](https://github.com/5headlabs/). Raccoomender was created during SS 2022 for the course [Advanced Web Technologies](https://www.uni-due.de/soco/teaching/courses/lecture-advwebtech-ss22.php).

## Install and Execute
To clone this repository use the following command:
```
git clone git@github.com:5headlabs/Raccoomender.git
```

Before launching the application, make sure to install [Node.js](https://nodejs.org/en/download/) and the required modules by running the following command (inside the project folder):
```
npm install
```

It might be necessary to follow it up with
```
npm audit fix
```
as, depending on future changes, some modules' compatibility might not be given anymore.

To start the server, run the following command:
```
npm run start
```
### Environment Variables
You need to add the file `.env` to the project, containing at least the following fields:
```
MONGO_USER    =...
MONGO_PASSWORD=...
MONGO_DBNAME  =...
JWT_SECRET    =...
```
- `MONGO_USER` contains the Mongo DB Atlas username
- `MONGO_PASSWORD` contains the Mongo DB Atlas account password
- `MONGO_DBNAME` contains the name of the Mongo DB Atlas database
- `JWT_SECRET` is used to sign JWT tokens

## Features
### Feature List + Screenshots (<-- temporary)
**// TODO**

### Available Routes
All available routes start with `/api`.<br>
Routes/Actions which requires the user to be logged in use the JWT token to do so.

#### Auth Routes
Auth routes have the prefix `/api/auth`.
| Method | Route         | Description                                                                                | Header fields | Body fields                                           | Returns (if successful)                                          | 
| ------ | ------------- | ------------------------------------------------------------------------------------------ | ------------- | ----------------------------------------------------- | ------------------------------------------------ | 
| POST   | `/login`      | Checks given credentials and if valid, logs in user.                                       | -             | username (String), password  (String)                 | `{token: <JWT token>, user: <user information>}` |
| POST   | `/register`   | Uses given credentials to register a new user. Logs in user after successful registration. | -             | email (String), username (String), password (String). | `{token: <JWT token>, user: <user information>}` |
| GET    | `/checkLogin` | Verifies JWT token, i.e., checks if current user is logged in.                             | JWT token     | -                                                     | `{isLoggedIn: <true/false>}`                                                 |

#### Tutorial Routes
Tutorial routes have the prefix `/api/tutorial`.
| Method | Route              | Description                                                                | Header fields | Body fields          | Returns (if successful)            |
| ------ | ------------------ | -------------------------------------------------------------------------- | ------------- | -------------------- | ---------------------------------- |
| POST   | `/create`          | Creates a new tutorial with the given data.                                | JWT token     | title (String), content (String), tags (Array) | `{success: true}`                  |
| GET    | `/list`            | Retrieves a random list of tutorials with size `desiredTutorialListCount`. | -             | -                    | `{tutorialList: [...]}`            |
| GET    | `/view/:id`        | Retrieves tutorial object with id=`:id`                                    | -             | -                    | `{tutorial: {...}}`                |
| POST   | `/:id/add/comment` | Adds a comment to tutorial with id=`:id`                                   | JWT token     | title (String), content (String)       | `{success: true, tutorial: {...}}` |
| POST   | `/:id/add/rating`  | Adds/Updates a rating for tutorial with id=`:id`                           | JWT token     | score (int)               | `{success: true, tutorial: {...}}`                                 |

## Architecture

## Technologies & Libraries

## Members
- [Roshan Asim](https://github.com/roshan95)
- [Alexander Hochhalter](https://github.com/AlexHochhalter)
- [Julien Lukasewycz](https://github.com/Julien-Lukasewycz)
- [Malte Josten](https://github.com/MalteJosten)
- [José Antonio Sánchez Suárez](https://github.com/eProw)