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

let conceptColors = {
  'passive': ['#B0C4DE', '#ADD8E6', '#87CEFA', '#4682B4'],
  'active': ['#FF4500', '#FF6347', '#FF7F50', '#FF8C00'],
  'dull': ['#696969', '#808080', '#A9A9A9', '#C0C0C0'],
  'bright': ['#FFFF00', '#FFD700', '#FFA500', '#FF4500'],
  'cold': ['#00FFFF', '#4682B4', '#5F9EA0', '#6495ED'],
  'warm': ['#FF6347', '#FF4500', '#FF8C00', '#FFD700'],
  'wet': ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0'],
  'dry': ['#DEB887', '#D2B48C', '#F4A460', '#DAA520'],
  'sugary': ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493'],
  'bitter': ['#8B4513', '#A0522D', '#D2691E', '#CD853F'],
  'mild': ['#F5DEB3', '#FFE4B5', '#FFDAB9', '#EEE8AA'],
  'acid': ['#7FFF00', '#ADFF2F', '#32CD32', '#00FF00'],
  'silent': ['#708090', '#778899', '#B0C4DE', '#D3D3D3'],
  'noisy': ['#FF0000', '#FF4500', '#FF6347', '#FF7F50'],
  'harsh': ['#8B0000', '#A52A2A', '#B22222', '#DC143C'],
  'harmonious': ['#6A5ACD', '#7B68EE', '#9370DB', '#8A2BE2']
};

function setup() {
  createCanvas(2000, 800); // Largeur augmentée pour le défilement horizontal
  generateColorSets();
}

function generateColorSets() {
  let shuffledConcepts = shuffle(concepts); // Mélanger les concepts pour éviter les répétitions
  for (let i = 0; i < numSets; i++) {
    let concept = shuffledConcepts[i];
    let colors = conceptColors[concept];
    let squares = [];
    for (let j = 0; j < colors.length; j++) {
      let size = random(50, 100);
      squares.push({ color: colors[j], size });
    }
    colorSets.push({ concept, squares });
  }
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
  for (let i = 0; i < colorSet.squares.length; i++) {
    let square = colorSet.squares[i];
    fill(square.color);
    noStroke();
    let offsetX = random(0, w - square.size);
    let offsetY = random(0, h - square.size);
    rect(x + offsetX, y + offsetY, square.size, square.size);
  }

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + w / 2, y + h / 2);
}

function displayHoveredSet(colorSet) {
  let setWidth = width / 2;
  let setHeight = height / 2;
  let x = width / 4;
  let y = height / 4;

  fill(255, 255, 255, 200);
  noStroke();
  rect(x, y, setWidth, setHeight);

  for (let i = 0; i < colorSet.squares.length; i++) {
    let square = colorSet.squares[i];
    fill(square.color);
    noStroke();
    let offsetX = random(0, setWidth - square.size);
    let offsetY = random(0, setHeight - square.size);
    rect(x + offsetX, y + offsetY, square.size, square.size);
  }

  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + setWidth / 2, y + setHeight / 2);
}

// function mousePressed() {
//   if (hoveredSet) {
//     let colors = hoveredSet.colors;
//     for (let i = 0; i < colors.length; i++) {
//       colors[i] = color(random(255), random(255), random(255));
//     }
//   }
// }