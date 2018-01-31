# Dohi full-stack test 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0. 
And [Express generator](https://expressjs.com/en/starter/generator.html) version 4.15.5.
## API

### Development server

Run `npm start` to start the server.

### Database

The database that should be used is MySQL or equivalent.

The settings for changing the database are in the `database.js` file. 
These should be changed to the correct `host`,`user`,`password` and`database`.

Setup of the tables is done by running the `setup.sql` file on the database that is going to be used.  

### Endpoints

| Status | Meaning                                                        |
|--------|----------------------------------------------------------------|
| 500    | Something unexpected happened and the server failed to process |
| 404    | The item could not be found                                    |
| 400    | The data was malformed and could not be processed              |

#### Bundle

| Type   | Url         | Description                     | Success                       | Failure          |
|--------|-------------|---------------------------------|-------------------------------|------------------|
| GET    | /bundles/   | Gets all the bundles            | Array of bundles              | Status: 500      |
| GET    | /bundle/:id | Get bundle with the given id    | Array of bundles              | Status: 404, 500 |
| DELETE | /bundle/:id | Delete bundle with the given id | Empty Object                  | Status: 404, 500 |
| POST   | /bundle/    | Creates a bundle                | ID of the created bundle      | Status: 400, 500 |
| PUT    | /bundle/:id | Update a bundle                 | Object detailing changes made | Status: 400, 500 |


#### Path

| Type   | Url              | Description                                   | Success                       | Failure          |
|--------|------------------|-----------------------------------------------|-------------------------------|------------------|
| GET    | /paths/:bundleId | Gets all the paths that belongs to the bundle | Array of paths                | Status: 500      |
| GET    | /path/:id        | Get path with the given id                    | Array of paths                | Status: 404, 500 |
| DELETE | /path/:id        | Delete path with the given id                 | Empty Object                  | Status: 404, 500 |
| POST   | /path/           | Creates a path                                | ID of the created path        | Status: 400, 500 |
| PUT    | /path/:id        | Update a path                                 | Object detailing changes made | Status: 400, 500 |

#### Place

| Type   | Url               | Description                                  | Success                       | Failure          |
|--------|-------------------|----------------------------------------------|-------------------------------|------------------|
| GET    | /places/:bundleId | Gets all the places that belongs to the path | Array of places               | Status: 500      |
| GET    | /place/:id        | Get place with the given id                  | Array of places               | Status: 404, 500 |
| DELETE | /place/:id        | Delete place with the given id               | Empty Object                  | Status: 404, 500 |
| POST   | /place/           | Creates a place                              | ID of the created place       | Status: 400, 500 |
| PUT    | /place/:id        | Update a place                               | Object detailing changes made | Status: 400, 500 |


## Client

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
