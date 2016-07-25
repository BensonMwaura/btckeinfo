/**
 *  Bitcoinkenya.info -   Kenya's Bitcoin & Cryptocurrency Portal
 *  @name        Bitcoinkenya.info
 *  @version      v0.0.1
 *  @copyright    Copyright ( c ) 2016-2019
 *  @license      Creative Commons Attribution 3.0 Unported
 */
//assets/app/btckenya.js
var btckeinfo = angular.module('btckeinfo', ['ngRoute']);
    btckeinfo.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode({enable: true});
      $routeProvider.when('/', { templateUrl: 'assets/partials/desk/welcome.html', controller: 'feedController'})
                    .when('/News', { templateUrl: 'assets/partials/news/news.html', controller: 'newsController'})
                    .when('/News/:id', { templateUrl: 'assets/partials/news/news-details.html', controller: 'newsDetailController'})
                    .when('/Blogs', { templateUrl: 'assets/partials/blogs/blogs.html', controller: 'blogsController'})
                    .when('/Blogs/:id', { templateUrl: 'assets/partials/blogs/blog-details.html', controller: 'blogDetailController'})
                    .when('/WhatsBTC', { templateUrl: 'assets/partials/whatsBTC/whatsBTC.html'})
                    .when('/Mining', { templateUrl: 'assets/partials/mining/WhatsMining.html'})
                    .when('/Wallets', { templateUrl: 'assets/partials/wallets/WhatsWallet.html'})
                    .when('/InvestBTC', { templateUrl: 'assets/partials/invest/WhatsInvestBTC.html'})
                    .when('/TradeBTC', { templateUrl: 'assets/partials/trade/WhatsTradeBTC.html'})
                    .when('/RegulationBTC', { templateUrl: 'assets/partials/regulate/WhatsRegulationBTC.html'})
                    .when('/Login', { templateUrl: 'assets/partials/desk/login.html', controller: 'loginController'})
                    .when('/Contact', { templateUrl: 'assets/partials/desk/contact.html', controller: 'contactController'})
                    .when('/Dashboard', {templateUrl: 'assets/partials/dashboard/dashboard.html', controller: 'dashController', authenticated: true})
                    .otherwise({redirectTo: '/'});
    }]);

    btckeinfo.run(["$rootScope", "$location", "loginService", function($rootScope, $location, loginService){
      var routePermission = ['/Dashboard'];
      $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated && routePermission){
          var connected = loginService.isLogged();
              connected.then(function(response){
                  if(!response.data){
                    $location.path('/Login');
                  }
              });
        }
      });
    }]);
