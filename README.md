# Restaurant Reservation Management System

Welcome to my Restaurant Reservation Management System.

## Made by

Jimmy Tran

# Table of Contents

- [Restaurant Reservation Management System](#restaurant-reservation-management-system)
- [Table of Contents](#table-of-contents)
- [Media](#media)
- [Scripts](#scripts)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Tech-Stack](#tech-stack)

  - [Back-End Dependencies `(Production)`](#back-end-dependencies-production)
    - [Cors](#cors)
    - [Express](#expressjs)
    - [Date-fns](#date-fns)
    - [MongoDB](#mongodb)
    - [Mongoose](#mongoose)
  - [Back-End Dependencies `(Development)`](#back-end-dependencies-development)
    - [Concurrently](#concurrently)
    - [Nodemon](#nodemon)
  - [Front-End Dependencies `(Production)`](#front-end-dependencies-production)
    - [Axios](#axios)
    - [React](#react)
    - [React Router](#react-router)
    - [PrimeReact](#prime-react)
    - [React-Modal](#react-modal)

- [API Documentation](#api-documentation)
  - [Backend API](#backend-api)
    - [Reservation Routes](#reservation-routes)
      - [Create Reservations](#create-reservation)
      - [Get Reservations](#get-reservation)
      - [Get Reservations](#get-all-reservations)
      - [Update Reservation](#update-reservation)
      - [Update Reservation Status](#update-reservation-status)
      - [Delete Reservation](#delete-reservation)
    - [Table Routes](#table-routes)
      - [Create Table](#create-table)
      - [Get Tables](#get-tables)
      - [Update Table](#update-table)
      - [Delete Table](#delete-table)
    - [Contacts Routes](#contacts-routes)
      - WIP

# Media

# Scripts

## Running

`npm run installdepend`: installs all packages in frontend and backend folder from the main folder.

`npm run dev`: Runs both the front and back ends.

# Environment Variables

`MONGODB`: URL for the database

# Tech-Stack

## Back-End Dependencies `(Production)`

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### date-fns

date-fns used to format dates to be more readable and easier to manipulate. [View Dependency](https://date-fns.org/)

### MongoDB

MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database. Due to the minimal about of data relationships I felt this was a good choice for my Reservation Management System. | [View Dependency](https://docs.mongodb.com/)

### Mongoose

Provides a straight-forward, schema-based solution to model application data with MongoDB. It also offers out of the box perks such as validation. | [View Dependency](https://mongoosejs.com/)

## Back-End Dependencies `(Development)`

### Concurrently

This provides the ability to conveniently run both the back-end and front-end servers simultaneously on one terminal, which makes keeping track of errors easy during development as well as cutting back on time switching between terminals. | [View Dependency](https://www.npmjs.com/package/concurrently)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)

## Front-End Dependencies `(Production)`

### Axios

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple. | [View Dependency](https://www.npmjs.com/package/react-axios)

### React

React is the current industry standard that offers a lot of out of the box benefits. It is fast, efficient, and scalable. Due to the large community, finding solutions to potential problems and reference material is much easier, even for a potential dev without a lot of experience who would like to contribute to application. | [View Dependency](https://reactjs.org/docs/getting-started.html)

### React Router

React Router is a lightweight, fully-featured routing library for the React JavaScript library. React Router runs everywhere that React runs; on the web, on the server (using node.js), and on React Native. | [View Dependency](https://www.npmjs.com/package/react-router-dom)

### Prime React

PrimeReact is a rich set of open source UI components for React. | [View Dependency](https://primereact.org/)

### React Modal

Accessible modal dialog component for React.JS. | [View Dependency](https://www.npmjs.com/package/react-modal)

# API Documentation

## Backend API

### Reservation Routes

#### Create Reservation

POST `/api/reservations/:tableid`

Creates a reservation and appends reservationID to table.

Request body should look like this:

```
{
"name":"joey",
"phone":"123-123-1234",
"email":"joe@email.com",
"numPeople": 3,
"comments":"birthday"
"startTime":"12 PM"
"reservationDate":"2023-06-02T04:00:00.000Z"

}
```

`name`: String, required

`phone`: String

`email`: String,

`numPeople`: Integer, required

`comments`: String

`startTime`: String, required

`reservationDate`: Date, required

Response:

```
    {
        "_id": "6487814e5b8219e33d37d882",
        "tableNumber": "1",
        "phone":"123-123-1234",
        "email":"joe@email.com",
        "reservationDate": "2023-06-02T04:00:00.000Z",
        "startTime":"12 PM"
        "numPeople": 3,
        "comments":"birthday"
        "createdAt": "2023-06-12T20:34:22.921Z",
        "updatedAt": "2023-07-04T18:06:22.507Z",
        "__v": 0,
        "tableNumberId": "64877e9f5b8219e33d37d85b",
        "status": "pending"
    }
```

#### Get Reservation

GET `/api/reservations/:id`

Gets specific reservation in the database.

Response:

```
{
        "_id": "6487814e5b8219e33d37d882",
        "tableNumber": "1",
        "name": "2",
        "phone": "",
        "email": "",
        "reservationDate": "2023-06-02T04:00:00.000Z",
        "startTime": "9:15 AM",
        "numPeople": 2,
        "comments": "",
        "createdAt": "2023-06-12T20:34:22.921Z",
        "updatedAt": "2023-07-04T18:06:22.507Z",
        "__v": 0,
        "tableNumberId": "64877e9f5b8219e33d37d85b",
        "status": "pending"
}

```

#### Get All Reservations

GET `/api/reservations`

Gets all reservations in the database.

Response:

```
{
        "_id": "6487814e5b8219e33d37d882",
        "tableNumber": "1",
        "name": "2",
        "phone": "",
        "email": "",
        "reservationDate": "2023-06-02T04:00:00.000Z",
        "startTime": "9:15 AM",
        "numPeople": 2,
        "comments": "",
        "createdAt": "2023-06-12T20:34:22.921Z",
        "updatedAt": "2023-07-04T18:06:22.507Z",
        "__v": 0,
        "tableNumberId": "64877e9f5b8219e33d37d85b",
        "status": "pending"
},
...


```

#### Update Reservation

PUT `/api/reservations/:id`

Updates specific reservation in the database.

Request body should look like this:

```
{
        "tableNumber": "NEW data",
        "name": "old data",
        "phone": "old data",
        "email": "old data",
        "reservationDate": "NEW data",
        "startTime": "old data",
        "numPeople": old data,
        "comments": "old data",
        "status": "old data"
}
```

field would be filled with current data, and updated fields would be filled with new data.

Response:

```
{
        "_id": "old data",
        "tableNumber": "NEW data",
        "name": "old data",
        "phone": "old data",
        "email": "old data",
        "reservationDate": "NEW data",
        "startTime": "old data",
        "numPeople": old data,
        "comments": "old data",
        "createdAt": "old data",
        "updatedAt": "old data",
        "__v": 0,
        "tableNumberId": "old data",
        "status": "old data"
}
```

Response will be a success message.

Response:

```
{
  "msg": "Reservation updated successfully!"
}
```

#### Update Reservation Status

PUT `/api/reservations/status/:id`

Changes status of reservation to either "pending", "seated", "cancelled", or "complete".

Request body should look like this:

```
{
  "status": "seated"
}
```

`status`: String, can be either "pending", "seated", "cancelled", or "complete"

Everything is optional because it defaults to "pending" if no status is provided.

Response will be a success message.

Response:

```
{
  "msg": "status updated successfully!"
}
```

#### Delete Reservation

DELETE `/api/reservations/:id/:tableid`

Deletes an reservation from the database. Also deletes reservation id stored in the Table's reservations array.

Response includes a success message.

Response:

```
{
  "msg": "Reservation deleted successfully"
}
```

### Table Routes

#### Create Table

POST `/api/tablenumbers/`

Adds a new table to the database

Request body should look like this:

```
{
  "tableNum": "A11"
  "maxCapacity": 4
}
```

`tableNum`: String, required

`maxCapacity`: Number, required

Response:

```
{
  {
  "_id": "5ba6c6860c6f7f7f7e859dc6",
  "tableNum": 1,
  "__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",
  },
  {
  "msg": "Table added successfully
  }
}
```

#### Get Tables

GET`/api/tablenumbers/`

**Requires:** Authorization

Get all tables.

Response:

```
    {
        "_id": "64877e9f5b8219e33d37d85b",
        "tableNum": "1",
        "maxCapacity": 1,
        "reservations": [
            "6487814e5b8219e33d37d882",
            "6488852444fa29fac1b709d3",
            "64906a9f23059e465420a0ce",
            "64907f0923059e465420a1ea",
            "6490c9b723059e465420a30b",
            "649c52aa6bc3642ae8da604f",
            "64a469edf35261c74847dca3",
            "64a5a82f8b3bb267caf81c21"
        ],
        "unavailableDates": [],
        "createdAt": "2023-06-12T20:22:55.894Z",
        "updatedAt": "2023-07-06T23:20:50.107Z",
        "__v": 0
    },
    ...
```

#### Update Table

PUT `api/tablenumbers/:id`

Request body should look like this:

```

{

	"tableNum": "old Data",
  "maxCapacity": "new Data",
}
```

`tables`: Array of Objects with Table information

Response includes the added item's:

Response:

```
{
	"_id": "5bb91ad8d5461a87502efc83",
	"tableNum": "old Data",
  "maxCapacity": "new Data",
	"__v": 0
	"createdAt": "date table was created",
	"updatedAt": "date table was updated last",
},
{
  "msg": "Table updated successfully"
}
```

#### Delete Table

DELETE `api/tablenumbers/:id`

**Requires:** Authorization

Deletes a table by its ID. All reservations inside the reservations array will also be deleted.

Response:

```
{
  "msg": "Table deleted successfully"
}
```

### Contacts Routes

Implementing in future.
