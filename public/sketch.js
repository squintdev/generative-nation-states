// FH_HASH p5 template | @squintdev

let seed = 0; //seed Hash
let PALETTE = []
let paletteString;
let colorCount;
let flagShapeTrue;
let flagShapeContainer;

function setup() {
    createCanvas(750, 500)

    PALETTE_1 = [
      color(255,244,48),
      color(254,254,254),
      color(156,88,209),
      color(0,0,0),
    ]

    PALETTE_2 = [
      color(207, 58, 75),
      color(255, 186, 0),
      color(25, 116, 210), 
    ]

    PALETTE_3 = [
      color(107, 244, 160),
      color(160, 248, 255),
      color(255,255,255),
      color(255, 236, 160),
      color(244,189,107),
    ]

    PALETTE_4 = [
      color(255, 105, 180),
      color(255, 255, 0),
      color(6, 164, 254),
    ]

    PALETTE_5 = [
      color(57, 0, 153),
      color(158,0,89),
      color(255,0,84),
    ]
    
    PALETTE_6 = [
      color(237, 27, 36),
      color(246, 135, 30),
      color(240, 234, 12),
      color(0, 148, 74),
      color(0, 181, 184),
      color(77, 46, 142),
      color(147, 40, 143),
    ]

    PALETTE_7 = [
      color(0, 0, 0),
      color(255, 255, 255),
      color(0, 123, 58),
      color(207, 9, 33),
    ]

    PALETTE_8 = [
      color(1, 33, 105),
      color(255, 255, 255),
      color(200, 16, 46),
    ]

    noLoop()
    noStroke()

    seed=int(fxrand() * 100000000) // FXHASH seed rand
    randomSeed(seed)

    //choose a random palette
    randomPalette();

    /**
     * flags will be drawn in the order:
     * fill
     * stripes
     * shape
     * symbol
     */

    //choose a random number of colors from palette for flag
    flagColorCount = floor(random(2,colorCount + 1));

    //trimmed palette for this flag
    PALETTE = chooseRandomFlagColors()

    //are there stripes on the flag?
    flagStripeRand = random(1)
    
    if (flagStripeRand < 0.1) {
      flagStripeCount = 0;
    } else {
      flagStripeCount = floor(random(2, 5));
    }

    //main flag stripe direction
    flagStripeHorizontal = randomBoolean()

    if (flagStripeHorizontal) {
      flagStripeDirection = 'Horizontal';
    } else {
      flagStripeDirection = 'Vertical';
    }

    //Does the flag have an additional shape?
    flagShapeWeight = random(1);
    if (flagShapeWeight < .15) {
      flagShapeTrue = false;
    } else {
      flagShapeTrue = true;
    }
    
    //if so, what shape? (for now value of 1 = rectangl and value of 2 equals star)
    if (flagShapeTrue) {
      flagShapeContainer = randomBoolean() ? 1 : 2;
    }

    //for debugging
    // flagShapeTrue = true;
    // flagShapeContainer = 2;

    if (flagShapeTrue) {
      //how many stars (either 1, 2, 3, 5, or 8)
      starCountPicker = random(1);
      if (starCountPicker < .2) {
        starCount = 1
      } else if (starCountPicker >= .2 && starCountPicker < .4) {
        starCount = 2
      } else if (starCountPicker >= .4 && starCountPicker < .6) {
        starCount = 3
      } else if (starCountPicker >= .6 && starCountPicker < .8) {
        starCount = 5
      } else {
        starCount = 8
      }
    } else {
      starCount = 0;
    }

    countryName = getCountryName(floor(random(4,9)))

    // fxHash Features
    window.$fxhashFeatures = {
      'Country Name': countryName,
      'Flag Color Palette': paletteString,
      'Flag Color Count': flagColorCount,
      'Flag Stripes': flagStripeCount,
      'Flag Stripe Direction': flagStripeDirection,
      'Flag Shape': flagShapeTrue,
      'Flag Star Count': starCount,
    };

    console.log($fxhashFeatures)
}

