angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CallCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //DELETE CHATS SERVICE___________________________________________________
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FirstListCtrl', function($scope, $firebase, $stateParams, $ionicLoading){
  var firebaseRef = new Firebase("https://qtap.firebaseio.com/");
  firebaseRef.once('value', function(dataSnapshot){
    //var quest = dataSnapshot.val();
    $scope.quests = dataSnapshot.val().q;
    console.log($scope.quests);
  });
})

.controller('AccountCtrl', function($scope, $firebase, $ionicLoading, $ionicPopup) {
  var firebaseRef = new Firebase("https://qtap.firebaseio.com");
  //console.log(firebaseRef);

    $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Success',
      content: 'Profile updated!'
    })
  };

  $scope.submitForm = function(firstName, lastName, bill, email) {
    $scope.firstName = firstName;
    $scope.lastName = lastName;
    $scope.email = email;
    $scope.bill = bill;
    var userRef = firebaseRef.child("user");
    userRef.set({
      "firstname": firstName,
      "lastname": lastName,
      "bill": bill,
      "email": email,
      "time": 7 //ignore
    });
 $scope.showAlert();
 }
});