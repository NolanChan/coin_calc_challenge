var coin1 = {
  denomination: 25,
  count: 0
};

var coin2 = {
  denomination: 10,
  count: 0
};

var coin3 = {
  denomination: 5,
  count: 0
};

var coin4 = {
  denomination: 1,
  count: 0
};

var sortedCoins = [];

// sort coins largest to smallest to prep for calculating counts
var sortCoins = (arr) => {
  
  return arr.sort(
    function(a, b) {
      return b.denomination - a.denomination;
    }
  );
}

console.log(sortCoins([coin4, coin2, coin3, coin1]));