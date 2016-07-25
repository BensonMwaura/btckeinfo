'use strict';

// about data controller
btckeinfo.controller('aboutController', ["$scope", "btcService", function($scope, btcService){
  $scope.btcPrice = btcService.getPrice();
}]);
// footer data controller
btckeinfo.controller('footerController', ["$scope", "btcService", "detailService",
  function($scope, btcService, detailService){
    $scope.btcPrice = btcService.getPrice();
    console.log($scope.btcPrice);
    $scope.currYear = detailService.getCurrentTime();
}]);
// contact data controller
btckeinfo.controller('contactController', ["$scope", "$http", "detailService", function($scope, $http, detailService){
  $scope.alertMsg = false;
  $scope.message = "";
  $scope.contact = {
    name : undefined,
    email : undefined,
    subject : undefined,
    message : undefined
  };
  $scope.sendContact = function(){
    var timeSent =  detailService.getCurrentTime().timeStamp;
    $scope.timeStamp = timeSent;
    var data = {
      name : $scope.contact.name,
      email : $scope.contact.email,
      subject : $scope.contact.subject,
      message : $scope.contact.message,
      timeSent : $scope.timeStamp
    };
    $http.post('assets/data/mail.php', data).success(function(response){
      console.log(response);
      $scope.alertMsg = true;
      $scope.message = response;
      $scope.contact = {};
    }).error(function(error){
      console.error(error);
    });
  };
}]);
// navigation controller
btckeinfo.controller('navController', ["$scope", "loginService", "$location", function($scope, loginService, $location){
  $scope.loggedStatus = false;
  $scope.islogged = function(){
    var connect = loginService.isLogged();
        connect.then(function(status){
          if(status.data){
            $scope.loggedStatus = true;
          }
        });
  };
  $scope.islogged();
  $scope.logout = function(){
    loginService.logout($scope);
  };
}]);
// login controller
btckeinfo.controller('loginController', ["$scope", "loginService", "$location", function($scope, loginService, $location){
  $scope.alertMsg = false;
  $scope.message = "";
  $scope.loginUser = function(user){
    loginService.login(user,$scope);
  };
  $scope.checkUser = function(){
    var connected = loginService.isLogged();
        connected.then(function(response){
            if(response.data){
              $location.path('/Dashboard');
            }
        });
  };
  $scope.checkUser();
}]);
// dashboard controller
btckeinfo.controller('dashController', ["$scope", "dashService", "detailService", function($scope, dashService, detailService, $location){
  $scope.txt = "Welcome";
  var currPost = detailService.getCurrentTime().curr;
  $scope.postedAt = currPost;
  $scope.article = {
    title: undefined,
    desc: undefined
  };
  $scope.postEditor = function(article){
    article.date_posted = $scope.postedAt;
    dashService.postArticle(article);
    $scope.article = {};
  };
  $scope.cancel = function(){
    $scope.article = {};
  };
}]);
// all data feed controller
btckeinfo.controller('feedController', ["$http", "$scope", function($http, $scope){
  var url = 'assets/data/getAllFeeds.php';
  $http.get(url).success(function(response){
    console.log('>>Feeds: News & Blog Lists loaded.');
    $scope.data = response;
  });
}]);
// news data controller
btckeinfo.controller('newsController', ["$http", "$scope", function($http, $scope){
    $http.get("assets/data/getNews.php").then(function(response){
      console.log('>>News: List loaded');
      $scope.newsData = response.data;
    });
}]);
// news detail data controller
btckeinfo.controller('newsDetailController', ["$http","$scope","$routeParams","detailService",
  function($http, $scope, $routeParams, detailService){
    $http({url:"assets/data/getNews.php", params:{id:$routeParams.id}, method:"get"}).then(function(response){
      console.log('>>News: List details loaded');
      $scope.newsData = response.data;
      $scope.whichItem = $routeParams.id.slice(1);
      var news = $scope.newsData,
          newsId = $scope.whichItem;
      $scope.newsDetail = detailService.getById(news, newsId);
    });
}]);
// blogs articles data controller
btckeinfo.controller('blogsController', ["$http", "$scope",function($http, $scope){
    $http.get("assets/data/getArticles.php").then(function(response){
      console.log('>>Blogs: List loaded');
      $scope.blogData = response.data;
    });
}]);
// blog article details data controller
btckeinfo.controller('blogDetailController', ["$http","$scope","$routeParams","detailService",
  function($http, $scope, $routeParams, detailService){
    $http({url:"assets/data/getArticles.php", params:{id:$routeParams.id}, method:"get"}).then(function(response){
      console.log('>>Blogs: List details loaded');
      $scope.blogData = response.data;
      $scope.whichBlog = $routeParams.id.slice(1);
      var blogs = $scope.blogData, blogId = $scope.whichBlog;
      $scope.blogsDetail = detailService.getById(blogs, blogId);
    });
}]);
