# Raccoomender
Raccoomender is a learning platform supporting users by giving them the possibility to watch, search for and create tutorials to specific topics. Users of Raccoomender can rate and comment on different tutorials. They can also filter tutorials by their average rating. This project uses the MERN architecture. The source code is part of the corresponding project by [5HeadLabs](https://github.com/5headlabs/). Raccoomender was created during SS 2022 for the course [Advanced Web Technologies](https://www.uni-due.de/soco/teaching/courses/lecture-advwebtech-ss22.php).

## Features
### Search for tutorials!

![Frontpage_logged_in](https://github.com/5headlabs/Raccoomender/blob/main/images/Frontpage_logged_in.PNG?raw=true)

### Watch tutorials!

![Tutorial_View_1](https://github.com/5headlabs/Raccoomender/blob/main/images/Tutorial_View_1.PNG?raw=true)

### Rate and comment them!

![Tutorial_View_2](https://github.com/5headlabs/Raccoomender/blob/main/images/Tutorial_View_2.PNG?raw=true)

### Create tutorials!

![Tutorial_Creation](https://github.com/5headlabs/Raccoomender/blob/main/images/Tutorial_Creation.PNG?raw=true)

### [Walkthrough (Youtube)](https://www.youtube.com/watch?v=YJPZoM27CRA)

[![Watch the video](https://img.youtube.com/vi/YJPZoM27CRA/maxresdefault.jpg)](https://www.youtube.com/watch?v=YJPZoM27CRA)

### Available API Routes
All available API routes start with `/api`.<br>
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
![architecture](https://github.com/5headlabs/Raccoomender/blob/main/images/Architecture.PNG?raw=true)

## Technologies & Libraries
![technologies](https://github.com/5headlabs/Raccoomender/blob/main/images/Technologies.PNG?raw=true)

## Install and Execute
To clone this repository use the following command:
```
git clone git@github.com:5headlabs/Raccoomender.git
```

### BACKEND Set-up
To switch to the backend-only branch use the following command:
```
git switch backend
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
You need to add the file `.env` to the backend project folder (for local execution) or specifiy them in your deployment (e.g as Config Vars in Heroku), containing at least the following fields:
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

### FRONTEND Set-up and Building
To switch to the frontend-only branch use the following command:
```
git switch frontend
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

To start the development server, run the following command:
```
yarn start
```
When both starting frontend and backend for development then check that the backend is started before the frontend.

To build the frontend, run the following command:
```
npm run build
```

The build output is now located under `/build`.


### Deployment and Local Execution
To deploy the application put the build output of the frontend-only branch into the `/public` folder in the backend on the main branch. 
This branch should be used for deployment (on e.g Heroku). Don't forget to set the environment variables (e.g. Config Vars on Heroku).

To execute the application locally, install necessary node modules:
```
npm install
```

if necessary do:
```
npm audit fix
```

and then start the backend server on the main branch with:
```
npm run start
```

## Members
- [Roshan Asim](https://github.com/roshan95)
- [Alexander Hochhalter](https://github.com/AlexHochhalter)
- [Julien Lukasewycz](https://github.com/Julien-Lukasewycz)
- [Malte Josten](https://github.com/MalteJosten)
- [José Antonio Sánchez Suárez](https://github.com/eProw)
