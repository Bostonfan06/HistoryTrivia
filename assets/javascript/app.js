var triviaQuestions = [{
	question: "Who was the first person to sign the Delcaration of Independence?",
	answerList: ["Thomas Jefferson", "John Hancock", "Benjamin Franklin", "George Washington"],
	answer: 3
},{
	question: "The first national capitol was located in what city?",
	answerList: ["Philadelphia", "Boston", "New York", "Houston"],
	answer: 2
},{
	question: "Who wrote the Star Spangled Banner?",
	answerList: ["Betsy Ross", "Francis Scott Key", "Patrick Henry", "Thomas Jefferson"],
	answer: 1
},{
	question: "What is the northeastern most state of the USA?",
	answerList: ["New York", "Maine", "Delaware", "Vermont"],
	answer: 1
},{
	question: "Where is the Sears Tower?",
	answerList: ["Chicago", "Los Angeles", "Seattle", "Boston"],
	answer: 0
},{
	question: "What year was the Constitution of the United States formulated?",
	answerList: ["1787", "1776", "1800", "1659"],
	answer: 0
},{
	question: "What year was the Stamp Act crisis?",
	answerList: ["1775", "1798", "1776", "1765"],
	answer: 3
},{
	question: "The Boston Tea Party took place in?",
	answerList: ["1773", "1812", "1770", "1900"],
	answer: 0
},{
	question: "Where was the first Continental Congress held?",
	answerList: ["Charlestown", "Boston", "Philadelphia", "Gettysburg"],
	answer: 2
},{
	question: "Who warned the colonial militia that British General Gage was coming?",
	answerList: ["Paul Revere", "George Washintong", "Ben Franklin", "Mel Gibson"],
	answer: 0
},{
	question: "Who led the Continental Army?",
	answerList: ["Thomas Jefferson", "George Washington", "Paul Revere", "Ben Franklin"],
	answer: 1
},{
	question: "Who wrote the Declaration of Independence?",
	answerList: ["Thomas Jefferson", "John Hancock", "George Washington", "Thomas Paine"],
	answer: 0
},{
	question: "When did congress order the publication of the Declaration of Independence?",
	answerList: ["July 4th, 1800", "July 4th, 1776", "July 4th, 1750", "July 4th, 1700"],
	answer: 1
},{
	question: "Where was the Battle of Bunker Hill?",
	answerList: ["New York", "Charlestown", "Boston", "Yorktown"],
	answer: 2
},{
	question: "How many states first ratified the Constitution?",
	answerList: ["8", "9", "10", "11"],
	answer: 3
}];


var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Great Job!",
	incorrect: "Sorry, not Correct!",
	endTime: "Out of time!",
	finished: "YOUR SCORE:"
}



// Start Button
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Start Over Button
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Trying to Loop Through the Array of Questions??
for (var i = 0; i < triviaQuestions.length; i++){
	
	var randNum = Math.floor(Math.random() * triviaQuestions.length)

}

//Start of New Game
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h1>' + triviaQuestions[currentQuestion].question + '</h1>');
	for(var i = 0; i < triviaQuestions.length; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

//Timer set to 10 seconds/Functionality
function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h1>Time Remaining: ' + seconds + '</h1>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h1>Time Remaining: ' + seconds + '</h1>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 1000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 1000);
	}	
}

//Final Scoreboard
function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}