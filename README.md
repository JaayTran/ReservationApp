# Restaurant Reservation Management System

Welcome to my Restaurant Reservation Management System.

## Made by

Jimmy Tran

# Table of Contents

- [Restaurant Reservation Management System](#reservation-app)
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Tech-Stack](#tech-stack)

  - [Back-End Dependencies `(Production)`](#back-end-dependencies-production)
    - [Cors](#cors)
    - [Express](#expressjs)
    - [Date-fns](#datefns)
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
      - [Update Reservation](#update-reservation)
      - [Update Reservation Status](#update-reservation)
      - [Delete Reservation](#delete-reservation)
    - [Table Routes](#table-routes)
      - [Create Table](#create-table)
      - [Get Tables](#get-table)
      - [Update Table](#update-table)
      - [Delete Table](#delete-table)
    - [Contacts Routes](#contacts-routes)
      - WIP

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

Reservation Management SystemT `/api/reservations/:tableid`

Creates a reservation and appends reservationID to table.

Request body should look like this:

```
{
"name":"joey",
"phone":"123-123-1234",
"email":"joe@email.com",
"numPeople": 3,
"comments":"birthday"
}
```

`name`: String, required

`loginNumber`: String, required

`pass`: String, required

`isAdmin`: Boolean, required

Password will be protected in responsee via CryptoJS

Response:

```
{
createdAt: "the date user was registered"
isAdmin:true
loginNumber:"1528"
name:"Admin"
password: "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY"
updatedAt: "the date user information was updated"
__v: 0
_id: "63e4067d2d1a17c769b0257a"
}
```

#### Login Employee

Reservation Management SystemT `/api/users/login`

Logs an existing user into the application.

Request body should look like this:

```
{
  "loginNumber": "123",
  "password": "123"
}
```

`loginNumber`: String, required

`password`: String, required

Password will be protected in responsee via CryptoJS

Response:

```
{
createdAt: "the date user was registered"
isAdmin:true
loginNumber:"1528"
name:"Admin"
password: "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY"
updatedAt: "the date user information was updated"
__v: 0
_id: "63e4067d2d1a17c769b0257a"
}
```

#### Get Users

GET `/api/users/getusers`

**Requires:** Authorization

Retrieves a list of employees from the database. Admins can see all employees in the restaurant, managers can see only servers.

Response:

```
{
  "users": [
    {
        "_id": "63e4067d2d1a17c769b0257a",
        "name": "Admin",
        "password": "U2FsdGVkX1932LX4ffxvKk3VJY5xtIlSUZnNSPhEUhY",
        "createdAt": "the date user was registered",
        "updatedAt": "the date user was updated",
        "__v": 0,
        "loginNumber": "1",
        "isAdmin": true
    },
    {
        "_id": "63e40fa28ec0c7005c4412f2",
        "name": "User",
        "password": "O2ssdGVkX1932LX4ffxvKk3VJY5xX1932LX4ffxvUwZ",
        "isAdmin": false,
        "createdAt": "the date user was registered",
        "updatedAt": "the date user was updated",
        "__v": 0,
        "loginNumber": "2"
    }
]
}
```

#### Update Employee

PUT `/api/users/updateuser`

**Requires:** Authorization

Changes the name, login number, password or admin permission for the user. only a current admin can access user page.

Request body should look like this:

```
{
  "name": "New Name",
  "loginNumber": "1234",
  "password": "New Password"
  "isAdmin": "true or false"
}
```

`name`: String, optional

`loginNumber`: String, optional

`password`: String, optional,

`isAdmin`: String, optional

Everything is optional because it is not required to update a user.

Response will be a success message.

Response:

```
{
  "msg": "User updated successfully!"
}
```

#### Delete User

DELETE `/api/users/deleteuser/`

**Requires:** Authorization

Deletes an employee from the database. Only admins can access the users page.

Response includes a success message.

Response:

```
{
  "msg": "User deleted successfully"
}
```

#### Employee Logout

GET `/api/users/logout`

removes authorization token from local storage, prohibitting any access to pos system unless authorized credentials are entered.

### Item Routes

#### Add Item

Reservation Management SystemT `/api/products/addproducts`

**Requires:** Authorization

Adds a new food item to the database. Only admins can view products page.

Request body should look like this:

```
{
  "name": "Spring Rolls",
  "category": "Appetizers",
  "price": "4.50",
}
```

`name`: String, required, must be unique

`price`: Number, required

`category`: String, optional

Response includes the added item's:

- name
- category
- price

Response:

```
{
    "_id": "63d95b2fc9fa35bc2bb12841",
    "name": "Spring Rolls",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
},
  "msg": "Product Added Successfully!"
}
```

#### Get All Items

GET `/api/products/getproducts`

Retrieves all of the food items from the database.

Each element in the response array includes and item's:

- name
- category
- price

Response:

```
{
  "items": [
    {
    "_id": "63d95b2fc9fa35bc2bb12841",
    "name": "Spring Rolls",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
    },
    {
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
    },
	.....
  ]
}
```

#### Update Item

PUT `/api/products/updateproducts`

**Requires:** Authorization

Updates information for an existing food item. Only admins can view products page.

Modal will open up with all of products information and will overwrite product with any changed information.

pre updated item

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```

inputting new item detail (price in this case)

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```

`name`: String

`price`: Number

`category`: String

You only need one field!

Response includes the updated item's:

- name
- price
- category

Response:

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 4.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
```

#### Delete Item

DELETE `/api/products/deleteproducts/`

**Requires:** Authorization

Deletes an item from the database. Only admins can view the products page.

Response includes a success message and the deleted item's:

- name
- price
- category
- description

Response:

```
{
    "_id": "63d95c51c9fa35bc2bb1284c",
    "name": "Fries",
    "category": "Appetizers",
    "price": 3.5,
    "modifier": [],
    "createdAt": "date item was created",
    "updatedAt": "date item was updated last",
    "__v": 0
}
  },
  "msg": "Product Deleted Successfully!"
}
```

### Table Routes

#### Add Table

Reservation Management SystemT `/api/tables/addtables`

**Requires:** Authorization

Adds a new table to the database

Request body should look like this:

```
{
  "tableNum": "A11"
}
```

`number`: Number, required

Response includes the added item's:

- Table number

Response:

```
  "tables": [
    {
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "tableNum": 1,
      "__v": 0
	  "createdAt": "date item was created",
	  "updatedAt": "date item was updated last",
    }
  ],
  "msg": "Table added successfully
```

#### Get All Tables

GET`/api/tables/gettables`

**Requires:** Authorization

Get all tables.

Response:

```
{
  "tables": {
    "id": "5ba6c19f0c6f7f7f7e859dc4",
    "number": 1,
    "__v": 0
	"createdAt": "date item was created",
    "updatedAt": "date item was updated last",
  },
  {
    "id": "5ba6d19f0c6f7f7f7e859db4",
    "number": 1,
    "__v": 0
	"createdAt": "date item was created",
    "updatedAt": "date item was updated last",
  },
  ...
}
```

#### Update Tables

Reservation Management SystemT `api/tables/update`

**Requires:** Authorization

Updates all the tables in array in the request body.

Request body should look like this:

```

{
	"_id": "5bb91ad8d5461a87502efc83",
	"tableNum": "A11"
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",
}
```

`tables`: Array of Objects with Table information

Response includes the added item's:

Response:

```
{
	"_id": "5bb91ad8d5461a87502efc83",
	"tableNum": A11,
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",

}
```

#### Delete Table

Delete `api/tables/deletetables`

**Requires:** Authorization

Deletes a table by its ID. The ID will be pulled off of the request parameters. No request body is required for this route. Only admins can view tables page.

Response:

```
{
  "tables": [
    {
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "tableNum": 1,
      "__v": 0
	  "createdAt": "date item was created",
	  "updatedAt": "date item was updated last",
    }
  ],
  "msg": "Table deleted successfully
```

### Bill Routes

#### Add Bill

Reservation Management SystemT `api/bills/addbills`

Adds a new bill to the database

Request body should look like this:

```
{
	"_id": "5bb91ad8d5461a87502efc83",
	"bills": [...]
	"__v": 0
	"createdAt": "date item was created",
	"updatedAt": "date item was updated last",
}
```

`bills`: Array of Objects with items in bill.

Response includes the added items as an Array labelled cartItems:

Response:

```
{
_id: 63d95f62c9fa35bc2bb12886
tableNumber : "12"
subTotal : 77
totalAmount : 87.01
tax : 10.01
paymentMethod : "cash"
cartItems: Array
createdAt : 2023-01-31T18:35:14.220+00:00
updatedAt : 2023-01-31T18:35:14.220+00:00
__v : 0
},
msg: "Bill Created Successfully
```

#### Get Bills

get `api/bills/getbills`

Response:

```
{
_id: 63d95f62c9fa35bc2bb12886
tableNumber : "12"
subTotal : 77
totalAmount : 87.01
tax : 10.01
paymentMethod : "cash"
cartItems: Array
createdAt : 2023-01-31T18:35:14.220+00:00
updatedAt : 2023-01-31T18:35:14.220+00:00
__v : 0
},
{
...
},
...

```
