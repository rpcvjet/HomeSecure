# HomeSecure
401 Final Project
[![Build Status]]()
[![Coverage Status]]()

### Team
[Kenneth Edwards ](https://github.com/rpcvjet) |
[Devon Hackley](https://github.com/devonhackley) |
[Irvine Downing](https://github.com/irvinemd55) |
[Stephen Anderson](https://github.com/Sanderson239)

## Description
A REST API that provides a backend support to a locking mechanism that utilizes facial recognition to manage lock/unlocking. A front-end site provides administrative privileges to a user for interacting with the restful API to add a lock and manage enrollees to provide access.

## Server
### Models

#### User Model
- **username**
  - *String*
  - input, required, unique
- **email**
  - *String*
  - input, required, unique
- **password**
  - *String*
  - input, required
- **authorization**
  - provided by firebase, unique

#### House Model
- **name**
  - *String*
  - input, required
- **userID**
    - added by User model, required

#### Enrollee Model
- **name**
  - *String*
  - input, required
- **password**
  - *String*
  - input, required
- **houseID**
  - added by House model, required
- **base64 image**
  - input, required

### Routes
#### User Routes
##### Signup
- `POST /api/signup`
  - Create a user
  - `200 OK`
  - `400 Bad Request`
  - `404 Not Found`
  - `409 Conflict`

##### Login
- `GET /api/login`
  - Requires basic auth with username:password
  - Firebase provides JSON web token for requests requiring authorization
  - `200 OK`
  - `401 Unauthorized`

##### Remove
- `DELETE /api/remove`
  - Requires basic auth with username:password
  - Firebase provides JSON web token for requests requiring authorization
  - `200 OK`
  - `401 Unauthorized`

#### House Routes
##### Create a House (1 House per User)
- `POST /api/house`
  - Requires authorization
  - authorization token provided by firebase

##### Retrieve a House
- `GET /api/house/:id`
  - houseID parameter

##### Edit a House
- `PUT /api/house/:id`
  - houseID parameter

#### Enrollee Routes

##### Add an Enrollee
- `POST /api/enrollees`
  - Requires authorization
  - authorization token provided by firebase

##### Retrieve all Enrollees
- `GET /api/enrollees`
  - Requires authorization
  - authorization token provided by firebase

##### Retrieve Enrollee by ID
- `GET /api/enrollees/:id`
  - Requires authorization
  - authorization token provided by firebase
  - enrolleeID parameter

##### Edit Enrollee by ID
- `PUT /api/enrollees/:id`
  - Requires authorization
  - authorization token provided by firebase
  - enrolleeID parameter

##### Delete Enrollee by ID
- `DELETE /api/enrollees/:id`
  - Requires authorization
  - authorization token provided by firebase
  - enrolleeID parameter

## Middleware
- **basic-auth-middleware**
  - implements firebase for user authentication
- **bearer-auth-middleware**
  - implements firebase token authentication for POST, GET, and DELETE routes
