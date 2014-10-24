Ionic-OAuth
===========

OAuth based authentication for Ionic Apps

"hellofacebook" is an angular service provideded by Ionic-OAuth. This service provides two methods "login" and "logout" for facebook in our application.


#Install
==========

###Bower Package

```
bower install ionic-oauth;
```
This command installs hellofacebook along with hellojs ( http://adodson.com/hello.js ).


#usage
======
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
