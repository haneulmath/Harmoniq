let colorSets = [];
let concepts = [
  'passive', 'active', 'dull', 'bright',
  'cold', 'warm', 'wet', 'dry',
  'sugary', 'bitter', 'mild', 'acid',
  'silent', 'noisy', 'harsh', 'harmonious'
];
let displayedSets = 240; 
let hoveredSet = null;

// Créer la zone du canva
function setup() {
  createCanvas(6000, windowHeight); 
  generateColorSets();
  window.location.href = "#";
}

// Detect if user scroll

let currentStage = 0; // 0 for #, 1 for #main
const stages = ['#', '#main'];
const scrollThreshold = 5; // Adjust sensitivity (higher = less sensitive)
const swipeThreshold = 5; // Minimum distance for a swipe to trigger stage change
let accumulatedScroll = 0;

let inactiveTimeout;

function navigateToStage(stage) {
    clearTimeout(inactiveTimeout);
    inactiveTimeout = null;

    if (stage >= 0 && stage < stages.length) {
        currentStage = stage;
        
        window.location.hash = stages[stage];

        // Optional: Simulate fixed positions for each stage
        if (stage === 0) {
            window.scrollTo(0, 0); // Scroll to the top for #
            document.querySelector('#hoveredSetContainer').classList.add('inactive');
        } else if (stage === 1) {
            window.scrollTo(0, window.innerHeight); // Scroll to a set point for #main
            inactiveTimeout = setTimeout(() => {
              document.querySelector('#hoveredSetContainer').classList.remove('inactive');
            }, 200);
        }
    }
}


let lastDeltaY = 0;
 

// Disable default scroll behavior
document.addEventListener('wheel', (event) => {
  // Compare current deltaY with previous deltaY to determine momentum direction
  const isMomentumIncreasing = (Math.abs(event.deltaY) - Math.abs(lastDeltaY) > 3)
  
  lastDeltaY = event.deltaY;
  accumulatedScroll += event.deltaY;

  if (event.deltaY > 0 || event.deltaY < 0) {
    event.preventDefault();
  }

  if (accumulatedScroll > scrollThreshold) {
    // Scroll down
    navigateToStage(1);
    document.querySelector('#mainContainer').classList.add('cool-borders');
    accumulatedScroll = 0; // Reset after trigger
  } else if (accumulatedScroll < -scrollThreshold) {
    // Scroll up
    if (isAtStart() && isMomentumIncreasing) {
      navigateToStage(0);
      document.querySelector('#mainContainer').classList.remove('cool-borders');
      accumulatedScroll = 0; // Reset after trigger
    }
  }
}, { passive: false });


let startY = 0;

// For touch devices
document.addEventListener('touchstart', (event) => {
  startY = event.touches[0].clientY;
}, { passive: false });

document.addEventListener('touchend', (event) => {
  const endY = event.changedTouches[0].clientY;
  const swipeDistance = startY - endY;

  if (swipeDistance > swipeThreshold) {
      // Swipe up
      navigateToStage(1);
  } else if (swipeDistance < -swipeThreshold) {
      // Swipe down
      navigateToStage(0);
  }
}, { passive: false });


// Redimensionner la hauteur du canvas lorsque la fenêtre est redimensionnée
function windowResized() {
  resizeCanvas(6000, windowHeight);
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

// Générer des couleurs pour les concepts
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
  colorMode(HSB); // Set color mode to HSB
  switch (concept) {
    case 'passive': // Soft and calming tones, pastel hues with low saturation
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(180, 240), random(20, 40), random(80, 100)));
      }
      break;

    case 'active': // Vibrant and energetic tones, high saturation and brightness
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 40), random(80, 100), random(70, 100)));
      }
      break;

    case 'dull': // Muted, low saturation and medium brightness
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 360), random(10, 30), random(40, 60)));
      }
      break;

    case 'bright': // Bright colors with high brightness and medium saturation
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(40, 100), random(50, 80), random(90, 100)));
      }
      break;

    case 'cold': // Cool blues and greens
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(180, 240), random(60, 80), random(80, 100)));
      }
      break;

    case 'warm': // Warm reds, oranges, and yellows
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 50), random(60, 80), random(80, 100)));
      }
      break;

    case 'wet': // Cool, saturated blues and greens
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(190, 210), random(60, 80), random(70, 90)));
      }
      break;

    case 'dry': // Earthy yellows and browns
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(30, 60), random(30, 50), random(60, 80)));
      }
      break;

    case 'sugary': // Sweet pastels with high brightness and low saturation
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(300, 340), random(20, 60), random(80, 100)));
      }
      break;

    case 'bitter': // Dark, desaturated browns and greens
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(60, 120), random(20, 40), random(30, 50)));
      }
      break;

    case 'mild': // Neutral pastel tones
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(180, 300), random(20, 40), random(80, 100)));
      }
      break;

    case 'acid': // Sharp greens and yellows
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(80, 130), random(80, 100), random(80, 100)));
      }
      break;

    case 'silent': // Soft greys with low saturation
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 360), random(10, 20), random(90, 100)));
      }
      break;

    case 'noisy': // Clashing, highly saturated tones
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 360), random(80, 100), random(70, 100)));
      }
      break;

    case 'harsh': // Dark, low-brightness tones
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 360), random(10, 300), random(10, 30)));
      }
      break;

    case 'harmonious': // Balanced greens and blues
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(120, 180), random(40, 60), random(80, 100)));
      }
      break;

    default: // Fallback to random colors
      for (let i = 0; i < 4; i++) {
        colors.push(color(random(0, 360), random(20, 100), random(50, 100)));
      }
  }
  colorMode(RGB); // Reset color mode to default
  return colors;
}

