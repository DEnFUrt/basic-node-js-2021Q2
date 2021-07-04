# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/DEnFUrt/basic-node-js-2021Q2.git
```

## Switch to the Task8 branch

```
git checkout task8
```
## Running multi-container Docker applications:
The app uses docker copmose
To start the project, you must perform the following steps
Open a terminal in the directory where you will clone the repository

Execute commands:
```
git clone https://github.com/DEnFUrt/basic-node-js-2021Q2.git
cd basic-node-js-2021Q2
git checkout task8
docker-compose up
```
At startup, the application checks whether the database and the table structure exist, if not, then the initial migration starts automatically, after which the admin user is created.
The corresponding messages are displayed in the log.
If you want to create migrations yourself, follow these steps

Setting dependencies in the local directory outside the container with the node in order not to enter the terminal inside the container.
```
npm i 
```
Generating migrations
```
npm run migration:generation -n createTable // or any other migration file name
```

Start of migrations
```
npm run migration
```

Running tests
```
npm run test:auth
```
If you want to perform the same actions from a container with a node, you must perform the following actions
Open a terminal in the directory where you will clone the repository
```
git clone https://github.com/DEnFUrt/basic-node-js-2021Q2.git
cd basic-node-js-2021Q2
git checkout task8
docker-compose up
```
Open another terminal and execute commands in the application directory
```
docker ps
copy the container ID with the node
docker exec -it container_ID /bin/sh
```

Generating migrations
```
npm run migration:sh:generation -n createTable // or any other migration file name
```

Start of migrations
```
npm run migration:sh
```

Running tests
```
npm run test:auth
```

## Launching a local application, setting up the environment

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
