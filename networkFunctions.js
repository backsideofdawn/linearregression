function cost(w, b, data) {
  if (data.length < 1) return 0;
  let cost = 0;
  for (let i = 0; i < data.length; i++) {
    cost += (calculate_output(w, b, data[i][0]) - data[i][1]) ** 2;
  }
  cost /= 2 * data.length;
  return cost;
}
const smallNumber = 0.00000001


function weightDerivative(w, b) {
  let derivative = 0;
  for (let i = 0; i < dataset.length; i++) {
    derivative += (calculate_output(w, b, dataset[i][0]) - dataset[i][1]) * dataset[i][0];
  }
  derivative /= dataset.length;
  return derivative;
}

function biasDerivative(w, b) {
  let derivative = 0;
  for (let i = 0; i < dataset.length; i++) {
    derivative += (calculate_output(w, b, dataset[i][0]) - dataset[i][1]);
  }
  derivative /= dataset.length;
  return derivative;
}
const learningRate = 0.00001;

function regress(w, b) {
  let tmpw = w;
  let tmpb = b;
  tmpw -= weightDerivative(w, b) * learningRate;
  tmpb -= biasDerivative(w, b) * learningRate * 100000;
  w = tmpw;
  b = tmpb;
  return {w, b}
}