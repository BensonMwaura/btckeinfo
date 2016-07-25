'use strict';

btckeinfo.directive('aboutDirective', function(){
    return{
      templateUrl: 'assets/tmpl/about.html',
      controller: 'aboutController'
    }
});
btckeinfo.directive('footerDirective', function(){
    return{
      templateUrl: 'assets/tmpl/footer.html',
      controller: 'footerController'
    }
});
btckeinfo.directive('navDirective', function(){
    return{
      templateUrl: 'assets/tmpl/nav.html',
      controller: 'navController'
    }
});
