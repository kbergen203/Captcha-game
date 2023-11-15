var categoryName = "";
function startGame()
{
	categoryName = document.querySelector('#categoryMenu').value;
	location.replace('CaptchaGame.html'); 
}

function getTimeRemaining(endtime) 
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((total / 1000) % 60);
  
	return {total, seconds};
}

function initializeClock(id, endtime)
{
	document.getElementById('category-selected').innerHTML= "Category selected: "+categoryName;
	let clock = document.getElementById(id);
	let secondsSpan = clock.querySelector('.seconds');

	function updateClock() 
	{
		let t = getTimeRemaining(endtime);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0)
		{
			clearInterval(timeinterval); //add change to end game status
		}
	}
	updateClock();
	let timeinterval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
initializeClock('clockdiv', deadline);