function draw() {
  background(255);
  let margin = 20;
  let columns = 20;   
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

  updateHoveredSetDisplay(hoveredSet);
}

function drawColorSet(x, y, w, h, colorSet) {
  let numColors = colorSet.colors.length;
  let squareSize = min(w, h) - 10;

  for (let i = 0; i < numColors; i++) {
    fill(colorSet.colors[i]);
    noStroke();
    let offset = i * squareSize / (numColors * 2);
    rect(x + offset, y + offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(colorSet.concept, x + w / 2, y + h - 40);
}

// Gérer le survol de la souris
function updateHoveredSetDisplay(hoveredSet) {
  let hoveredSetDiv = document.getElementById('hoveredSet');
  if (hoveredSet) {
    hoveredSetDiv.style.display = 'block'; 
    hoveredSetDiv.innerHTML = `
      <h3>${hoveredSet.concept}</h3> 
      <div class="hovered-color"> 
        ${hoveredSet.colors.map(c => `
          <div class="hovered-set-color">
            <div style="width: 50px; height: 50px; background: ${c.toString('#rrggbb')};"></div>
            <div>${c.toString('#rrggbb')}</div>
          </div>
        `).join('')}
      </div>
      <div class="hovered-square" style="">
        ${hoveredSet.colors.map((c, i) => `
          <div class="hovered-set-square" style="
            width: ${200 - i * 40}px;
            height: ${200 - i * 40}px;
            background: ${c.toString('#rrggbb')};
            top: ${i * 20}px;
            left: ${i * 20}px;
          "></div>
        `).join('')}
      </div>
    `;

    // Positionner la div à côté du curseur
    let divWidth = hoveredSetDiv.offsetWidth;
    let divHeight = hoveredSetDiv.offsetHeight;
    let posX = mouseX + 20 - document.getElementById("main").scrollLeft;
    let posY = mouseY + 20 + window.scrollY;

    // Vérifier si la div dépasse de l'écran
    if (posX + divWidth > window.innerWidth) {
      posX = posX - (divWidth - 20);
    }
    if (posY + divHeight > window.innerHeight + window.scrollY) {
      posY = mouseY - divHeight - 20 + window.scrollY;
    } else if (posY < window.scrollY) {
      posY = mouseY + 20 + window.scrollY;
    }

    // Positionner la div
    hoveredSetDiv.style.left = `${posX}px`; 
    hoveredSetDiv.style.top = `${posY}px`; 
  } else {
    hoveredSetDiv.style.display = 'none'; 
  }
}
// Enregistrer les ensembles de couleurs
function saveAllColorSets() {
  let zip = new JSZip();
  let folder = zip.folder("colorSets");

  for (let i = 0; i < colorSets.length; i++) {
    let colorSet = colorSets[i];
    let graphics = createGraphics(400, 400);
    drawColorSetOnGraphics(graphics, colorSet);
    graphics.loadPixels();
    let imgData = graphics.canvas.toDataURL("image/png").split(",")[1];
    folder.file(`colorSet_${i}.png`, imgData, { base64: true });
  }

  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, "colorSets.zip");
  });
}

// Dessiner les ensembles de couleurs 
function drawColorSetOnGraphics(graphics, colorSet) {
  let numColors = colorSet.colors.length;
  let squareSize = graphics.width;

  for (let i = 0; i < numColors; i++) {
    graphics.fill(colorSet.colors[i]);
    graphics.noStroke();
    let offset = i * squareSize / (numColors * 2);
    graphics.rect(offset, offset, squareSize - offset * 2, squareSize - offset * 2);
  }

  graphics.fill(0);
  graphics.textSize(16);
  graphics.textAlign(CENTER, CENTER);
  graphics.text(colorSet.concept, graphics.width / 2, graphics.height - 30);
}


const scrollContainer = document.querySelector('main');

scrollContainer.addEventListener('wheel', (event) => {
  // Prevent the default vertical scrolling
  event.preventDefault();

  if (currentStage === 1) {

    // Scroll horizontally based on the vertical scroll amount
    scrollContainer.scrollLeft += (event.deltaY + event.deltaX) * 0.8

  }
});



function isAtStart() {
  return (scrollContainer.scrollLeft === 0);
}
