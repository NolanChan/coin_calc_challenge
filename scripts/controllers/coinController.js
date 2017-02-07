angular.module("coinCounter").controller("coinController", function ($scope) {

  $scope.coin1 = {
    denomination: 25,
    count: 0
  };

  $scope.coin2 = {
    denomination: 10,
    count: 0
  };

  $scope.coin3 = {
    denomination: 5,
    count: 0
  };

  $scope.coin4 = {
    denomination: 1,
    count: 0
  };

  $scope.inputCents;

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
  }

  $scope.calculateClick = function () {
    if (
      !$scope.inputCents === true
      || $scope.inputCents % 1 !== 0
      || $scope.inputCents < 0
    ) {
      alert('Please enter a positive whole number greater than 0.');
    }

    else {
      countCoins(
        sortCoins([$scope.coin1, $scope.coin2, $scope.coin3, $scope.coin4]), $scope.inputCents
        );
      console.log($scope.coin1, $scope.coin2, $scope.coin3, $scope.coin4);
    }
  }
});