var Network = require('./Net.js');

var net = new Network({
  scale: 1, // scaling
  gamma: 1  // learning constant
  // act: (x) => x // custom activation function
  // actDer: (x) => 1 // derivative of custom activation function
});

net.init(2, 3);

function test() {
  return net.test([0, 0]) + ' ' +
    net.test([0, 1]) + ' ' +
    net.test([1, 0]) + ' ' +
    net.test([1, 1]);
}

console.log(test()); // Test with initial random weights

for (var i = 0; i < 1000000; i++) {
  net.train([0, 0], 0);
  net.train([0, 1], 1);
  net.train([1, 0], 1);
  net.train([1, 1], 0);
}

console.log(test()); // Test with learned weights
