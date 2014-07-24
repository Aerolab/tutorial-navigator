# Auth0 Navigator Tutorial

## Usage

```js
var TutorialNavigator = require('tutorial-navigator');  //You don't need this using the standalone compilation
var tutorial = new TutorialNavigator({
  clientId: 'some-client-id', // optional
  docsDomain: 'https://docs.myauth0.com' // defaults to 'https://docs.auth0.com'
});

tutorial.render('#my-tutorial-container');  // Try to avoid using 'tutorial-navigator' as an id
tutorial.pretty(function() {
  // save function to be called after docs get fetch and instert
  // so they can be `prettyfied` by any pretty printing plugin
});
```

## Install & Build

### From Auth0's CDN, ready to go

```html
<link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/tutorial-navigator/0.7.2/build.css">
<script type="text/javascript" src="https://cdn.auth0.com/tutorial-navigator/0.7.2/build.js"></script>
```

> You may also use our minified or standalone versions `build.min.*`, `standalone.*`, `standalone.min.*`.

### Downloading from this repository

Run the following lines in your terminal

```bash
$ git clone git@github.com:auth0/tutorial-navigator.git
$ cd tutorial-navigator
$ make build
```

And then you can get the files from the `build/` folder.


### Using Component(1)

`TutorialNavigator` uses [deedubs/component-stylus](https://github.com/deedubs/component-stylus) plugin con transpile stylus files into CSS in the build process.

So in order to work installed as a component you need to add this build step by following the next few steps:

1. Add `auth0/tutorial-navigator` to your dependencies tree at your project's `component.json` file.

  ```json
  {
    "dependencies": {
      "auth0/tutorial-navigator": "*"
    }
  }
  ```

2. Install `component-stylus`

  a. by adding it globaly to your environment

    ```
    $ [sudo] npm install -g component-stylus
    ```

  b. or local to your [Node.js](https://nodejs.org) application

    ```
    $ npm install --save component-stylus
    ```

  c. or as a devDependency

    ```
    $ npm install --save-dev component-stylus
    ```

3. Then proceed to build the tutorial

  a. by `component(1)` command line tool with

    ```
      $ component build --use component-stylus
    ```

  b. or with your custom builder by

    ```
    var Builder = require('component-builder')
    var stylus = require('component-stylus');

    var builder = new Builder(__dirname);

    builder.use(stylus());
    ```

## Development

```bash
$ git clone git@github.com:auth0/tutorial-navigator.git
$ cd tutorial-navigator
$ make dev-run
```

After that you will have access to 3 example pages:

* **Simple**: [http://localhost:8989/](http://localhost:8989) for simple view.
* **Routing**: [http://localhost:8989/routing](http://localhost:8989/routing) for routing example
* **Standalone**: [http://localhost:8989/routing](http://localhost:8989/standalone) for standalone version (withouth css) **this still requires bootstrap.css**
