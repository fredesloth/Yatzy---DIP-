let values = [0,0,0,0,0];

let throwCount = 0;

let holds = [false, false, false, false, false];

let txfRes = document.querySelectorAll(".col1res");

let turn = document.getElementById("turn");

let dice = document.querySelectorAll("img");
let stringarr = ["https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/1.png",
    "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/2.png",
    "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/3.png",
    "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/4.png",
    "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/5.png",
    "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/6.png"];

let sumValueUp = 0;
let totalsum = 0;

function throwDice(holds = []) {
    for (let i = 0 ; i <= values.length; i++){
        if (holds[i] === false){
            values[i] = Math.floor((Math.random() * 6) + 1);
        }
    }
    throwCount++;
}

function resetThrowCount() {
    throwCount = 0;
}

function freqFaceValue() {
    let sameFaceValues = [0, 0, 0, 0, 0, 0, 0];

    for(let i = 0; i < values.length; i++){
        if(values[i] === 1){
            sameFaceValues[1]++;
        }else if(values[i] === 2){
            sameFaceValues[2]++;
        }else if(values[i] === 3){
            sameFaceValues[3]++;
        }else if(values[i] === 4){
            sameFaceValues[4]++;
        }else if(values[i] === 5){
            sameFaceValues[5]++;
        }else if(values[i] === 6){
            sameFaceValues[6]++;
        }
    }

    return sameFaceValues;
}


function valueSpecificFace(face) {
    let value_Specific_Face = [];
    value_Specific_Face = freqFaceValue();
    return value_Specific_Face[face] * face;
}

function getPossibleresults() {
    let results = [];
    for (let i = 0; i <= 5; i++) {
        results[i] = valueSpecificFace(i + 1);
    }
    results[6] = valueOnePair();
    results[7] = valueTwoPair();
    results[8] = valueThree();
    results[9] = valueFour();
    results[10] = valueFullHouse();
    results[11] = valueSmallStraight();
    results[12] = valueLargeStraight();
    results[13] = valueChance();
    results[14] = valueYatzy();
    return results;
}

function valueManyOfAKind(n) {
    let freq = [];
    freq = freqFaceValue();
    let value = 0;

    for(let i = 0; i < freq.length; i++){
        if (n <= freq[i]){
            value = n * i;
        }
    }
    return value;
}

function valueYatzy() {
    let point = 0;
    if(valueManyOfAKind(5) > 0){
        point = 50;
    }
    return point;
}

function valueChance() {
    let sum = 0;
    for (let i = 0; i < values.length; i++){
        sum = sum + values[i];
    }
    return sum;
}

function valueOnePair() {
    let freq = [];
    freq = freqFaceValue();
    let value = 0;
    for (let i = 0; i < freq.length; i++){
        if(2 <= freq[i]){
            value = 2 * i;
        }
    }
    return value;
}

function valueTwoPair() {
    let numberOfPair = 0;
    let freq = [];
    freq = freqFaceValue();
    let value = 0;
    for (let i = 0; i < freq.length; i++){
        if(2 <= freq[i]){
            value = 2 * i;
            numberOfPair++;
        }
    }
    if(numberOfPair === 2){
        return value;
    }
    return 0;
}

function valueThree() {
    return valueManyOfAKind(3)
}

function valueFour() {
    return valueManyOfAKind(4)
}

function valueSmallStraight() {
    let freq = [];
    freq = freqFaceValue();

    if(freq[6] === 0){
        for (let i = 0; i < 6; i++){
            if(freq[i] !== 1){
                return 0;
            }
        }
        return 15;
    }
    return 0;
}

function valueLargeStraight() {
    let freq = [];
    freq = freqFaceValue();

    if(freq[1] === 0){
        for (let i = 0; i < freq.length; i++){
            if (freq[i] !== 1){
                return 0;
            }
        }
        return 20;
    }
    return 0;
}

function valueFullHouse() {
    let sum = 0;
    let three = false;
    let two = false;
    let freq = [];
    freq = freqFaceValue();

    for (let i = 0; i < freq.length; i++){
        if (freq[i] === 3) {
            sum = sum + (3 * i);
            three = true;
        }
        if (freq[i] === 2) {
            sum = sum + (2 * i);
            two = true;
        }
    }
    if (two && three === true){
        return sum;
    }
    return 0;
}


