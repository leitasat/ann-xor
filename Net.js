var Neuron = require('./Neuron.js');

function Network(options) {
  this.nodeOptions = options ? options : {};
  this.sensors =[];
  this.nodes = [];
  this.output = new Neuron(this.nodeOptions);
  this.numberSensors = 0;
  this.numberNodes = 0;
}

Network.prototype.init = function(numberSensors, numberNodes) {
  for (var i = 0; i < numberSensors; i++) {
    var s = new Neuron;
    this.sensors.push(s);
  }
  for (var i = 0; i < numberNodes; i++) {
    var n = new Neuron(this.nodeOptions);
    this.nodes.push(n);
  }
  this.numberSensors = numberSensors;
  this.numberNodes = numberNodes;
  this.setConnections();
}

Network.prototype.setConnections = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    var n = this.nodes[i];
    for (var j = 0; j < this.sensors.length; j++) {
      var s = this.sensors[j];
      n.addInput(s);
    }
    this.output.addInput(n);
  }
}

Network.prototype.setSensors = function(inputs) {
  if (this.sensors.length !== inputs.length) {
    throw "Number of inputs does nor coinside with number of sensors";
  }
  for (var i = 0; i < inputs.length; i++) {
    this.sensors[i].setOutput(inputs[i]);
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].resetOutput();
  }
  this.output.resetOutput();
}

// trainig via backpropagation
Network.prototype.train = function(inputs, answer) {
  this.setSensors(inputs);
  var output = this.output.getOutput();
  var error = parseFloat(answer - output);

  this.output.updateWeights(error);
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].updateWeights(error * this.output.inputs[i].w);
  }
}

Network.prototype.test = function(inputs) {
  this.setSensors(inputs);
  return (this.output.getOutput()).toFixed(2);
}

module.exports = Network;
