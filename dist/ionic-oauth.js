angular.module('sociallogin', [])
   .constant('serverurl', 'http://localhost:3000/')
   .config(function() {
      var FACEBOOK_CLIENT_ID = "",
         WINDOWS_CLIENT_ID = "",
         GOOGLE_CLIENT_ID = "",
         TWITTER_CLIENT_ID = "";

      hello.init({
         facebook: FACEBOOK_CLIENT_ID,
         windows: WINDOWS_CLIENT_ID,
         google: GOOGLE_CLIENT_ID,
         twitter: TWITTER_CLIENT_ID 
      }, {
         scope: "email",
         redirect_uri: 'http://localhost:8100/' //this is to run the application in browser using ionic serve , that runs at port 8100
         //redirect_uri: 'http://localhost' // this is to run the application in the device                                        
      });
   })
   .service("sociallogin", function($http, $q, serverurl) {
       this.logout = function( network ) {
          
          hello.logout( network ).then(function(s){} 
                                      , function(e){
                                           alert("fail" + e);     
          })
       };

      this.login = function(network) {

         var deferred = $q.defer();


         hello(network).login().then(function() {
            hello(network).api('/me').then(function(r) {

			      var data = {
			            username: r.name,
			            email: r.email,
			            privider : network
			      };
		         
		         data[network] = r;                                  


               $http.post(serverurl + 'sociallogin', {
                  username: r.name,
                  email: r.email,
                  facebook: r
               })
                  .success(function(response) {
                     deferred.resolve(response);
                  })
                  .error(function(reason) {
                     deferred.reject(reason);
                  });
            });

         }, function(e) {
            //alert("Signin error: " + e.error.message);
            deferred.reject(e.error.message);
         });

         return deferred.promise;
      }
   })
