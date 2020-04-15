//DATA STORAGE
var data;

//GRADIENT REGRESSION
var lrSlider;
var b = 0;
var m = 0;

//CANVAS SETUP
function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('#canvascontainer');
    canvas.mousePressed(addPoints);
    lrSlider = select('#lrslider');
  
    // Data will be entered by user clicking
    data = [];
}

//ALGORITHM
function calculateError() {
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    var guess = m * data[i].x + b;
    var error = guess - data[i].y;
    sum += error * error;
  }

  var avg = sum / data.length;
  return avg;
}

//UPDATE CANVAS W/ NEW POINTS
function addPoints() {
  data.push(createVector(mouseX / width, mouseY / height));
}
function submitPoints(xVal, yVal) {
    data.push(createVector(xVal / width, yVal / height));
    console.log('X-Val ' + xVal + '\nY-Val ' + yVal);
}

//CANVAS DISPLAY
function draw() {
    var learning_rate = lrSlider.value();
    select('#lr').html(learning_rate);
    background(200);

    var error = calculateError();

    drawPoints();
    drawLine();

    //GRADIENT REGRESSION
    var deltaB = 0;
    var deltaM = 0;
    for (var i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
        var yguess = m * x + b;
        var error = y - yguess;
        deltaB += (2 / data.length) * error;
        deltaM += (2 / data.length) * x * error;
    }
    b += (deltaB * learning_rate);
    m += (deltaM * learning_rate);

}

//UPDATE LINE POSITION & SLOPE
function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  stroke(255);
  strokeWeight(2);
  line(x1 * width, y1 * height, x2 * width, y2 * height);
}

//UPDATE DATA POINTS
function drawPoints() {
  fill(0);
  stroke(255);
  for (var i = 0; i < data.length; i++) {
    ellipse(data[i].x * width, data[i].y * height, 8, 8);
  }
}
