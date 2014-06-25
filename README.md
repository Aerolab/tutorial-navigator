# Auth0 Navigator Tutorial

## Usage

```js
  var TutorialNavigator = require('tutorial-navigator');  //You don't need this using the standalone compilation
  var tutorial = new TutorialNavigator({
    clientID: 'some-client-id', // optional
    docsDomain: 'https://docs.myauth0.com' // defaults to 'https://docs.auth0.com'
  });

  tutorial.render('#my-tutorial-container');  // Try to avoid using 'tutorial-navigator' as an id
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

```
  git clone git@github.com:auth0/tutorial-navigator.git
  cd tutorial-navigator
  make build
```

And then you can get the files from the `build/` folder.


### Using Component(1)

`TutorialNavigator` uses [segmentio/component-stylus](https://github.com/segmentio/component-stylus) plugin con transpile stylus files into CSS in the build process.

Add `auth0/tutorial-navigator` to your dependencies tree at your project's `component.json` file.

```json
  {
    "dependencies": {
      "auth0/tutorial-navigator": "*"
    }
  }
```
Install `component-stylus` global

```
  $ [sudo] npm install -g component-stylus
```

Or local to your [Node.js](https://nodejs.org) application

```
  $ npm install --save component-stylus
  # or as a devDependency
  $ npm install --save-dev component-stylus
```

Then on the build process

```
  $ component build
```

## Development

```bash
  git clone git@github.com:auth0/tutorial-navigator.git
  cd tutorial-navigator
  make dev-run
```

After that you will have access to 3 example pages:

* **Simple**: [http://localhost:8989/](http://localhost:8989) for simple view.
* **Routing**: [http://localhost:8989/routing](http://localhost:8989/routing) for routing example
* **Standalone**: [http://localhost:8989/routing](http://localhost:8989/standalone) for standalone version (withouth css) **this still requires bootstrap.css**

**Warning!**: At this point, for this to look "good" it requires [auth0/styleguide](https://github.com/auth0/styleguide) to be includuded in the site where it displays.
> this **will** be fixed soon
