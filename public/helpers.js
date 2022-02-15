//place any helper functions in this file to keep sketch code clean and manageable

//name gen
function getCountryName(length) {
  var capCons = 'BCDFGHJKLMNPQRSTVW';
  var capVows = 'AEIOU';
  var lowerCons = 'bcdfghjklmnpqrstvwxyz';
  var lowerVows = 'aeiou';
  var prevChar;
  var result = '';
  //choose if the country should start with a consenent or vowel
  var starter = randomBoolean() ? 'vow' : 'cons';
  for ( var i = 0; i < length; i++ ) {
    if(i == 0) {
      if (starter == 'vow') {
        thisChar = capVows. charAt(Math. floor(Math. random() * capVows. length));
        result += thisChar;
        prevChar = 'vow';
      } else {
        thisChar = capCons. charAt(Math. floor(Math. random() * capCons. length));
        result += thisChar;
        prevChar = 'cons';
      }
    } else {
      if (prevChar == 'vow') {
        thisChar = lowerCons. charAt(Math. floor(Math. random() * lowerCons. length));
        result += thisChar
        prevChar = 'cons'
      } else {
        thisChar = lowerVows. charAt(Math. floor(Math. random() * lowerVows. length));
        result += thisChar
        prevChar = 'vow'
      }
    }
  }
  return result;
}

// function that randomly returns true or false
function randomBoolean () {
    const rando = random(fxrand())
    return rando > .5 ? true : false
}

// choose random palette
function randomPalette () {
  var palettePicker = floor(random(1,9))

  switch (palettePicker) {
    case 1:
      PALETTE = PALETTE_1;
      paletteString = 'Palette 1';
      colorCount = PALETTE_1.length;
      break;
    case 2:
      PALETTE = PALETTE_2;
      paletteString = 'Palette 2';
      colorCount = PALETTE_2.length;
      break;
    case 3:
      PALETTE = PALETTE_3;
      paletteString = 'Palette 3';
      colorCount = PALETTE_3.length;
      break;
    case 4:
      PALETTE = PALETTE_4;
      paletteString = 'Palette 4';
      colorCount = PALETTE_4.length;
      break;
    case 5:
      PALETTE = PALETTE_5;
      paletteString = 'Palette 5';
      colorCount = PALETTE_5.length;
      break;
    case 6:
      PALETTE = PALETTE_6;
      paletteString = 'Palette 6';
      colorCount = PALETTE_6.length;
      break;
    case 7:
      PALETTE = PALETTE_7;
      paletteString = 'Palette 7';
      colorCount = PALETTE_7.length;
      break;
    case 8:
      PALETTE = PALETTE_8;
      paletteString = 'Palette 8';
      colorCount = PALETTE_8.length;
      break;
  }
}

//gets a random color from palette array
function getRandomFromPalette () {
  const rando = floor(random(0, PALETTE.length))
  return PALETTE[rando]
}

function chooseRandomFlagColors (count) {
  //randomize the PALETTE array
  const shuffled = PALETTE.sort(() => 0.5  - random());
  return shuffled.slice(0,count)
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  rotate(-.31)
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}