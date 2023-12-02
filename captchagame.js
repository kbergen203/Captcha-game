var imageSelected = []; 
var categoryName = ["Animals"];
var imageRound1 = ["parrot.png", "panda.jpg", "arctic fox.jpg", "bird.jpg", "chameleon.jpg", "tree.jpg", "branches.jpg", "tree 2.jpg", "branches.jpg", "tree 2.jpg"]; 
var imageLocation = []; //saves location of image corresponding to the location in animal[]. will display in order of order in imageLocation
//first half of array will be real animals, 2nd half will be not animals
//this way we can find whether element is an animal or not by using array.length/2>num in the future
var round = 0;
var lives = 3;
var timeInterval;

function startGame()
{
	for(let i=0;i<9;i++)
	{
		imageSelected[i] = false;
	}
	location.replace('CaptchaGame.html'); 
}

function displayImages() {
    round++;
    document.getElementById('round').innerHTML = "Round " + round;
    document.getElementById('category-selected').innerHTML = "Current Category: " + categoryName[0]; // need to change category name for each round. 

    for (let i = 0; i < 9; i++) {
        imageSelected[i] = false;
    }
	imageLocation = [];
	distributeImagesEvenly();
}

function distributeImagesEvenly() {
    let halfLength = imageRound1.length / 2;
	let realCount = 0;

    for (let i = 0; i < 9; i++) {
        let isRealImage = realCount < halfLength && Math.random() < 0.5;
        let randomImageNum = getRandomImageNumber(isRealImage, halfLength);

        imageLocation[i] = randomImageNum;
        document.getElementById("image" + (i + 1)).src = imageRound1[randomImageNum];
        document.getElementById("image" + (i + 1)).style.border = "5px solid white";

        if (isRealImage) {
            realCount++;
        }
    }
}

function getRandomImageNumber(isReal, halfLength) {
    let randomImageNum;
	let start, end;
	if (isReal) {
		start = 0;
		end = halfLength;
	} else {
		start = halfLength;
		end = imageRound1.length;
	}

    do {
        randomImageNum = Math.floor(Math.random() * (end - start)) + start;
    } while (imageLocation.includes(randomImageNum));

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
		document.getElementById('correct-or-incorrect').innerHTML = "You were correct";	
		displayImages()		
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

function getTimeRemaining(endtime) 
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((total / 1000) % 60);
  
	return {total, seconds};
}

function initializeClock(id, endtime)
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
	clearInterval(timeInterval);
    document.getElementById('end-game-message').innerHTML = "Time's up! You've completed " + (round - 1) + " captchas in 60 seconds! Try again?";
    document.getElementById("reset").style.display = "block";
    document.getElementById("homepage").style.display = "block";
}

function resetGame() 
{
	document.getElementById('end-game-message').innerHTML = "";
	document.getElementById("reset").style.display = "none";
	document.getElementById("homepage").style.display = "none";
	round = 0;
	initializeClock('clockdiv', deadline); //need to reset timer - not functional yet
	lives = 3;
	imageLocation = [];
    startGame();
}

let deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
initializeClock('clockdiv', deadline);

