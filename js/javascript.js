angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards2'])


.config(function($stateProvider, $urlRouterProvider) {

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, TDCardDelegate, $timeout) {

  var cardTypes = [
    { image: 'img/1.png' },
    { image: 'img/2.png' },
    { image: 'img/3.png' },
    { image: 'img/4.png' },
    { image: 'img/5.png' },
    { image: 'img/6.png' },
    { image: 'img/7.png' },
    { image: 'img/8.png' },
    { image: 'img/10.png' },
    { image: 'img/toocute.JPG' }
  ];



  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    discards: [],
    liked: [],
    disliked: []
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
  };

})

.controller('CardCtrl', function($scope, TDCardDelegate) {

});
