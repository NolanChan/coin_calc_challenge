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

  /*
  Realized this calculation does not work for certain test cases, e.g., when using the largest denomination coin results in a higher total coint of coins than not using the largest denomination coin.
  */
  // var countCoins = (arr, cents) => {
  //   var quotient;

  //   for (var i = 0; i < arr.length; i++) {

  //     quotient = cents / arr[i].denomination;

  //     if (quotient >= 1) {
  //       arr[i].count = Math.floor(quotient);
  //       cents -= (arr[i].count * arr[i].denomination);
  //     }
  //   }
  //   $scope.coins = arr;
  // }

  var countCoins = (arr, cents) => {
    // We're going to be building up an array of solutions for every amount <= cents.
    // Because we'll be using the previous solutions to build up to the next solution,
    // we're guaranteed to never repeat unecessary calculations

    // Solutions is an array of tuples made up of: 
    //  (coin that leads to next optimal coin, # of coins needed for this amount)
    // Example: 
    //  Given arr = [1,2,5] and cents = 7,
    //  Solutions[6] = (1, 2)
    //  In the first index, 1 is the answer because 6 - 1 leads to the next optimal coin, 5
    //  In the second index, 2 is the answer because it takes two coins (1 + 5) to make 6
    coinArr = arr.map((i) => i.denomination);
    var solutions = [];
    solutions[0] = [0,0];

    // Solve countCoins for each amount from 1 ... cents
    for (i = 1; i < cents + 1; i++){
      solutions = countCoinsDynamic(coinArr, i, solutions);
    }

    var answerList = [];
    while (cents !== 0){
      answerList.push(solutions[cents][0]);
      cents = cents - solutions[cents][0];
    }

    // sloppily transform answerList into arr object
    for (var coin of arr) {
      coin.count = answerList.filter(i => coin.denomination == i).length;
    }
    $scope.coins = arr;
  };

  var countCoinsDynamic = (coinArr, cents, solutions) => {
    if (coinArr.indexOf(cents) >= 0){
      solutions[cents] = [cents, 1];
      return solutions;
    }

    // first element in lowestCombo is coin placeholder, 
    // second element is lowest amount of coins it takes to construct
    lowestCombo = [0, cents];
    filteredCoins = coinArr.filter((i) => i < cents);

    // try every variation of subtracting all possible coins in coinArr from cents
    // this sh
    for (var coin of filteredCoins){
      if (solutions[cents - coin][1] < lowestCombo[1])
        lowestCombo = [coin, solutions[cents - coin][1]];
    }
    solutions[cents] = lowestCombo;
    return solutions;
  };

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