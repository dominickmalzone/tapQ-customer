angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
//trash
.controller('CallCtrl', function($scope) {
//trash
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})//garbage, ignore

.controller('FirstListCtrl', function($scope, $rootScope, $firebase, $stateParams, $ionicLoading){
  var firebaseRef = new Firebase("https://qtap.firebaseio.com/");
  firebaseRef.once('value', function(dataSnapshot){
    //var quest = dataSnapshot.val();
    $scope.quests = dataSnapshot.val().q;
    console.log($scope.quests);
    $rootScope.twilioDigits = '';
    $rootScope.addTwilioDigit = function(digit){
      $rootScope.twilioDigits += digit.toString();
      var userRef = firebaseRef.child("user");
              userRef.update({
                 "time": digit //ignore
              });
    }
  });
})

.controller('SecondListCtrl', function($scope, $rootScope, $firebase, $stateParams, $ionicLoading){
  console.log($stateParams.value);
    console.log("DIGITS: " + $rootScope.twilioDigits);
  var firebaseRef = new Firebase("https://qtap.firebaseio.com/q/8/" + $stateParams.value);
  firebaseRef.once('value', function(dataSnapshot){
    $scope.questions = dataSnapshot.val();
    console.log($scope.questions);
 //firebaseRef.once('value', function(dataSnapshot){
   // var question = dataSnapshot.val();
   // console.log(question);
   //$scope.questions = dataSnapshot.val();
    //console.log($scope.questions);
  });
})

.controller('ConnectCtrl', function($scope,  $stateParams, $firebase, $rootScope, $http) {
   var firebaseRef = new Firebase("https://qtap.firebaseio.com/user");
    firebaseRef.once('value', function(dataSnapshot){

      console.log("FINAL DIGITS: " + $rootScope.twilioDigits);
      $http.get("http://localhost:3000/callAndInput/" + $rootScope.twilioDigits);
      
    


      // reset
      $rootScope.twilioDigits = '';
    $scope.total = dataSnapshot.val();

    $rootScope.bill = dataSnapshot.val().bill;
    console.log($scope.bill);

    $scope.email = dataSnapshot.val().email;
    console.log($scope.email);

    $scope.last = dataSnapshot.val().lastname;
    console.log($scope.last);

    $scope.first = dataSnapshot.val().firstname;
    console.log($scope.first);


  });
})



.controller('AccountCtrl', function($scope, $firebase, $ionicLoading, $ionicPopup) {
  var firebaseRef = new Firebase("https://qtap.firebaseio.com");
  //console.log(firebaseRef);

    $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Success',
      content: 'Profile Updated!'
    })
  };

  $scope.submitForm = function(bill, email, firstName, lastName) {
    $scope.firstName = lastName;
    $scope.lastName = bill;
    $scope.email = firstName;
    $scope.bill = email;
    var userRef = firebaseRef.child("user");
    userRef.set({
      "bill": lastName,
      "email": bill,
      "firstname": email,
      "lastname": firstName
    });
 $scope.showAlert();
 }
});
