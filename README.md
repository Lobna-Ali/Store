# Store Project

#### Install package added in package.json

- Run npm install

#### To run migration files

- db-migrate up

#### To Run Test

- Run npm run test.
- NOTE: I am using ubuntu so in the test script you will find export with the ENV variable, please remove export if you are using windows

#### To Run Build

- Run npm run build

#### To Run eslint and prettier

- Run npm run lint

#### To Run Node App

- Run npm run start

## User api

### Add new user

http://localhost:3000/api/register/user

#### payload example

{

    "first_name": "udacity",
    "last_name": "reviewer",
    "password": "12345""

}

### get user details

http://localhost:3000/api/userDetails

#### Provide Token in the header under the name authorization

### get all users

http://localhost:3000/api/users

#### Provide Token in the header under the name authorization

## Product api

### Add new product

http://localhost:3000/api/new/product

#### payload example

{
name: 'tv',
category: 'elec',
price: 8000
}

#### Provide Token in the header under the name authorization

### get product details

http://localhost:3000/api/product/:id

### get all products

http://localhost:3000/api/products

## Order api

### get order for user

http://localhost:3000/api/order/:user-id
