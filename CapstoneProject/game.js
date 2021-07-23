var turn = true;


// Wheel spins fast then more slowly and then stops
var spinInterval = 0;
var spinResistance = 0;
var rotation;
var globalPhrase;
var points;

function timeSpin() {
  var loop = setInterval(function () {
    let spin = Math.round(Math.random() * 100);
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
const LONDON = { phrase: "   BIG BEN      IN LONDON   ", type: "Place"};
const PRICE = { phrase: "  THE PRICE      IS RIGHT   ", type: "Phrase"};

let phrasesArray = [MARY, SPIN, PARIS, EMPIRE];

//returns a random phrase object
window.onload = function() {
  let num = Math.round(Math.random() * (phrasesArray.length - 1));
  setPhrase(phrasesArray[num]);
  letters();
  return phrasesArray[num];
}

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
      whiteOut(i+1);
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
  return true;
}

function getInput() {
  //alert(document.getElementById("charInput").value);
  input = document.getElementById("charInput").value;
  console.log(input);
  if (checkInput(input)) {
    turn = true;
    document.getElementById("button").disabled = false;
    document.getElementById("submitButton").disabled = true;
    let phrase = getPhrase(); //getPhrase() returns the array of characters being used
    for (i = 0; i < phrase.length; i++) {
      if ((input === phrase[i])) {
        console.log(`item${i+1}`);
        displayLetter(`item${i+1}`, phrase[i]);
        assignPoints();
      }
    }
  } else {
    alert(failed_checkInput);
  }
}

//assigns points
function assignPoints() {
  let value = document.querySelector(".container").style.rotation % 360;
  console.log(value);
  if(0<=value<45) {
    points += 100;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (45<=value<90) {
    points += 50;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (90<=value<135) {
    points += 500;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (135<=value<180) {
    points = 0;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (180<=value<225) {
    points += 500;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (225<=value<270) {
    points += 50;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (270<=value<315) {
    points += 200;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else if (315<=value<360) {
    points += 300;
    console.log(points);
    document.getElementById("points").innerHTML = `Points: ${points}`;
  } else {
    alert(There-is-a-problem);
  }
}
