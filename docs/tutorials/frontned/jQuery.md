## jQuery configuration

Please follow the steps below to configure your jQuery app to use it with Auth0.

### 1. Adding the Auth0 scripts

````html
<!-- Auth0 widget script -->
<script src="//cdn.auth0.com/w2/auth0-widget-4.js"></script>
````

We're including the Auth0 widget script to the `index.html`

### 3. Configure the Auth0Widget

Configuring the Auth0Widget will let your app work with Auth0

````js
$(document).ready(function() {
  var widget = new Auth0Widget({
    domain: '@@account.namespace@@',
    clientID: '@@account.namespace@@',
    callbackURL: '@@account.callback@@'
    callbackOnLocationHash: true
  });
});
````

### 5. Let's implement the login

Now we're ready to implement the Login. Once the user clicks on the login button, we'll call the `signin` method of Auth0's `widget` we've just created.

````js
$('.btn-login').click(function(e) {
  e.preventDefault();
  widget.signin({ popup: true });
});
````

````html
<!-- ... -->
<input type="submit" class="btn-login" />
<!-- ... -->
````

If you want to check all the available arguments for the signin call, please [check here](TODO://)

![Signin popup](angular-signin.gif)

#### 6. Handling Login success and failure

The `signin` method receives 2 extra arguments:

1. A callback that will be called once the popup is shown
2. A callback to handle login success and failure

In this case, we'll implement the callback #2.

````js
var userProfile;
$('.btn-login').click(function(e) {
  e.preventDefault();
  widget.signin({ popup: true, null, function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});
````

We need to save the token so that we can use it later on to call a server or an API. In this case, we're saving that token in LocalStorage.

#### 8. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

````js
$('.nick').text(userProfile.nickname);
````

````html
<p>His name is <span class="nick"></span></p>
````

You can [check here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

#### 9. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

````js
localStorage.removeItem('token');
window.location.href = "/";
````

#### 9. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and jQuery.

#### Extra Extra

We've learnt how to configure AngularJS with Auth0's module and a popup for Signing in.

If you want to learn how to implement this with redirect, [you can read here](https://github.com/auth0/auth0-angular/blob/master/docs/widget.md)

If you want to implement your custom Signin and Signup form, [you can read here](https://github.com/auth0/auth0-angular/blob/master/docs/jssdk.md)



