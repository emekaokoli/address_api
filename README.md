# The Address API.
A simple Address api that lets you create, update, and delete addresses.

- Add new address and manage details.
- Get all addresses.
- Get a specific address by id.
- Update an address by id.
- Delete an address by id.

## Technologies used.
- Express framework.
- Joi is used for validation.
- Mongodb is used for database.
- Nodejs is used for server.

```bash
## directory structure.
src # The source code.
 ┣ controller # The controller.
 ┃ ┗ address.controller.js # The address controller.
 ┣ middleware # The middleware.
 ┃ ┗ validation.js # The validation middleware.
 ┣ models # The models.
 ┃ ┗ address.model.js # The address model.
 ┣ routes # The routes.
 ┃ ┗ address.routes.js # The address routes.
 ┣ schema # The schema.
 ┃ ┗ validateReq.schema.js # The validation schema.
 ┣ service # The service.
 ┃ ┗ address.service.js # The address service.
 ┣ utils # The utils. 
 ┃ ┣ connect.mongoose.utils.js # The connect mongoose utils.
 ┃ ┗ startServer.js # The start server utils.
 ┗ index.js # The index.

```
## to run the project.

### `yarn install`

## To start in development mode.
### `yarn dev`

## To start in production mode.
### `yarn start`

## To test.
### `yarn test`
Runs the app in the development mode.\
Enter [http://localhost:1339/api/v1/address](http://localhost:1339/api/v1/address) in postman.

Runs the app in the production mode.\
Enter [http://localhost:1339/api/v1/address](http://localhost:1339/api/v1/address) in postman.

### For the project documentation and schema.

 while the app is running, please visit 
    [http://localhost:1339/api/v1/documentation](http://localhost:1339/api/v1/documentation) and view the docs and endpoints.

# Please note: 
This project requires .env file to be present in the root directory to work, request for it if you will like to test the project.
