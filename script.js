// this is a lot of spagetti code, do NOT use this for reference
console.clear();
const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

let weight = 1;
let bias = 0;
let dataset = [];
let mousePos = { x: -100, y: -100 };
let networkCost = 0;
let playing = false;


setInterval(render, 100);


function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5
  ctx.lineCap = 'round';
  drawLineWithSlope(weight, bias);

  for (const point of dataset) {
    fillCenteredRect(point[0], point[1], 10, 10);
  }

  fillCenteredRect(mousePos.x, mousePos.y, 10, 10);

  

  ctx.font = '20px sans-serif'
  ctx.fillText(`Cost: ${networkCost}`, 10, 20);
  if (dataset.length > 0 && playing) {
    let regression = regress(weight, bias);
    weight = regression.w;
    bias = regression.b;
    networkCost = cost(weight, bias, dataset);
  }
}

function drawLineWithSlope(w, b) {
  drawLine(
    0, calculate_output(w, b, 0),
    canvas.width, calculate_output(w, b, canvas.width)
  );
}

function calculate_output(w, b, x) {
  return (w * x) + b;
}

function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function fillCenteredRect(x, y, height, width) {
  ctx.fillRect(x - (width / 2), y - (height / 2), width, height);
}


document.onmousemove = function (event) {
  const rect = canvas.getBoundingClientRect();
  mousePos = {
    x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
  render();
}

canvas.onclick = (event) => {
  if (event.button !== 0) return;
  dataset.push([mousePos.x, mousePos.y]);
  networkCost = cost(weight, bias, dataset);
}

function createButton(name, onclick) {
  const button = document.createElement('button');
  button.innerText = name;
  button.onclick = onclick;
  document.body.appendChild(button);
}

function lineBreak() {
  document.body.appendChild(document.createElement('br'));
}

function createInput(name, value, step, callback) {
  const input = document.createElement('input');
  input.type = 'number';
  input.step = step;
  input.value = 0;
  input.value = value;
  input.style.width = '50px';

  input.oninput = () => callback(input.value);

  const label = document.createElement('label');
  label.innerText = name + ': ';
  label.appendChild(input);
  document.body.appendChild(label);
}

lineBreak();

createButton('Clear/Reset', () => {
  dataset = [];
  weight = 0;
  bias = 0;
  networkCost = 0;
})
createButton('Undo', () => {
  dataset.pop();
  networkCost = cost(weight, bias, dataset);
})
createButton('Load dataset', () => {
  dataset = [...loadedDataset];

})
createButton('Play', function(event){
  playing = !playing;
  event.target.innerText = playing ? 'Pause' : 'Play';
})

lineBreak();

// createInput('Weight', weight, 0.1, (value) => {
//   weight = Number(value);
// });
// createInput('Bias', bias, 1, (value) => {
//   bias = Number(value);
// });

