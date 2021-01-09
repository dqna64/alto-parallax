let time;
let nextInt;
let LayerColors = [];
let skyGradients = [];
let indexColor1;
let indexColor2;
let loopBool;
let layer1;
let layer2;
let layer3;
let layer4;
let layer1Vel;
let layer2Vel;
let layer3Vel;
let layer4Vel;


function preload() {
  layer1 = loadImage('assets/layer-1-1.png');
  layer2 = loadImage('assets/layer-2-1.png');
  layer3 = loadImage('assets/layer-3-1.png');
  layer4 = loadImage('assets/layer-4-1.png');
}

function setup() {
  createCanvas(880, 495);
  // colorMode(HSB, 360, 100, 100, 100);
  colorMode(RGB, 255, 255, 255, 255);

  time = 0;
  nextInt = 1;

  layer1Vel = 20;
  layer2Vel = 40;
  layer3Vel = 80;
  layer4Vel = 400;

  // LayerColors.push(color(27, 69, 100));
  // LayerColors.push(color(221, 69, 100));
  LayerColors.push(color(255, 193, 79));
  LayerColors.push(color(79, 135, 255));
  LayerColors.push(color(255, 79, 120));
  indexColor1 = 0;
  indexColor2 = 1;

  // c1, c2, layer tint
  skyGradients.push([color(0, 6, 23), color(26, 60, 105), color(14, 30, 125)]); // Midnight
  skyGradients.push([color(41, 45, 107), color(237, 144, 45), color(242, 166, 99)]); // Evening & sunset
  skyGradients.push([color(143, 229, 255), color(255, 221, 173), color(182, 239, 242)]); // Daytime
  skyGradients.push([color(41, 45, 107), color(237, 144, 45), color(242, 166, 99)]); // Evening & sunset
  indSkyGradient1 = 0;
  indSkyGradient2 = 1;
}

function draw() {
  background(20);

  // Changing colours
  if (time >= nextInt) {
    indexColor1 = (indexColor1+1)%LayerColors.length;
    indexColor2 = (indexColor2+1)%LayerColors.length;
    indSkyGradient1 = (indSkyGradient1+1)%skyGradients.length;
    indSkyGradient2 = (indSkyGradient2+1)%skyGradients.length;
    nextInt += 1;
  }

  // Sky
  setGradient(0, 0, width, height/2, skyGradients[indSkyGradient1][0], skyGradients[indSkyGradient1][1], skyGradients[indSkyGradient2][0], skyGradients[indSkyGradient2][1], time%1, 'Y_AXIS');

  // Layer 1
  noStroke();
  tint(lerpColor(lerpColor(LayerColors[indexColor1], LayerColors[indexColor2], time%1), lerpColor(skyGradients[indSkyGradient1][2], skyGradients[indSkyGradient2][2], time%1), 0.5));
  image(layer1, -(time*layer1Vel)%layer1.width, height-layer1.height);
  image(layer1, layer1.width-(time*layer1Vel)%layer1.width, height-layer1.height); // followUp

  // Layer 2
  noStroke();
  tint(lerpColor(lerpColor(LayerColors[indexColor1], LayerColors[indexColor2], time%1), lerpColor(skyGradients[indSkyGradient1][2], skyGradients[indSkyGradient2][2], time%1), 0.5));
  image(layer2, -(time*layer2Vel)%layer2.width, height-layer2.height);
  image(layer2, layer2.width-(time*layer2Vel)%layer2.width, height-layer2.height); // followUp

  // Layer 3
  noStroke();
  tint(lerpColor(lerpColor(LayerColors[indexColor1], LayerColors[indexColor2], time%1), lerpColor(skyGradients[indSkyGradient1][2], skyGradients[indSkyGradient2][2], time%1), 0.5));
  image(layer3, -(time*layer3Vel)%layer3.width, height-layer3.height);
  image(layer3, layer3.width-(time*layer3Vel)%layer3.width, height-layer3.height); // followUp

  // Layer 4
  noStroke();
  tint(lerpColor(lerpColor(LayerColors[indexColor1], LayerColors[indexColor2], time%1), lerpColor(skyGradients[indSkyGradient1][2], skyGradients[indSkyGradient2][2], time%1), 0.5));
  image(layer4, -(time*layer4Vel)%layer4.width, height-layer4.height);
  image(layer4, layer4.width-(time*layer4Vel)%layer4.width, height-layer4.height); //followUp

  time += 0.01;
  console.log()
}

loopBool = true;
function keyPressed() {
  if (key == " ") {
    if (loopBool) {
      noLoop();
      loopBool = !loopBool;
    } else {
      loop();
      loopBool = !loopBool;
    }
  }
}

function setGradient(x, y, w, h, c1, c2, transitionc1, transitionc2, time, axis) {
  noFill();

  if (axis === 'Y_AXIS') {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let transitionColor = lerpColor(transitionc1, transitionc2, inter);
      let c = lerpColor(lerpColor(c1, c2, inter), transitionColor, time);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === 'X_AXIS') {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let transitionColor = lerpColor(transitionc1, transitionc2, inter);
      let c = lerpColor(lerpColor(c1, c2, inter), transitionColor, time);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
