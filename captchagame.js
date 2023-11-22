var categoryName = "test";
var imageSelected = []; 
var animal1 = ["parrot.png", "panda.jpg", "tree.jpg", "tree.jpg"]; 
var imageLocation = []; //saves location of image corresponding to the location in animal[]. will display in order of order in imageLocation
//first half of array will be real animals, 2nd half will be not animals
//this way we can find whether element is an animal or not by using array.length/2>num in the future

function startGame()
{
	selectElement = document.querySelector('#categoryMenu');
        categoryName = selectElement.value;
        for(let i=0;i<9;i++)
        {
			imageSelected[i] = false;
		}
		
	//categoryName = document.getElementById('#categoryMenu').innerHTML; //doesn't work
	location.replace('CaptchaGame.html'); 
}

function displayImages()
{
	let currentImage = "image";
	let realCount = 0;
	let fakeCount = 0;
	for(let i=0;i<animal1.length;i++)
	{
		if(realCount < animal1.length/2-1 && Math.floor(Math.random() * 2) == 0) //is real animal - 50/50 odd of being real or not
		{
			let randomImageNum = Math.floor(Math.random()*(animal1.length/2)); //first half of array is all real animals
			let uniqueNumber = false;
			while(!uniqueNumber)
			{
				uniqueNumber = true;
				for(let j=0;j<imageLocation.length; j++)
				{
					if(imageLocation[j] == randomImageNum)//if image is already displayed on grid
					{
						uniqueNumber = false;
					}
				}
			}
			imageLocation[i] = randomImageNum;
			document.getElementById("image"+(i+1)).src = animal1[randomImageNum]; //make inclusive for all categories later
			realCount++;
		}
		else
		{
			let randomImageNum = Math.floor(Math.random()*(animal1.length/2))+animal1.length/2; //2nd half of array is all fake animals
			let uniqueNumber = false;
			while(!uniqueNumber)
			{
				uniqueNumber = true;
				for(let j=0;j<imageLocation.length; j++)
				{
					if(imageLocation[j] == randomImageNum)//if image is already displayed on grid
					{
						uniqueNumber = false;
					}
				}
			}
			imageLocation[i] = randomImageNum;
			document.getElementById("image"+(i+1)).src = animal1[randomImageNum]; //make inclusive for all categories later
		}
	}
}

function imageSelected(element)
{
	/*
	 * //unfinished - will check against array of ints to see if this id is part of the correct set of images
	let str = element.id;
	if(str.substring(0,str.length-2).parseInt() == ) 
	{
		
	}
	* */
}

function getTimeRemaining(endtime) 
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor((total / 1000) % 60);
  
	return {total, seconds};
}

function initializeClock(id, endtime)
{
	document.querySelector('#category-selected').textContent = "Category selected: "+categoryName;
	//document.getElementById('category-selected').innerHTML= "Category selected: "+categoryName;
	let clock = document.getElementById(id);
	let secondsSpan = clock.querySelector('.seconds');

	function updateClock() 
	{
		let t = getTimeRemaining(endtime);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0)
		{
			clearInterval(timeinterval); 
			//add method call that will change to end game status
		}
	}
	updateClock();
	let timeinterval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 1 * 59 * 1000);
initializeClock('clockdiv', deadline);


