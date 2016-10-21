// defaults:

var _gamma = 1; // learning constant
var _scale = 1; // scaling of the parameter

// activation function:
function _act(x) {
  return 1.0 / (1.0 + Math.exp(-x));
}

// activation function's derivative:
function _actDer(x) {
  var y = 1.0 + Math.exp(-x);
  return Math.exp(-x) / (y * y);
}

// end of defaults

function Neuron(options) {
  if (!options) {
    options = {};
  }
  this.act = options.act ? options.act : _act;
  this.actDer = options.actDer ? options.actDer : _actDer;
  this.gamma = options.gamma ? options.gamma : _gamma;
  this.scaleVal = options.scale ? options.scale : _scale;

  this.output = 0;
  this.inputs = [];
  this.bias = Math.random() - 0.5;
  this.isStale = false;
}

Neuron.prototype.scale = function(x) {
  return x / this.scale;
}

Neuron.prototype.addInput = function(_neuron, weight) {
  if (!weight) {
    weight = Math.random() - 0.5;
  }
  this.inputs.push({
    n: _neuron,
    w: weight
  });
  this.resetOutput();
};

Neuron.prototype.getOutput = function() {
  if (!this.isStale) {
    return this.output;
  }

  var res = this.bias;
  for (var i = 0; i < this.inputs.length; i++) {
    res += this.inputs[i].n.getOutput() * this.inputs[i].w;
  }

  this.output = this.act(this.scale(res));
  return this.output;
};

Neuron.prototype.setOutput = function(val) {
  this.output = val;
}

Neuron.prototype.resetOutput = function(val) {
  this.output = 0;
  this.isStale = true;
}

// updating weights in current Neuron
Neuron.prototype.updateWeights = function(error) {
  var res = this.gamma * error * this.actDer(this.scale(this.getOutput()));
  for (var i = 0; i < this.inputs.length; i++) {
    this.inputs[i].w += this.inputs[i].n.getOutput() * res;
  }
  this.bias += parseFloat(this.gamma * error);
  this.resetOutput();
}

module.exports = Neuron;