function draw() {
  // only draw stripes if stripe count is > 0
  if (flagStripeCount > 0) {
    drawStripes();
  } else {
    background(getRandomFromPalette())
  }

  if (flagShapeTrue) {
    drawShape(flagShapeContainer);
  }

}

function drawShape (flagShapeContainer) {
  if (flagShapeContainer == 1) {
    flagShapeColor = getRandomFromPalette();
    fill(flagShapeColor)
    rect(0,0,width /2,height / 2)

    if (starCount > 1) {
      let angle = 0;
      noStroke()
      starFillColor = getRandomFromPalette();

      fill(starFillColor)
      
      for (let i = angle; i < radians(360 + angle); i += radians(360 / starCount)) {
        let star_x = (width / 5) / 2 * Math.cos(i) + width / 4;
        let star_y = (width / 5) / 2 * Math.sin(i) + height / 4;

        push()
        translate(0 - width / 32, height / 8)
        star(star_x,star_y, width * .01, width * .025, 5)
        pop()
      }
    } else {
      fill(getRandomFromPalette())
      strokeWeight(5)
      stroke(getRandomFromPalette())
  
      push()
      translate(width / 4, height / 4)
      star(0,0, width * .04, width * .1, 5)
      pop()
    }
  } else {
    fill(getRandomFromPalette())
    
    circleDiameter = width * 0.5
    circle_x = floor(width / 4)
    circle_y = height / 2

    ellipse(circle_x, circle_y, circleDiameter, circleDiameter)

    //how many stars (either 1, 2, 3, 5, or 8)
    starCountPicker = random(1);
    if (starCountPicker < .2) {
      starCount = 1
    } else if (starCountPicker >= .2 && starCountPicker < .4) {
      starCount = 2
    } else if (starCountPicker >= .4 && starCountPicker < .6) {
      starCount = 3
    } else if (starCountPicker >= .6 && starCountPicker < .8) {
      starCount = 5
    } else {
      starCount = 8
    }

    //for debugging
    // starCount = 8

    if (starCount > 1) {
      let angle = 0;

      noStroke()
      fill(getRandomFromPalette())

      push()
      translate(0,0)
      for (let i = angle; i < radians(360 + angle); i += radians(360 / starCount)) {
        let star_x = circleDiameter / 3 * Math.cos(i) + width / 4;
        let star_y = circleDiameter / 3 * Math.sin(i) + height / 4;
        push()
        translate(0 - (circleDiameter / 12), (height / 2) - (height / 8))
        star(star_x,star_y, width * .01, width * .025, 5)
        pop()
      }
      pop()


    } else {
      fill(getRandomFromPalette())
      strokeWeight(5)
      stroke(getRandomFromPalette())
  
      push()
      translate(width / 4, height / 2)
      star(0,0, width * .08, width * .2, 5)
      pop()
    }
  }
}

function drawStripes () {
    let lastStripeColor;
    let stripeColor;
  
    for (let i = 0; i < flagStripeCount; i++){
      //get random color from palette and check for repeats
      stripeColor = getRandomFromPalette()
      while (stripeColor == lastStripeColor) {
        stripeColor = getRandomFromPalette()
      }
      // fill stripe with stripeColor from palette
      fill(stripeColor)

      //make stripe | check for vertical and horizontal first
      if (flagStripeDirection == 'Horizontal'){
        //get stripe width 
        stripeWidth = height / flagStripeCount;

        if (i == 0) {
          rect(0,0,width,stripeWidth);
        } else {
          rect(0,0 + stripeWidth * i,width,stripeWidth * i);
        }
      } else {
        //get stripe width 
        stripeWidth = width / flagStripeCount;
        if (i == 0) {
          rect(0,0,stripeWidth,height);
        } else {
          rect(0 + stripeWidth * i,0,stripeWidth * i,height)
        }
      }

      lastStripeColor = stripeColor;
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}