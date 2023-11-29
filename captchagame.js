var imageSelected = []; 
var categoryName = ["Animals"];
var imageRound1 = ["parrot.png", "panda.jpg", "tree.jpg", "tree.jpg"]; 
var imageLocation = []; //saves location of image corresponding to the location in animal[]. will display in order of order in imageLocation
//first half of array will be real animals, 2nd half will be not animals
//this way we can find whether element is an animal or not by using array.length/2>num in the future
var round = 0;
function startGame()
{
        for(let i=0;i<9;i++)
        {
			imageSelected[i] = false;
		}
	location.replace('CaptchaGame.html'); 
}

function displayImages()
{
	round++;
	document.getElementById('round').innerHTML = "Round "+round;
	document.getElementById('category-selected').innerHTML = "Current Category: "+categoryName[round-1];
	let realCount = 0;
	for(let i=0;i<imageRound1.length;i++)
	{
		if(realCount < imageRound1.length/2 && Math.floor(Math.random() * 2) == 0) //is real animal - 50/50 odd of being real or not
		{
			let randomImageNum = Math.floor(Math.random()*(imageRound1.length/2)); //first half of array is all real animals
			while(imageLocation.includes(randomImageNum)) 
			{
                randomImageNum = Math.floor(Math.random()*(imageRound1.length/2));
            }
			imageLocation[i] = randomImageNum;
			document.getElementById("image"+(i+1)).src = imageRound1[randomImageNum]; //make inclusive for all categories later
			realCount++;
		}
		else
		{
			let randomImageNum = Math.floor(Math.random()*(imageRound1.length/2))+imageRound1.length/2; //2nd half of array is all fake animals
			while(imageLocation.includes(randomImageNum)) 
			{
                randomImageNum = Math.floor(Math.random()*(imageRound1.length/2))+imageRound1.length/2;
            }
			imageLocation[i] = randomImageNum;
			document.getElementById("image"+(i+1)).src = imageRound1[randomImageNum]; //make inclusive for all categories later
		}
	}
}

function resetGame()
{
	document.getElementById('end-game-message').innerHTML = "";
	document.getElementById("reset").style.display = "none";
	round = 0;
	//reset timer
	displayImages();
}

function imageSelected(element)
{

}

function border() {
  document.getElementById("image4").style.border = "5px solid blue";
}

function getTimeRemaining(endtime) 
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((total / 1000) % 60);
  
	return {total, seconds};
}

function initializeClock(id, endtime)
{
	let clock = document.getElementById(id);
	let secondsSpan = clock.querySelector('.seconds');

	function updateClock() 
	{
		let t = getTimeRemaining(endtime);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0)
		{
			clearInterval(timeinterval); 
			document.getElementById('end-game-message').innerHTML = "Time's up! You've completed "+(round-1)+" captchas in 60 seconds! Try again?";
			document.getElementById("reset").style.display = "block";
		}
	}
	updateClock();
	let timeinterval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
initializeClock('clockdiv', deadline);


