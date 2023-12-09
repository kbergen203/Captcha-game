var imageSelected = []; 
var categoryName = ["Animals", "Modes of Transportation", "Crosswalks", "Bridges", "Stairs", "Fruits", "Music", "School Supplies", "Wedding", "Technology"];
var imageRound1 = ["parrot.png", "panda.jpg", "arctic fox.jpg", "bird.jpg", "chameleon.jpg", "tree.jpg", "branches.jpg", "tree 2.jpg", "jungle.png", "snow.png"]; 
var imageRound2 = ["car.png", "ferry.png", "plane.png", "train.png", "bus.png", "empty road.png", "cloudy sky.png", "tire.png", "pier.png", "railroad crossing.png"]; 
var imageRound3 = ["crosswalk.png", "beatles.png", "suburb.png", "mcdonalds.png", "shibuya.png", "empty suburb.png", "highway.png", "suburb 2.png", "bike lane.png", "sunny road.png"];
var imageRound4 = ["golden gate.png", "white bridge.png", "london bridge.png", "venice.png", "rainbow bridge.png", "arch.png", "roller coaster.png", "tunnel.png", "arch tree.png", "arch tree 2.png"];
var allImageArrays = [imageRound1, imageRound2, imageRound3, imageRound4];
var imageLocation = []; //saves location of image corresponding to the location in animal[]. will display in order of order in imageLocation
//first half of array will be real images, 2nd half will be not part of category

var leaderboardData = [];

var round = 0;
var lives = 3;
var timeInterval;
var gameEnded = false;


function displayImages() {
	gameEnded = false;
    round++;
    if(round>10) 
    {
		endGame();
		round--;
	}
    document.getElementById('round').innerHTML = "Round " + round;
    document.getElementById('category-selected').innerHTML = "Current Category: " + categoryName[round-1];

    for (let i = 0; i < 9; i++) {
        imageSelected[i] = false;
        imageLocation[i] = null;
    }
	distributeImagesEvenly(allImageArrays[round-1]);
}

function distributeImagesEvenly(array) {
    let halfLength = array.length / 2;
	let realCount = 0;

    for (let i = 0; i < 9; i++) {
        let isRealImage = realCount < halfLength && ((i - realCount >= halfLength) || Math.random() < 0.5);
        let randomImageNum = getRandomImageNumber(isRealImage, halfLength, array);

        imageLocation[i] = randomImageNum;
        document.getElementById("image" + (i + 1)).src = array[randomImageNum];
        document.getElementById("image" + (i + 1)).style.border = "5px solid white";

        if (isRealImage) {
            realCount++;
        }
    }
}

function getRandomImageNumber(isReal, halfLength, array) {
    let randomImageNum;
	let start, end;
	if (isReal) {
		start = 0;
		end = halfLength;
	} else {
		start = halfLength;
		end = array.length;
	}

    do {
        randomImageNum = Math.floor(Math.random() * (end - start)) + start;
    } while (imageLocation.includes(randomImageNum) || randomImageNum>=array.length || randomImageNum<0);

    return randomImageNum;
}

function imageClicked(str) {
	let arrayIndex = parseInt(str.charAt(str.length-1))-1;
	imageSelected[arrayIndex] = !imageSelected[arrayIndex];
	if(imageSelected[arrayIndex])
	{
		document.getElementById(str).style.border = "5px solid blue";
	}
	else
	{
		document.getElementById(str).style.border = "5px solid white";
	}

}

function submitCaptcha()
{
	if(!gameEnded) //only can submit if game is not over
	{
		let win = true;
		for(let i=0;i<9;i++)
		{
			if(imageLocation[i]<imageRound1.length/2 && !imageSelected[i]) //image is real & user said not real
			{
					win = false;
			}
			if(imageLocation[i]>=imageRound1.length/2 && imageSelected[i]) //image is fake & user said  real
			{
					win = false;
			}
		}
		if(win)
		{
			document.getElementById('correct-or-incorrect').innerHTML = "You were correct!";	
			displayImages();		
		}
		else
		{
			lives--;
			document.getElementById('correct-or-incorrect').innerHTML = "You were incorrect. "+lives+" lives remain.";
			if(lives<=0)
			{ 
				endGame();
			}
		}
	}
}

function getTimeRemaining(endtime) 
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((total / 1000) % 60);
  
	return {total, seconds};
}

function initializeClock(id, endtime) //timer taken from https://www.sitepoint.com/community/t/countdown-timer/358565/7
{
	deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
	let clock = document.getElementById(id);
	let secondsSpan = clock.querySelector('.seconds');

	function updateClock() 
	{
		let t = getTimeRemaining(endtime);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0)
		{
			endGame();
		}
	}
	updateClock();
	timeInterval = setInterval(updateClock, 1000);
}

function endGame() {
	gameEnded = true;
	clearInterval(timeInterval);
    document.getElementById("captcha").style.display = "none";
    document.getElementById('end-game-message1').innerHTML = "Time's up! You've completed " + (round - 1) + " captchas in 60 seconds! Try again?";
    document.getElementById('end-game-message1').style.display = "block";
    document.getElementById("reset").style.display = "block";
    document.getElementById('end-game-message2').style.display = "block";
	document.getElementById("nicknameSection").style.display = "block";
    document.getElementById("homepage-option").style.display = "block";
}

function resetGame() 
{
	gameEnded = false;
	document.getElementById("captcha").style.display = "block";
	document.getElementById('correct-or-incorrect').innerHTML = "";
	document.getElementById('end-game-message1').style.display = "none";
	document.getElementById("reset").style.display = "none";
	document.getElementById('end-game-message2').style.display = "none";
	document.getElementById("nicknameSection").style.display = "none";
	document.getElementById("homepage-option").style.display = "none";
	round = 0; 
	lives = 3;
	clearInterval(timeInterval);
	let newDeadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
	initializeClock('clockdiv', newDeadline); //need to reset timer - not functional yet
    displayImages();
}
function updateScore() {
    var data = localStorage.getItem('leaderboardData');
    if (data) 
		leaderboardData = JSON.parse(data);
	else
		leaderboardData = [];

    var nameInput = document.getElementById('nickname');
    var name = nameInput.value.trim();

    leaderboardData.push({ rank: 1, nickname: name, round: round });

    leaderboardData.sort(function(a, b) {
        return b.round - a.round; // Sort in descending order of rounds completed
    });

    for (let i = 0; i < leaderboardData.length; i++) {
        leaderboardData[i].rank = i + 1; 
	}

    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
    location.replace('LeaderBoard.html');
}


document.addEventListener('DOMContentLoaded', function() {
	var data = localStorage.getItem('leaderboardData');
	if (data) {	    
		updateLeaderboard(JSON.parse(data));
	}
});
function clearLeaderBoard() {
	localStorage.removeItem('leaderboardData');
    location.replace('LeaderBoard.html');
}

function updateLeaderboard(data) {
	var table = document.getElementById('leaderboard');
	while(table.rows.length > 1) {
		table.deleteRow(1);
	}
	for(var i = 0; i < data.length; i++) {
		var row = table.insertRow(-1);
		var entry1 = row.insertCell(0);
		var entry2 = row.insertCell(1);
		var entry3 = row.insertCell(2);
	
		entry1.textContent = data[i].rank;
		entry2.textContent = data[i].nickname;
		entry3.textContent = data[i].round;
	}
}


let deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
initializeClock('clockdiv', deadline);

