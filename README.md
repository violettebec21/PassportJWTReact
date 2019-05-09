Boilerplate using this tutorial https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2

## Simple PassportJS Authentication using:

- MySQL for database management
- SequelizeJS as an Object Relation Mapper(ORM) for SQL-based databases
  - MySQL
- ExpressJS middleware
- Body Parser
- Express Session for server and session management

## Does not use:

- Handlebars
- React
- MongoDB

## Install packages in one line as:

- npm i --save sequelize passport passport-local mysql2 mysql express express-session body-parser bcrypt-nodejs

## API file tree
root/
├── api/ 
| ├── config 
| | ├── passport.js 
| | ├── jwtConfig.js
| ├── server.js 
| ├── sequelize.js 
| ├── package.json
| ├── models/ 
| | ├── user.js
| ├── routes/ 
| | ├── deleteUser.js 
| | ├── findUsers.js 
| | ├── loginUser.js 
| | ├── registerUser.js
| | ├── updateUser.js
| ├── node-modules/