// Initial play
//----------------------------------------------------------------------------------
/*console.log('Hello World!');
console.log('Artur\'s');
console.log(24.543);
console.log(typeof 5.3);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof 'a');
console.log(typeof 'ab');
console.log(typeof "a");
console.log(typeof "ab");
console.log(typeof NaN);*/
//----------------------------------------------------------------------------------


// Coding Challenge 1
//----------------------------------------------------------------------------------
/* var massMike = 82;
var massJohn = 100;
var heightMike = 1.76;
var heightJohn = 1.92;
var bmiMike = massMike/(heightMike*heightMike);
var bmiJohn = massJohn/(heightJohn*heightJohn);
var isMikeBmiHigher = bmiMike > bmiJohn;
console.log('Is Mike\'s BMI higher than John\'s BMI? ', isMikeBmiHigher); */
//----------------------------------------------------------------------------------


// Coding Challenge 2
//----------------------------------------------------------------------------------
/* var scoresJohn = [1, 30, 30];
var scoresMike = [1, 1, 50];
var scoresMary = [1, 1, 50];
function getAverageScore(scoreArray){
    var average = 0;
    for (const score of scoreArray) {
        average+=score;
    }
    return average;
}
var averageJohn = getAverageScore(scoresJohn);
var averageMike = getAverageScore(scoresMike);
var averageMary = getAverageScore(scoresMary);
switch (true) {
    case averageJohn>averageMike && averageJohn > averageMary:
        console.log("John won!");
        break;
    case averageMike>averageJohn && averageMike > averageMary:
        console.log("Mike won!");
        break;
    case averageMary>averageJohn && averageMary > averageMike:
        console.log("Mary won!");
        break;        
    case averageJohn === averageMike && averageJohn > averageMary:
        console.log("John and Mike shared first place!");
        break;
    case averageJohn === averageMary && averageJohn > averageMike:
        console.log("John and Mary shared first place!");
        break;
    case averageMike === averageMary && averageMike > averageJohn:
        console.log("Mike and Mary shared first place!");
        break;               
    default:
        console.log("Three way draw!")
        break;
} */
//----------------------------------------------------------------------------------


// Coding Challenge 3
//----------------------------------------------------------------------------------
/* var initialBills = [10, 100, 1000];

function getTipAmount(initialBill){
    switch (true) {
        case initialBill<50:
            return initialBill*0.2;
        case initialBill>=50 && initialBill <= 200:
            return initialBill*0.15;
        default:
            return initialBill*0.1;
    }
}

var tipAmounts = new Array();
var finalPaidAmounts = new Array();

for (const initialBill of initialBills) {
    var tip = getTipAmount(initialBill);
    tipAmounts.push(tip);
    finalPaidAmounts.push(initialBill + tip);
}

console.log('Initial Bills:' + initialBills);
console.log('Tip Amounts:' + tipAmounts);
console.log('Final Paid Amounts:' + finalPaidAmounts);
 */
//----------------------------------------------------------------------------------


// Coding Challenge 4
//----------------------------------------------------------------------------------
/* var John = new Object();
John.name = 'John';
John.mass = 82;
John.height = 1.74;
John.CalculateBmi = function(){
    this.bmi = (this.mass / (this.height * this.height)).toFixed(2);
    return this.bmi;
}
var Mark = {
    name:'Mark',
    mass: 82,
    height: 1.74,
    CalculateBmi: function(){
        this.bmi = (this.mass / (this.height * this.height)).toFixed(2);
        return this.bmi;
    }
}
if (John.CalculateBmi()>Mark.CalculateBmi()) {
    console.log(
        John.name + '\'s BMI (' + John.bmi + ') is higher than ' 
        + Mark.name + '\'s BMI (' + Mark.bmi +')'
    );
} else if(John.bmi<Mark.bmi) {
    console.log(
        Mark.name + '\'s BMI (' + Mark.bmi + ') is higher than '
        + John.name + '\'s BMI (' + John.bmi +')'
    );
}else {
    console.log(
        John.name + '\'s BMI (' + John.bmi + ') is equal to '
        + Mark.name + '\'s BMI (' + Mark.bmi +')'
    );
} */
//----------------------------------------------------------------------------------


// Coding Challenge 5
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------

