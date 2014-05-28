## jQuery configuration

<% if (configuration.api && configuration.thirdParty) { %>

If you're creating a new app with jQuery which will use a <%= configuration.api %> API, you can [click here to download](https://github.com/auth0/auth0-angular-thirdparty-sample/archive/gh-pages.zip) a seed project that is already configured to use Auth0.

<% } else  { %>

If you're creating a new app with jQuery which will use a <%= configuration.api %> API, you can [click here to download](https://github.com/auth0/auth0-angular-thirdparty-sample/archive/gh-pages.zip) a seed project that is already configured to use Auth0.

<% } %>

You only have to change the `Auth0Widget` configuration to use your Auth0's account. Please [click here](#2-Configure-the-Auth0Widget) to learn how to do it.

Otherwise, Please follow the steps below to configure your app to use jQuery with Auth0.

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- Auth0 widget script -->
<script src="//cdn.auth0.com/w2/auth0-widget-4.js"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
2. A callback that handles login success and failure

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

We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

<% if (configuration.api && configuration.thirdParty) { %>

#### 7. Configuring calls to a Third Party API

Now, we want to be able to call <%= configuration.api %> which is a third party api. What we're going to do is to exchange the JWT token we got from Auth0 for a token we can use to query <%= configuration.api %> securely and authenticated.

For that, we're going to modify the login call we did in step #6. We're going to add the call to get the new token

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

    
      // Call to get new token starts here

      widget.getClient().getDelegationToken('THIRD_PARTY_API_CLIENT_ID', token, 
        function(err, thirdPartyApiToken) {
          localStorage.setItem('thirdPartyApiToken', thirdPartyApiToken.id_token);
        });

      // Call to get new token ends here

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});
````

We're going to create the <%= configuration.api %> in the following steps. Once we create it, you just need to put the client id of that API in this snippet and it'll work. Then, you can use the thirdPartyToken as needed.

<% } %>
<% if (configuration.api && !configuration.thirdParty) { %>

####7. Configuring secure calls to your API

As we're going to call an API we're going to make on <%= configuration.api %>, we need to make sure we send the [JWT token](https://docs.auth0.com/jwt) we receive on the login on every request. For that, we need to implement the `$.ajaxSetup` so that every ajax call sends the `Authorization` header with the correct token.

````js
$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('userToken')) {
      xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('userToken'));
    }
  }
});
````

Please note that we're using the JWT that we saved after login on Step #6.

<% } %>

#### 8. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

````js
$('.nick').text(userProfile.nickname);
````

````html
<p>His name is <span class="nick"></span></p>
````

You can [click here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

#### 9. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

````js
localStorage.removeItem('token');
userProfile = null;
window.location.href = "/";
````

#### 9. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and jQuery.

#### Extra Extra

We've learnt how to configure jQuery with Auth0 using a Popup for sign in.

If you want to learn how to implement this with redirect, [you can read here](TODO://)

If you want to implement your custom Signin and Signup form, [you can read here](TODO://)
