# Auth0 Navigator Tutorial

## Usage

```
  var TutorialNavigator = require('tutorial-navigator');
  var tutorial = new Tutorial({
    clientID: 'some-client-id', // optional
    docsDomain: 'https://docs.myauth0.com' // defaults to `https://docs.auth0.com`
  });

  tutorial.render('#my-tutorial-container');  // Try to avoid using 'tutorial-navigator' as an id
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
