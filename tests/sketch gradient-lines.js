let colorSets = [];
let concepts = [
  'passive', 'active', 'dull', 'bright',
  'cold', 'warm', 'wet', 'dry',
  'sugary', 'bitter', 'mild', 'acid',
  'silent', 'noisy', 'harsh', 'harmonious'
];
let numSets = 16; // Nombre de concepts disponibles
let displayedSets = 16; // Afficher tous les concepts
let hoveredSet = null;

function setup() {
  createCanvas(2000, 800); // Largeur augmentée pour le défilement horizontal
  generateColorSets();
}

function generateColorSets() {
  let shuffledConcepts = shuffle(concepts); // Mélanger les concepts pour éviter les répétitions
  for (let i = 0; i < numSets; i++) {
    let concept = shuffledConcepts[i];
    let colors = generateColorsForConcept(concept);
    colorSets.push({ concept, colors });
  }
}

function generateColorsForConcept(concept) {
  let colors = [];
  switch (concept) {
    case 'passive':
      colors = [color(200, 200, 255), color(180, 180, 255), color(160, 160, 255), color(140, 140, 255)];
      break;
    case 'active':
      colors = [color(255, 100, 100), color(255, 80, 80), color(255, 60, 60), color(255, 40, 40)];
      break;
    case 'dull':
      colors = [color(100, 100, 100), color(120, 120, 120), color(140, 140, 140), color(160, 160, 160)];
      break;
    case 'bright':
      colors = [color(255, 255, 100), color(255, 255, 80), color(255, 255, 60), color(255, 255, 40)];
      break;
    case 'cold':
      colors = [color(100, 100, 255), color(80, 80, 255), color(60, 60, 255), color(40, 40, 255)];
      break;
    case 'warm':
      colors = [color(255, 150, 100), color(255, 130, 80), color(255, 110, 60), color(255, 90, 40)];
      break;
    case 'wet':
      colors = [color(100, 100, 255), color(80, 80, 255), color(60, 60, 255), color(40, 40, 255)];
      break;
    case 'dry':
      colors = [color(255, 200, 100), color(255, 180, 80), color(255, 160, 60), color(255, 140, 40)];
      break;
    case 'sugary':
      colors = [color(255, 200, 200), color(255, 180, 180), color(255, 160, 160), color(255, 140, 140)];
      break;
    case 'bitter':
      colors = [color(100, 50, 50), color(120, 60, 60), color(140, 70, 70), color(160, 80, 80)];
      break;
    case 'mild':
      colors = [color(200, 200, 150), color(220, 220, 170), color(240, 240, 190), color(255, 255, 210)];
      break;
    case 'acid':
      colors = [color(200, 255, 100), color(180, 255, 80), color(160, 255, 60), color(140, 255, 40)];
      break;
    case 'silent':
      colors = [color(150, 150, 150), color(170, 170, 170), color(190, 190, 190), color(210, 210, 210)];
      break;
    case 'noisy':
      colors = [color(255, 100, 100), color(255, 120, 120), color(255, 140, 140), color(255, 160, 160)];
      break;
    case 'harsh':
      colors = [color(100, 100, 100), color(120, 120, 120), color(140, 140, 140), color(160, 160, 160)];
      break;
    case 'harmonious':
      colors = [color(100, 255, 100), color(120, 255, 120), color(140, 255, 140), color(160, 255, 160)];
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
  let squareSize = w / numColors;

  for (let i = 0; i < numColors; i++) {
    fill(colorSet.colors[i]);
    noStroke();
    rect(x + i * squareSize, y, squareSize, h);
  }

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + w / 2, y + h + 20);
}

function displayHoveredSet(set) {
  // Affichez les détails de l'ensemble survolé
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Concept: ${set.concept}`, 10, 10);
  for (let i = 0; i < set.colors.length; i++) {
    fill(set.colors[i]);
    rect(10, 40 + i * 30, 30, 30);
  }
}