function rollAction() {

    throwDice(holds);

    for(let i = 0; i<dice.length; i++){
        dice[i].src=stringarr[values[i] - 1];
    }

    turn.innerHTML = "rolled: " + throwCount;

    let posres = getPossibleresults();
    for (let i = 0; i < posres.length; i++){
        if (!txfRes[i].disabled){
            txfRes[i].value = posres[i];
        }
    }

    if (throwCount === 3) {
        // btn.disabled = true;
        document.getElementById("btnRoll").disabled = true;
        document.getElementById("btnRoll").style.opacity = .25;

    }
}

function endCurrentRound() {
    if (throwCount !== 0) {
        for (let i = 0; i < txfRes.length; i++) {

            // If one of the first six fields is selected, the value is added to the top sum
            if (txfRes[i] === document.activeElement && i < 6) {
                sumValueUp = sumValueUp + parseInt(txfRes[i].value);
            }
            // makes a total sum
            if (txfRes[i] === document.activeElement) {
                console.log(totalsum);
                totalsum = totalsum + parseInt(txfRes[i].value);
            }

            // When one of the fields is selected, it will be deactivated
            if (txfRes[i] === document.activeElement) {
                txfRes[i].disabled = true;
            }



        }

        // if the top sum is 63 or more - the bonus field will be 50
        if (sumValueUp >= 63) {
            document.getElementById('bonus').value = '50';
        }

        // sets the value of the top sum
        document.getElementById('sum').value = sumValueUp;

        // sets the value of the total
        document.getElementById('total').value = totalsum + parseInt(document.getElementById('bonus').value);

        // resets all values in the dice pane (dice face values, checkboxes will be
        // unselected, rolled number will be reset and the Roll button will be
        // activated)
        let btns = document.querySelectorAll('.diebtn');
        for (let i = 0; i < btns.length; i++) {
            //values[i].setText("0");
            //holds[i].setDisable(true); // the check boxes are deactivated because they turn to 0
            holds[i] = false;
            btns[i].style.opacity = 1;
        }
        resetThrowCount();
        document.getElementById('btnRoll').disabled = false;
        document.getElementById("btnRoll").style.opacity = 1;


        // updates the rolled number
        let rollCount = document.getElementById('turn').value = "rolled: " + throwCount;

        // counts the number of rounds
        let roundCount = 0;

        for (let i = 0; i < txfRes.length; i++) {
            // each time a field is disabled which means when a field is selected
            if (txfRes[i].disabled === true) {
                roundCount = roundCount + 1; // then it will count a round
            }
        }

        if (roundCount === 15) {
            alert("The game is finished - your total score is: " + document.getElementById('total').value);

            // If the user clicks on the OK button, it means that the user wants to play
            // again and the entire game will be reset
            for (let i = 0; i < txfRes.length; i++) {
                txfRes[i].disabled = false;
                txfRes[i].value = "0";
            }
            sumValueUp = 0;
            document.getElementById("sum").value = "0";
            document.getElementById('bonus').value = "0";
            document.getElementById('total').value = "0";
            roundCount = 0;
        }
    }else {
            alert("You must roll one time before choosing a field");
        }

}

    document.getElementById('die1').addEventListener('click', function () {
        if (holds[0] === true) {
            holds[0] = false;
            document.getElementById('die1').style.opacity = 1;
        } else {
            holds[0] = true;
            document.getElementById('die1').style.opacity = 0.5;
        }
        console.log(holds)
    });
    document.getElementById('die2').addEventListener('click', function () {
        if (holds[1] === true) {
            holds[1] = false;
            document.getElementById('die2').style.opacity = 1;
        } else {
            holds[1] = true;
            document.getElementById('die2').style.opacity = 0.5;
        }
    });
    document.getElementById('die3').addEventListener('click', function () {
        if (holds[2] === true) {
            holds[2] = false;
            document.getElementById('die3').style.opacity = 1;
        } else {
            holds[2] = true;
            document.getElementById('die3').style.opacity = 0.5;
        }
    });
    document.getElementById('die4').addEventListener('click', function () {
        if (holds[3] === true) {
            holds[3] = false;
            document.getElementById('die4').style.opacity = 1;
        } else {
            holds[3] = true;
            document.getElementById('die4').style.opacity = 0.5;
        }
    });
    document.getElementById('die5').addEventListener('click', function () {
        if (holds[4] === true) {
            holds[4] = false;
            document.getElementById('die5').style.opacity = 1;
        } else {
            holds[4] = true;
            document.getElementById('die5').style.opacity = 0.5;
        }
    });

document.getElementById("btnRoll").addEventListener("click", function () {
    rollAction();
});

let inputs = document.querySelectorAll(".col1res");
for(let i = 0; i<inputs.length; i++){
    inputs[i].addEventListener('click', function () {
        endCurrentRound();
    } );
}