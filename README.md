# API
## Setup

The database must be setup before starting the server.
### Database

The database that should be used is MySQL or equivalent.

To use MySQL follow the instructions on [this](https://dev.mysql.com/doc/refman/5.7/en/installing.html) page to install.
Once MySQL is installed run 

`mysql -u root -p`

`CREATE DATABASE dohi;`

`CREATE USER 'dohi'@'localhost' IDENTIFIED BY 'dohi';`

`GRANT ALL PRIVILEGES ON dohi. * TO 'dohi'@'localhost';`

The settings for changing the database are in the `database.js` file. 
These should be changed to the correct `host`,`user`,`password` and`database`.

Setup of the tables is done by running `mysql -u dohi -p dohi < sql/setup.sql` on the database that is going to be used.  

### Development server

Run `npm start` to start the server.

## Endpoints

| Status | Meaning                                                        |
|--------|----------------------------------------------------------------|
| 500    | Something unexpected happened and the server failed to process |
| 404    | The item could not be found                                    |
| 400    | The data was malformed and could not be processed              |

### Bundle

| Type   | Url         | Description                     | Success                       | Failure          |
|--------|-------------|---------------------------------|-------------------------------|------------------|
| GET    | /bundles/   | Gets all the bundles            | Array of bundles              | Status: 500      |
| GET    | /bundle/:id | Get bundle with the given id    | Array of bundles              | Status: 404, 500 |
| DELETE | /bundle/:id | Delete bundle with the given id | Empty Object                  | Status: 404, 500 |
| POST   | /bundle/    | Creates a bundle                | ID of the created bundle      | Status: 400, 500 |
| PUT    | /bundle/:id | Update a bundle                 | Object detailing changes made | Status: 400, 500 |


### Path

| Type   | Url              | Description                                   | Success                       | Failure          |
|--------|------------------|-----------------------------------------------|-------------------------------|------------------|
| GET    | /paths/:bundleId | Gets all the paths that belongs to the bundle | Array of paths                | Status: 500      |
| GET    | /path/:id        | Get path with the given id                    | Array of paths                | Status: 404, 500 |
| DELETE | /path/:id        | Delete path with the given id                 | Empty Object                  | Status: 404, 500 |
| POST   | /path/           | Creates a path                                | ID of the created path        | Status: 400, 500 |
| PUT    | /path/:id        | Update a path                                 | Object detailing changes made | Status: 400, 500 |

### Place

| Type   | Url               | Description                                  | Success                       | Failure          |
|--------|-------------------|----------------------------------------------|-------------------------------|------------------|
| GET    | /places/:bundleId | Gets all the places that belongs to the path | Array of places               | Status: 500      |
| GET    | /place/:id        | Get place with the given id                  | Array of places               | Status: 404, 500 |
| DELETE | /place/:id        | Delete place with the given id               | Empty Object                  | Status: 404, 500 |
| POST   | /place/           | Creates a place                              | ID of the created place       | Status: 400, 500 |
| PUT    | /place/:id        | Update a place                               | Object detailing changes made | Status: 400, 500 |

## Dependencies
 * Ajv: Well supported JSON-schema validator.
 * mysql: A pure node.js JavaScript Client implementing the MySql protocol. 
 * CORS: Express middleware to enable CORS and pre-flight checks.
 * Express: To expose CRUD operations as a RESTful API.
 * Morgan and Debug: For easy logging during development.
 * body-parer: Middleware for parsing the JSON in the body.
 
## Design

### Database

The database consists of three tables bundle, path and place. 
These contains columns with the members specified in the task.
Except for the paths and places, these are instead created using foreign key constraints.

### API

The API contains three main routes bundle, path and place. 
Theses routes allow for CRUD operations to be made on the matching table.
When using GET only one type will be returner.
For example, running GET on bundle will return bundles, but they will not contain any paths.
This is done to separate the routes and to make the request faster.
To GET paths/places that are part of a bundle/path i chose to create routes that allows for all paths/places 
to be retrieved, by using the id of the bundle/path that it belongs to.


# Client

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If the endpoint of the API is not on `localhost:3000` it should be changed in the `client/src/app/data.service`.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Dependencies

 * Angular Material: For easy styling and structuring.
 * Material icons: For one icon in the create button.
 * Angular cli: For building and development.
 
## Design

Like the API i opted to separate the bundles, paths and places from each other. 
With one page for editing all the bundles, and buttons on each bundle to go to a page to edit its paths.
The same thing was also done with the paths and places.

Since the bundles, paths and places all needed forms and are very similar, i chose to create a dynamic form.
This was done to reduce code repetition and to allow for expansion of fields in an easy way, 
It also made it possible to create a single dialog for creation of all three types.
Since the three types are so similar i also opted to use only one data service to handle the CRUD operations.
 Instead of creating three almost identical services.

## Images

How it looks when viewing all the bundles

![Image of the client when viewing bundles](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/bundle.PNG)

How it looks when creating a bundle

![Image of the client when viewing create bundle](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/budleCreate.PNG)

How it looks when viewing all the paths of a bundle

![Image of the client when viewing paths](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/path.PNG)

How it looks when creating a path of a bundle

![Image of the client when viewing create path](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/pathCreate.PNG)

How it looks when viewing all the places of a path

![Image of the client when viewing places](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/place.PNG)

How it looks when creating a place of a path

![Image of the client when viewing create places](https://raw.githubusercontent.com/josmase/dohi-full-stack-test/master/images/placeCreate.PNG)
