angular.module('hellofacebook', [])
    .constant('serverurl', 'http://localhost:3000/')
    .config(function() {

        var FACEBOOK_CLIENT_ID = "1476555565891036",
            WINDOWS_CLIENT_ID = "",
            GOOGLE_CLIENT_ID = "";

        hello.init({
            facebook: FACEBOOK_CLIENT_ID,
            windows: WINDOWS_CLIENT_ID,
            google: GOOGLE_CLIENT_ID
        }, {
            redirect_uri: 'http://localhost:8888/#/home'
        });

    })
    .service("hellofacebook", function($http, $q, serverurl) {
        this.logout = function() {
            hello("facebook").logout();
        };

        this.login = function() {

            var deferred = $q.defer();

            hello.on('auth.login', function(auth, $q) {
                hello(auth.network).api('/me').then(function(r) {
                    $http.post(serverurl + 'facebooklogin', {
                        username: r.username,
                        name: r.name,
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
            });

            hello("facebook").login().then(function() {}, function(e) {
                alert("Signin error: " + e.error.message);
            });

            return deferred.promise;
        }
    })
