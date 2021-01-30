# Food Order Node API

## Installation with Docker

1. Clone from git

2. cd into food-order

run `yarn install` to install all dependencies

3. run `dokcer-compose up` to start the development server with all dependencies

## Build instruction

run `yarn build`

## Build and start server

run `yarn prod`


## Endpoint list

###  Method: `POST`
### Request Endpoint:
```
http://localhost:3000/api/v1/create
```

###  Method: `POST`
### Request Endpoint:
```
localhost:3000/api/v1/login
```

###  Method: `PATCH`
### Request Endpoint:
```
localhost:3000/api/v1/order/update
```

###  Method: `DELETE`
### Request Endpoint:
```
localhost:3000/api/v1/order/delete
```

###  Method: `POST`
### Request Endpoint:
```
localhost:3000/api/v1/order/order/create
```

###  Method: `GET`
### Request Endpoint:
```
localhost:3000/api/v1/order/order/list
```

## NB: I haven't allowed duplicate email for collision