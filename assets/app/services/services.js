'use strict';

//detail service
btckeinfo.service('detailService', [function(){
  var self = this,
      today = {};
      self.getById = function (arr, id){
        for(var i = 0, len = arr.length; i < len; i++){
          if(arr[i].id === id){
              return arr[i];
          }
        }
      };
      self.getCurrentTime = function(){
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
            days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'],
            current = new Date(),
            year = current.getFullYear(),
            month = months[current.getMonth()],
            cMonth = current.getMonth()+1,
            day = days[current.getDay()],
            date = current.getDate(),
            hour = current.getHours(),
            min = current.getMinutes(),
            sec = current.getSeconds();
            if(cMonth.toString().length == 1){
        			cMonth = "0" + cMonth;
        		}
        		if(date.toString().length == 1){
        			date = "0" + date;
        		}
        		if(hour.toString().length == 1){
        			hour = "0" + hour;
        		}
        		if(min.toString().length == 1){
        			min = "0" + min;
        		}
        		if(sec.toString().length == 1){
        			sec = "0" + sec;
        		}
        today.year = year;
        today.curr = year+"-"+cMonth+"-"+date+" "+hour+":"+min+":"+sec;
        today.timeStamp = 'sent at: ' +hour+ ':' +min+ ':' +sec+ ' ~ on : ' +date+ ' | ' +month+ ' | ' +year;
        return today;
      };
}]);
// Bitcoin service
btckeinfo.service('btcService', ["$http", function($http){
  var self = this,
      service = {};
      self.getPrice = function(){
        $http.get('assets/data/getBTCPrice.php').success(function(response){
            service.price = response;
        });
        return service;
      };
}]);
// Session Service
btckeinfo.factory('sessionService', ["$http", function($http){
  return {
    set: function(key,value){
      return sessionStorage.setItem(key,value);
    },
    get: function(key){
      return sessionStorage.getItem(key);
    },
    destroy: function(key){
      $http.post('assets/data/destroySession.php');
      return sessionStorage.removeItem(key);
    }
  }
}]);
// Login Service
btckeinfo.factory('loginService', ["$http", "$location", "sessionService", function($http, $location, sessionService){
  return {
    login: function(user,scope){
        $http.post('assets/data/login.php', user).then(function(response){
          var msg = response.data;
          if(msg !== "Error"){
            console.log(">>Login : Access Token Granted");
            var uid = msg;
            $location.path('/Dashboard');
            sessionService.set('accessToken',uid);
          }else{
            console.log("Failed Login");
            $location.path('/Login');
            scope.alertMsg = true;
            scope.message = "Incorrect information : Please refresh the page to try again.";
            scope.user = {};
          }
        });
      },
      logout: function(scope){
        sessionService.destroy('accessToken');
        console.log(">>Status : Logged Out");
        $location.path('/Welcome');
        scope.loggedStatus = false;
      },
      isLogged: function(){
        var $checkSessionServer = $http.post('assets/data/checkSession.php');
        return $checkSessionServer;
      }
    };
}]);
// dashboard service
btckeinfo.factory('dashService', ["$http", function($http){
  return {
    postArticle: function(article){
      $http.post('assets/data/postArticle.php', article);
    }
  }
}]);
