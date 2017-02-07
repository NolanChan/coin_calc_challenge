angular.module("coinCounter").controller("coinController", function ($scope) {

  $scope.coins = [

    {
      denomination: 25,
      count: 0
    },

    {
      denomination: 10,
      count: 0
    },

    {
      denomination: 5,
      count: 0
    },

    {
      denomination: 1,
      count: 0
    }
  ];

  $scope.inputCents;
  $scope.showCoinInput = false;

  var resetCounts = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      arr[i].count = 0;
    }
  }

  $scope.coinClick = function() {
    $scope.showCoinInput = true;
    resetCounts($scope.coins);
  }

  // sort coins largest to smallest to prep for calculating counts
  var sortCoins = (arr) => {

    return arr.sort(
      function (a, b) {
        return b.denomination - a.denomination;
      }
    );
  }

  var countCoins = (arr, cents) => {
    var quotient;

    for (var i = 0; i < arr.length; i++) {

      quotient = cents / arr[i].denomination;

      if (quotient >= 1) {
        arr[i].count = Math.floor(quotient);
        cents -= (arr[i].count * arr[i].denomination);
      }
    }
    $scope.coins = arr;
  }

  $scope.calculateClick = function () {
    resetCounts($scope.coins);
    $scope.showCoinInput = false;
    
    if (
      !$scope.inputCents === true
      || $scope.inputCents % 1 !== 0
      || $scope.inputCents < 0
    ) {
      alert('Please enter a positive whole number greater than 0.');
    }

    else {
      countCoins(
        sortCoins($scope.coins), $scope.inputCents
        );
    }
  }
});