let colorSets = [];
let concepts = [
  'passive', 'active', 'dull', 'bright',
  'cold', 'warm', 'wet', 'dry',
  'sugary', 'bitter', 'mild', 'acid',
  'silent', 'noisy', 'harsh', 'harmonious'
];
let displayedSets = 240; // Afficher 240 combinaisons à la fois
let hoveredSet = null;

function setup() {
  createCanvas(6000, 800); // Largeur augmentée pour afficher toutes les combinaisons horizontalement
  generateColorSets();
  saveColorSetsAsImages();
}

function generateColorSets() {
  for (let i = 0; i < concepts.length; i++) {
    for (let j = 0; j < concepts.length; j++) {
      if (i !== j) {
        let concept1 = concepts[i];
        let concept2 = concepts[j];
        let colors = generateColorsForConcepts(concept1, concept2);
        colorSets.push({ concept: `${concept1} + ${concept2}`, colors });
      }
    }
  }
}

function generateColorsForConcepts(concept1, concept2) {
  let colors1 = generateColorsForConcept(concept1);
  let colors2 = generateColorsForConcept(concept2);
  let colors = [];
  for (let i = 0; i < 4; i++) {
    let r = lerp(red(colors1[i]), red(colors2[i]), random(0.3, 0.7));
    let g = lerp(green(colors1[i]), green(colors2[i]), random(0.3, 0.7));
    let b = lerp(blue(colors1[i]), blue(colors2[i]), random(0.3, 0.7));
    colors.push(color(r, g, b));
  }
  return colors;
}

function generateColorsForConcept(concept) {
  let colors = [];
  switch (concept) {
    case 'passive':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(150, 200), random(150, 200), random(200, 255)));
      }
      break;
    case 'active':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(200, 255), random(50, 100), random(50, 100)));
      }
      break;
    case 'dull':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(80, 130), random(80, 130), random(80, 130)));
      }
      break;
    case 'bright':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, 255, random(50, 100)));
      }
      break;
    case 'cold':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(50, 100), random(50, 100), 255));
      }
      break;
    case 'warm':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(100, 150), random(50, 100)));
      }
      break;
    case 'wet':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(50, 100), random(50, 100), 255));
      }
      break;
    case 'dry':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(150, 200), random(50, 100)));
      }
      break;
    case 'sugary':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(150, 200), random(150, 200)));
      }
      break;
    case 'bitter':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(80, 130), random(30, 60), random(30, 60)));
      }
      break;
    case 'mild':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(220, 255), random(220, 255), random(170, 230)));
      }
      break;
    case 'acid':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(150, 200), 255, random(50, 100)));
      }
      break;
    case 'silent':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(170, 230), random(170, 230), random(170, 230)));
      }
      break;
    case 'noisy':
      for (let i = 0; i < 4; i++) {
        colors.push(color(255, random(120, 180), random(120, 180)));
      }
      break;
    case 'harsh':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(80, 130), random(80, 130), random(80, 130)));
      }
      break;
    case 'harmonious':
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(80, 130), 255, random(80, 130)));
      }
      break;
    default:
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(255), random(255), random(255)));
      }
  }
  return colors;
}

function saveColorSetsAsImages() {
  for (let i = 0; i < colorSets.length; i++) {
    let colorSet = colorSets[i];
    createGraphicsForColorSet(colorSet, i);
  }
}

function createGraphicsForColorSet(colorSet, index) {
  let pg = createGraphics(200, 200);
  pg.background(255);
  let numColors = colorSet.colors.length;
  let squareSize = 180;

  for (let i = 0; i < numColors; i++) {
    pg.fill(colorSet.colors[i]);
    pg.noStroke();
    let offset = i * squareSize / (numColors * 2);
    pg.rect(10 + offset, 10 + offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  pg.fill(0);
  pg.textSize(16);
  pg.textAlign(CENTER, CENTER);
  pg.text(colorSet.concept, 100, 190);

  pg.save(`colorSet_${index}.jpg`);
}

function draw() {
  background(255);
  let margin = 20;
  let columns = 20; // Nombre de colonnes pour afficher les combinaisons horizontalement
  let rows = ceil(displayedSets / columns);
  let setWidth = (width - 2 * margin) / columns;
  let setHeight = (height - 2 * margin) / rows;
  hoveredSet = null;

  for (let i = 0; i < displayedSets; i++) {
    let x = margin + (i % columns) * setWidth;
    let y = margin + floor(i / columns) * setHeight;
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
  let squareSize = min(w, h) - 10; // Réduire la taille pour laisser de la place pour le texte

  for (let i = 0; i < numColors; i++) {
    fill(colorSet.colors[i]);
    noStroke();
    let offset = i * squareSize / (numColors * 2);
    rect(x + offset, y + offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + w / 2, y + h - 40); // Aligner le texte en dessous de la palette
}

// function displayHoveredSet(colorSet) {
//   let setWidth = width / 2;
//   let setHeight = height / 2;
//   let x = width / 4;
//   let y = height / 4;

//   fill(255, 255, 255, 200);
//   noStroke();
//   rect(x, y, setWidth, setHeight);

//   let numColors = colorSet.colors.length;
//   let squareSize = min(setWidth, setHeight) - 20; // Réduire la taille pour laisser de la place pour le texte

//   for (let i = 0; i < numColors; i++) {
//     fill(colorSet.colors[i]);
//     noStroke();
//     let offset = i * squareSize / (numColors * 2);
//     rect(x + offset, y + offset, squareSize - offset * 2, squareSize - offset * 2);
//   }

//   fill(0);
//   textSize(24);
//   textAlign(CENTER, CENTER);
//   text(colorSet.concept, x + setWidth / 2, y + setHeight - 10); // Aligner le texte avec la palette
// }