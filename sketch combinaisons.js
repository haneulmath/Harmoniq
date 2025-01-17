let colorSets = [];
let concepts = [
  'passive', 'active', 'dull', 'bright',
  'cold', 'warm', 'wet', 'dry',
  'sugary', 'bitter', 'mild', 'acid',
  'silent', 'noisy', 'harsh', 'harmonious'
];
let numSets = 20; // 20 combinaisons de concepts
let displayedSets = 20; // Afficher 20 combinaisons à la fois
let hoveredSet = null;

function setup() {
  createCanvas(2000, 800); // Largeur augmentée pour le défilement horizontal
  generateColorSets();
}

function generateColorSets() {
  let combinations = [];
  while (combinations.length < numSets) {
    let concept1 = random(concepts);
    let concept2 = random(concepts);
    if (concept1 !== concept2) {
      combinations.push([concept1, concept2]);
    }
  }
  for (let i = 0; i < numSets; i++) {
    let [concept1, concept2] = combinations[i];
    let colors = generateColorsForConcepts(concept1, concept2);
    colorSets.push({ concept: `${concept1} + ${concept2}`, colors });
  }
}

function generateColorsForConcepts(concept1, concept2) {
  let colors1 = generateColorsForConcept(concept1);
  let colors2 = generateColorsForConcept(concept2);
  let colors = [];
  for (let i = 0; i < 4; i++) {
    let r = lerp(red(colors1[i]), red(colors2[i]), 0.5);
    let g = lerp(green(colors1[i]), green(colors2[i]), 0.5);
    let b = lerp(blue(colors1[i]), blue(colors2[i]), 0.5);
    colors.push(color(r, g, b));
  }
  return colors;
}

function generateColorsForConcept(concept) {
  let colors = [];
  switch (concept) {
    case 'passive':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(180, 220), random(180, 220), random(255)));
      }
      break;
    case 'active':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(255), random(40, 100), random(40, 100)));
      }
      break;
    case 'dull':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(100, 160), random(100, 160), random(100, 160)));
      }
      break;
    case 'bright':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, 255, random(40, 100)));
      }
      break;
    case 'cold':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(40, 100), random(40, 100), 255));
      }
      break;
    case 'warm':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(90, 150), random(40, 100)));
      }
      break;
    case 'wet':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(40, 100), random(40, 100), 255));
      }
      break;
    case 'dry':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(140, 200), random(40, 100)));
      }
      break;
    case 'sugary':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(140, 200), random(140, 200)));
      }
      break;
    case 'bitter':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(100, 160), random(50, 80), random(50, 80)));
      }
      break;
    case 'mild':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(200, 255), random(200, 255), random(150, 210)));
      }
      break;
    case 'acid':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(140, 200), 255, random(40, 100)));
      }
      break;
    case 'silent':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(150, 210), random(150, 210), random(150, 210)));
      }
      break;
    case 'noisy':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(100, 160), random(100, 160)));
      }
      break;
    case 'harsh':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(100, 160), random(100, 160), random(100, 160)));
      }
      break;
    case 'harmonious':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(100, 160), 255, random(100, 160)));
      }
      break;
    default:
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(255), random(255), random(255)));
      }
  }
  return colors;
}

function draw() {
  background(255);
  let margin = 50;
  let setWidth = (width - 2 * margin) / displayedSets;
  let setHeight = height - 2 * margin;
  hoveredSet = null;

  for (let i = 0; i < displayedSets; i++) {
    let x = margin + i * setWidth;
    let y = margin;
    if (mouseX > x && mouseX < x + setWidth && mouseY > y && mouseY < y + setHeight) {
      hoveredSet = colorSets[i];
    }
    drawColorSet(x, y, setWidth, setHeight, colorSets[i]);
  }

  if (hoveredSet) {
    displayHoveredSet(hoveredSet);
  }
}

function drawColorSet(x, y, w, h, colorSet) {
  let numColors = colorSet.colors.length;
  let squareSize = min(w, h);

  for (let i = 0; i < numColors; i++) {
    fill(colorSet.colors[i]);
    noStroke();
    let offset = i * squareSize / (numColors * 2);
    rect(x + offset, y + offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + w / 2, y + h + 20);
}

function displayHoveredSet(colorSet) {
  let setWidth = width / 2;
  let setHeight = height / 2;
  let x = width / 4;
  let y = height / 4;

  fill(255, 255, 255, 200);
  noStroke();
  rect(x, y, setWidth, setHeight);

  let numColors = colorSet.colors.length;
  let squareSize = min(setWidth, setHeight);

  for (let i = 0; i < numColors; i++) {
    fill(colorSet.colors[i]);
    noStroke();
    let offset = i * squareSize / (numColors * 2);
    rect(x + offset, y + offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + setWidth / 2, y + setHeight / 2);
}