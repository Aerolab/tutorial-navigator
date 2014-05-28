# Application Types
## Native Mobile app
**Desc**: Use any of our native SDKs to build your Mobile app.

eg: iPhone SDK
### Please choose your native SDK
* iOS
* Android
* Windows Phone
* Xamarin
* Cordova / PhoneGap
* Ionic Framework

### Will your mobile app connect to an external API or server?

#### Backend Platform
* Node.js
* Ruby
* Java
* PHP with Laravel
* PHP
* Python
* WCF (API Only)
* ASP .NET
* ASP .NET (Owin)
* ServiceStack

#### 3rd party API
* AWS
* Firebase
* Windows Azure Mobile

## Single Page App
**Desc**: Create a Javascript application that runs in your browser using your sever's API.

eg: NodeJS + AngularJS

### Please choose your FrontEnd technology

* AngularJS
* jQuery
* Generic SPA / Vanilla JS

### Please choose the Backend platform or API you'll use

#### Backend Platform
* Node.js
* Ruby
* Java
* PHP with Laravel
* PHP
* Python
* WCF (API Only)
* ASP .NET
* ASP .NET (Owin)
* ServiceStack

#### 3rd party API
* AWS
* Firebase
* Windows Azure Mobile

## Regular WebApp
**Desc**: Create a server side WebApplication using any of our SDKs.

eg: Ruby on Rails

### Please choose the Backend platform you'll use

* Node.js
* Ruby
* Java
* PHP with Laravel
* PHP
* Python
* WCF (API Only)
* ASP .NET
* ASP .NET (Owin)
* ServiceStack

Are you using a FrontEnd technology like AngularJS or Ember? If you do, [please click here](http://go.to.spa/)


## Hybrid/Web Mobile app
**Desc**: Create a Web/Hybrid Mobile app using any of our SDKs

eg: PhoneGap, Ionic
### Please choose your native SDK
* Cordova / PhoneGap
* Ionic Framework

### Will your mobile app connect to an external API or server?

#### Backend Platform
* Node.js
* Ruby
* Java
* PHP with Laravel
* PHP
* Python
* WCF (API Only)
* ASP .NET
* ASP .NET (Owin)
* ServiceStack

#### 3rd party API
* AWS
* Firebase
* Windows Azure Mobile


# Template Locals (Parameters)

* __account__
  * __namespace__: Auth0 namespace. eg: `http://samples.auth0.com/`
  * __callbackURL__: Selected callback. eg: `http://www.google.com/`
  * __clientId__: Auth0 clientID. eg: `djasdklfjdasfh34ihgnjin`
  * __clientSecret__: Auth0 clientID. eg: `asdfkjouhsugfgiuoshgifsgh`
* __configuration__
  * __frontend__: The selected frontned lib. eg: `angularjs` or null
  * __api__: The selected server API. eg: `nodejs` or null
  * __backend__: The selected backend platform. eg: `nodejs` or null
  * __mobile__: The selected mobile platform. eg: `iphone` or `cordova` or null
  * __thirdParty__: boolean indicating if it's a third party plugin or not.
  * __hybrid__: boolean indicating if it's a hybrid app or not.

Example:

````js
var angularWithFirebase = {
  account: {
    namespace: 'http://samples.auth0.com/',
    callbackURL: 'http://www.google.com/',
    clientId: 'asdfasdfdsafq423142134',
    clientSecret: 'asdfasdfdsafq42314213a13214'
  },
  configuration: {
    frontend: 'angularjs',
    api: 'firebase',
    thirdParty: true
  }
}

var cordovaWithNode = {
  account: {
    namespace: 'http://samples.auth0.com/',
    callbackURL: 'http://www.google.com/',
    clientId: 'asdfasdfdsafq423142134',
    clientSecret: 'asdfasdfdsafq42314213a13214'
  },
  configuration: {
    mobile: 'cordova',
    api: 'nodejs'
  }
}
````








