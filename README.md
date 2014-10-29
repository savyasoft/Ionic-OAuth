Ionic-OAuth
===========

OAuth based authentication for Ionic Apps

"hellofacebook" is an angular service provideded by Ionic-OAuth. This service provides two methods "login" and "logout" for facebook in our application.


#Install
###Bower Package

```
bower install ionic-oauth;
```
This command installs hellofacebook along with hellojs ( http://adodson.com/hello.js ).

#Setup

* Create facebook application for this authentication.(https://developers.facebook.com/docs/web/tutorials/scrumptious/register-facebook-application/)

* Open ionic-oauth/dist/ionic-oauth.js file from bower-components and assign the facebook application client Id in hello.init({});  
* redirect_uri: 'http://localhost:8100/' this is to run the application in browser using ionic serve , that runs at port 8100.
* redirect_uri: 'http://localhost'  this is to run the application in the device.


#usage
```
var app = angular.module('sampleapp',[ 'hellofacebook'  ]);
function sampleCtrl( $scope , hellofacebook  ){

  $scope.facebookLogin = function(){
         hellofacebook.login().then(function(data){
           // success callback
         },function(err){
           // failure callback
         })

 $scope.facebooklogout = function(){
    hellofacebook.logout();
  }

}
```

#REST method
'hellofacebook.login()' tries to login facebook and get the user profile.
 With the userprofile the method calls our REST method of application API.
 
 Example REST method for express application :
 
 ```
  app.post("/facebooklogin",function( req , res ){
       // crete the user with retrieved user profile
       //create jwt token with _id of created user , send the token to the client
  });
  ```



