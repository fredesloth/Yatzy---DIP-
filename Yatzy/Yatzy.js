//I tvivl om 5 elle 6
let values = new Array(5);

let throwCount = 0;

//I tvivl om 5 elle 6
// let random = Math.floor(math.random()) * 5;
let random = math.random();


function throwDice(holds = []) {
    for (let i = 0 ; i <= values.length; i++){
        if (holds[i] === false){
            values[i] = math.flags(random * 5);
        }
    }
    throwCount++;
}

function getThrowCount() {
    return throwCount;
}

function resetThrowCount() {
    throwCount = 0;
}

function getValues() {
    return values;
}

function setValues(newValues) {
    values = newValues;
}

function freqFaceValue() {
    let valueOne = 0;
    let valueTwo = 0;
    let valueThree = 0;
    let valueFour = 0;
    let valueFive = 0;
    let valueSix = 0;

    for(let i = 0; i < values.length; i++){
        if(values[i] == 1){
            valueOne++;
        }else if(values[i] = 2){
            valueTwo++;
        }else if(values[i] = 3){
            valueThree++;
        }else if(values[i] = 4){
            valueFour++;
        }else if(values[i] = 5){
            valueFive++;
        }else if(values[i] = 6){
            valueSix++;
        }
    }
    let sameFaceValues = [valueOne, valueTwo, valueThree, valueFour, valueFive, valueSix];
    return sameFaceValues;
}


function valueSpecificFace(face) {
    let value_Specific_Face = [];
    value_Specific_Face = freqFaceValue();

    let value = value_Specific_Face[face] * face;
    return value;
}

function getPossibleresults() {
    let results
    [] = new Array(15);
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
            values = 2 * i;
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
            values = 2 * i;
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

    if(freq[6] == 0){
        for (let i = 0; i < 6; i++){
            if(freq[i] != 1){
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

    if(freq[1] == 0){
        for (let i = 0; i < freq.length; i++){
            if (freq[i] != 1){
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
        if (freq[i] == 3) {
            sum = sum + (3 * i);
            three = true;
        }
        if (freq[i] == 2) {
            sum = sum + (2 * i);
            two = true;
        }
    }
    if (two && three == true){
        return sum;
    }
    return 0;
}

function holdDie(die){
    if(die.held){
        die.held = false;
        die.style.opacity = 1;
    } else {
        die.style.opacity = 0.5;
        die.held = true;
    }
}

function rollAction() {

    let holds = [false, false, false, false, false];

    //forsøg


    for(let i = 0; i < holds.length; i++){
        values[i].held = false;
        if (values[i].held = true){
            holds[i] = true;
        }
    }

    //vi skal nok lave det om til tal og textfields i stedet for billeder
    throwDice(holds);
    //lav et array med de buttons vi har, og kør igennem det. det skal laves rundt om nuværende forloop

    let dice = document.querySelectorAll("img");
    let stringarr = ["https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/1.png",
        "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/2.png",
        "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/3.png",
        "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/4.png",
        "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/5.png",
        "https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/6.png"]
    for(let i = 0; i<dice.length; i++){
        dice[i].src=stringarr[i];
    }

    //for(let i = 0; values.length; i++){
    //    if(values[i] == 1){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/1.png"
    //    }else if(values[i] == 2){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/2.png"
    //    }else if(values[i] == 3){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/3.png"
    //    }else if(values[i] == 4){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/4.png"
    //    }else if(values[i] == 5){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/5.png"
    //    }else if(values[i] == 6){
    //        e.src="https://raw.githubusercontent.com/fredesloth/Yatzy---DIP-/master/Yatzy/Dice/6.png"
    //    }

    document.getElementById("turn").value = "rolled: " + throwCount + " times";

    let posres = getPossibleresults();
    for (let i = 0; i < posres.length; i++){
        let txtfields = document.querySelectorAll("col1res")
        if (txtfields[i]){
            // hvis txtfield !isDisabled
            //set text til result
        }
    }

    let btn = document.getElementById("btnRoll");
    if (yatzy.getThrowCount() == 3) {
        //btn.setDisable(true);
    }

    }
}
document.getElementById("bntRoll").addEventListener("click", function () {
    rollAction();
});
