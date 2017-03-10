# HomeSecure
401 Final Project
<!-- [![Build Status]]()
[![Coverage Status]]() -->

### Team
[Kenneth Edwards ](https://github.com/rpcvjet) |
[Devon Hackley](https://github.com/devonhackley) |
[Irvine Downing](https://github.com/irvinemd55) |
[Stephen Anderson](https://github.com/Sanderson239)

## Description
A REST API built to provide backend support to [HomeSecure Client ](https://github.com/rpcvjet/HomeSecure-client) that utilizes facial recognition from the [Kairos API](https://www.kairos.com/) as well as speech to text password recognition from the [IBM Watson Devoloper Cloud ](https://www.ibm.com/watson/developercloud/speech-to-text.html)to manage lock/unlocking. The front-end site provides administrative privileges to a user for interacting with the restful API to add a lock and manage enrollees to provide access. Information created by user is stored on the [Google Cloud Platform ](https://cloud.google.com/storage/docs/authentication) with the [Firebase API](https://firebase.google.com/docs/) handling authentications.

## Server
### Models

#### Enrollee Model
- **name**
  - *String*
  - input, required
- **password**
  - *String*
  - input, required
- **enrolleeID**
  - unique ID added by UUID, required
- **image**
  - *JPG or PNG*
  - input, required
- **base64 image**
  - input, required

### Routes
#### Authorization Routes
##### Login
- `GET /api/login`
  - Requires basic auth with username:password
  - Firebase provides JSON web token for requests requiring authorization
  - `200 OK`
  - `401 Unauthorized`

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

##### Delete Enrollee by ID
- `DELETE /api/enrollees/:id`
  - Requires authorization
  - authorization token provided by firebase
  - enrolleeID parameter

#### Unlock Routes
  - Compares image/password sent by client to server
  - Uses post request Enrollee post but with different end path

##### Compare Client with enrollees
- `POST /api/unlock`
  - Requires enrolleeID parameter

## Middleware
- **basic-auth-middleware**
  - implements firebase for user authentication
- **bearer-auth-middleware**
  - implements firebase token authentication for POST, GET, and DELETE routes

## Client Side
### Services
#### Admin-Service
- Handles login
- Handles token handshakes
- Handles logout

#### Enrollee-Service
- Handles creation of new enrollees
- Performs get request to grab all enrollees
- Handles deletion of enrollees`

### Containers
#### Admin
- Login splashpage using auth-service to reroute to dashboard if email and password combination is authorized
- Has two controllers
  - login
  - header

#### Dashboard
- Admin page that utilizes Enrollee-Service to create/delete/view enrollees
- Uses auth-service for logout
- Has three Controllers
  - Enrollee-Create
  - Enrollee-Item
  - header

### Controllers
#### Login
 - Form requiring username/password for login

#### Header
- Site banner
- Holds logout button

#### Enrollee-Create
- Form for creating new enrollees
- Requires name, password, and image file to load

#### Enrollee-Item
- Populates dashboard page
- Unique enrollees
- Delete button to remove enrollee
