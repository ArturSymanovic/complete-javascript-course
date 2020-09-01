var Question = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

Question.prototype.display = function(){
    console.log(this.question);
    for (let index = 0; index < this.answers.length; index++) {
        const answer = this.answers[index];
        console.log('\t' +index + '. ' + answer);
    }
}

function runQuiz(){
    var score = 0;
    var questions = [];
    questions.push(
        new Question('Color of the water?', ['blue','red','green','transparent'], 3)
    );
    questions.push(
        new Question('Color of the wood?', ['brown','red','green','transparent'], 0)
    );
    questions.push(
        new Question('Color of the sun?', ['brown','red','yellow','transparent'], 2)
    );
    
    function displayScore(){
        console.log('Current Score: ' + score);
        console.log('---------------------------')
    }

    function getRandomQuestion(){
        var questionIndex = Math.round(Math.random()*(questions.length-1));    
        return questions[questionIndex];
    }
    var answer = '';
    do{
        var question = getRandomQuestion();
        question.display();
        answer = prompt('Please enter the number of the correct answer! \n Enter \'exit\' if you want to stop the quiz');
        if (answer === 'exit') {
            return;
        } else if (answer == question.correctAnswer) {
            score++;
            console.log("Correct!");
        } else {
            console.log("Wrong!");
        }
        displayScore();
    } while (answer !== 'exit')
    
}

runQuiz();