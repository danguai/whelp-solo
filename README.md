# W H E L P
Whelp it's a Yelp clone for puppies and their litters.

Users of the app will be able to sign up or log in, create their own litter and add as many puppies as necessary, and you can add as many images for each puppy as you have

# GETTING STARTED
Clone this repo
```
git clone https://github.com/danguai/whelp-solo.git
```

# BACKEND
BE [ 1 ]  Go to your backend folder...
```js
cd backend
```
...and install dependencies.
* npm install

BE [ 2 ]  Applications environment constants
* Create a .env file with the following:
```js
PORT=«choose_port_number»
DB_USERNAME=whelp_app
DB_PASSWORD=«choose_strong_password»
DB_DATABASE=whelp_db
DB_HOST=localhost
JWT_SECRET=«choose_strong_password»
JWT_EXPIRES_IN=604800
```
BE [ 3 ]  Postgres S Q L
* Create a new user in postgres with a password and CREATEDB:
```js
CREATE USER whelp_app WITH PASSWORD '«choose_strong_password»' CREATEDB;
```
* generate a JWT secret by using the following line of code in a node terminal:
```js
require("crypto").randomBytes(32).toString("hex");
```
* copy and paste into your .env file after JWT_SECRET=<the generated code>

BE [ 4 ] create, migrate, and seed your database:
```js
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
FE [ 5 ] Start up your backend server with:
```js
npm start
```
- You should see your terminal show the server running on localhost:«choose_port_number»

# FRONTEND

FE [ 1 ] Add the following proxy to the package.json in your frontend directory
  "proxy": "http://localhost:«choose_port_number»"

FE [ 2 ] Go to your frontend folder and...
```js
cd ../frontend
```
* npm install

FE [ 3 ] Start up your frontend server with:
```js
npm start
```
- Your browser should open up the app at localhost:3000

# L I V E _ A P P
- You can log in with demo user
- You can create a new user
- You can log in with a previous created user

# FEATURES

Logged in users can perform the following actions:
- Create | Read | Update | Delete LITTER
- Create | Read | Update | Delete PUPPIES
- Create | Read | Update | Delete IMAGES for each PUPPY
