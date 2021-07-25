var turn = true;
document.getElementById("submitButton").disabled = true;

// Wheel spins fast then more slowly and then stops
var spinInterval = 0;
var spinResistance = 0;
var rotation;
var globalPhrase;
var points = 0;

function timeSpin() {
  var loop = setInterval(function () {
    let spin = Math.round(Math.random() * 200);
    spinInterval += spin;
    let rotate = `rotate(${spinInterval}deg)`;
    document.querySelector(".container").style.transform = rotate;
    // console.log(rotate);
    rotation = spinInterval;
  }, 100);

  setTimeout(function () {
    clearInterval(loop);
  }, 5000);
  turn = false;
  document.getElementById("button").disabled = true;
  document.getElementById("submitButton").disabled = false;
}

//reads the rotation and gives points
function clearInt(loop) {
  clearInterval(loop);
  assignPoints();
}

//An array of phrases
const MARY = { phrase: "  MARY HAD A    LITTLE LAMB ", type: "Phrase" };
const SPIN = { phrase: "  SPIN THAT       WHEEL     ", type: "Phrase" };
const PARIS = { phrase: "    EIFFEL        TOWER     ", type: "Place" };
const EMPIRE = { phrase: " EMPIRE STATE    BUILDING   ", type: "Place" };
const LONDON = { phrase: "   BIG BEN      IN LONDON   ", type: "Place" };
const PRICE = { phrase: "  THE PRICE      IS RIGHT   ", type: "Phrase" };
const CITY = { phrase: " A CITY RICH    IN HISTORY  ", type: "Phrase"};
const SCENE = { phrase: "    A BAD         SCENE     ", type: "Phrase"};
const LUCKY = { phrase: " DO YOU FEEL  LUCKY TONIGHT ", type: "Phrase"};
const LENNON = { phrase: " JOHN LENNON     IS SHOT    ", type: "Headline"};
const MARTIN = { phrase: " RICKY MARTIN     IS GAY    ", type: "Headline"};

let phrasesArray = [MARY, SPIN, PARIS, EMPIRE, LONDON, PRICE, CITY, SCENE, LUCKY, LENNON, MARTIN];

//returns a random phrase object
window.onload = function () {
  let num = Math.round(Math.random() * (phrasesArray.length - 1));
  setPhrase(phrasesArray[num]);
  letters();
  return phrasesArray[num];
};

function setPhrase(phrase) {
  globalPhrase = phrase;
}

// Returns the phrase in use
function getPhrase() {
  return globalPhrase;
}

//The letters part of the game
// forms an array of strings containing a phrase
function letters() {
  let letters = getPhrase().phrase.split("");
  for (i = 0; i < letters.length; i++) {
    if (letters[i] != " ") {
      whiteOut(i + 1);
    }
  }
  setPhrase(letters);
  return letters;
}

//function displays letters on the screen
function displayLetter(id, letter) {
  document.getElementById(`${id}`).innerHTML = `${letter}`;
}

//Function that whites out the chosen square
function whiteOut(idNum) {
  document.getElementById(`item${idNum}`).style.backgroundColor = "white";
}

//Makes sure that the input is valid: a single letter character or phrase
function checkInput(input) {
  if (
    input.toLowerCase() != input.toUpperCase() &&
    input.split("").length === 1
  ) {
    return true;
  } else {
    console.log("false");
    return false;
  }
}

function completePhrase(input) {
  let phrase = getPhrase().join("").replace(/\s+/g, "").split("");
  let str = input.replace(/\s+/g, "").split("");
  console.log(phrase);
  for (i = 0; i < str.length; i++) {
    str[i] = str[i].toUpperCase();
  }

  console.log(str);
  for (i = 0; i < phrase.length; i++) {
    if (phrase[i] != str[i]) {
        return false;
    }
  }
    return true;
}

function getInput() {
  //alert(document.getElementById("charInput").value);
  input = document.getElementById("charInput").value;
  // console.log(input);
  if (checkInput(input)) {
    turn = true;
    document.getElementById("button").disabled = false;
    document.getElementById("submitButton").disabled = true;
    let phrase = getPhrase(); //getPhrase() returns the array of characters being used
    for (i = 0; i < phrase.length; i++) {
      if (
        input.toUpperCase() === phrase[i] &&
        phrase[i] != document.getElementById(`item${i + 1}`).innerHTML //Checks if letter was already displayed
      ) {
        // console.log(`item${i + 1}`);
        displayLetter(`item${i + 1}`, phrase[i]);
        assignPoints();
      }
    }
  } else if (completePhrase(input)) {
    let phrase = getPhrase();
    for (i = 0; i < phrase.length; i++) {
      displayLetter(`item${i + 1}`, phrase[i]);
      assignPoints();
    }
  } else {
    alert(failed - checkInput);
  }
}

//assigns points
function assignPoints() {
  let value = window
    .getComputedStyle(document.querySelector(".container"))
    .getPropertyValue("transform");
  var values = value.split("(")[1],
    values = values.split(")")[0],
    values = values.split(",");

  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  console.log(angle);
  console.log(value);
  if (-22.5 < angle && angle < 22.5) {
    points += 100;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (-67.5 < angle && angle < -22.5) {
    points += 50;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (-112.5 < angle && angle < -67.5) {
    points += 500;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (-157.5 < angle && angle < -112.5) {
    points = 0;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if ((-180 < angle && angle < -157.5) || 157.5 < angle < 180) {
    points += 500;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (112.5 < angle && angle < 157.5) {
    points += 50;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (67.5 < angle && angle < 112.5) {
    points += 200;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (22.5 < angle && angle < 67.5) {
    points += 300;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else {
    alert(There - is - a - problem);
  }
}
