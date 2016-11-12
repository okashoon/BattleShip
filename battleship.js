var view = {
	displayMessage: function(msg){
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit(cell){
		var place = document.getElementById(cell);
		place.setAttribute("class", "hit");
	},
	displayMiss(cell){
		var place = document.getElementById(cell);
		place.setAttribute("class", "miss");
	}
};

var model = {

	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{locations: ["","",""], hits: ["","",""]},
			{locations: ["","",""], hits: ["","",""]},
			{locations: ["","",""], hits: ["","",""]}],

	fire: function(guess){
		for(var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			
			var index = ship.locations.indexOf(guess);
			if(index >= 0){
				ship.hits[index] = "hit";
				view.displayHit(guess);
				if(this.isSunk(ship)){
					this.shipsSunk++;
					view.displayMessage("you sank my ship<br>" + (this.numShips - this.shipsSunk) + " to go..");
					
				}
				return true;
			}

		}
		view.displayMiss(guess);
		view.displayMessage("you missed");
		return false;
	},

	isSunk: function(ship){
		for(var i = 0; i < this.shipLength; i++){
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	}


};

var controller = {

	guesses: 0,
	processGuess: function(guess){

		var location = parseGuess(guess);
		if(location != null){
			model.fire(location);
			this.guesses++;
			if(model.shipsSunk == model.numShips){
				view.displayMessage("you sank all of the battleships in " + this.guesses + " guesses");
			}
		}

	}



};

function parseGuess(guess){

	if(guess === null || guess.length > 2){
		console.log("please enter a number and a letter");
	} else {
		var alphabet = ["A","B","C","D","E","F","G"];

		var row = alphabet.indexOf(guess.charAt(0));
		var column = guess.charAt(1);

		if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize || isNaN(column) ){
			alert("please enter a number on the board");


		} else {

			
			return row + column;

		}
	}
	return null;

}


window.onload = init;

function init(){
	
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput  = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	addShips(model.numShips);
}

function handleFireButton(){
	console.log("handleFireButton");
	var guessInput  = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value ="";
}

function handleKeyPress(e){

	if(e.keyCode == 13){
		var fireButton = document.getElementById("fireButton");
		fireButton.onclick();
		return false;
	}


}

function buildShip(){

	var direction = "v";
	var x = Math.floor(Math.random()*2);
	if(x===0){
		direction = "h";
	}
	
	if(direction === "v"){
		var r =Math.floor(Math.random()*5);
		var c =Math.floor(Math.random()*7);
		var ship = [r.toString() + c.toString() ,(r + 1).toString() + c.toString(),(r + 2).toString() + c.toString()];
		return ship;
	} else if(direction ==="h"){
		var r =Math.floor(Math.random()*7);
		var c =Math.floor(Math.random()*5);
		var ship = [r.toString() + c.toString() ,r.toString() + (c + 1).toString(),r.toString() + (c +2).toString()];
		return ship;
	}

	
}

function addShips(numOfShips){
	var double = true;
	var ship = buildShip();
	for(var i = 0; i < numOfShips; i++){
		
		
		model.ships[i].locations = ship;
		double = true;

		
		while(double === true){
			
		ship = buildShip();
		for(var j = 0; j < model.ships[i].locations.length; j++){
			if(ship.indexOf(model.ships[i].locations[j]) === -1){
				
				double = false;
							
				
			} else {

				double = true;
				break;
			
			
			}
		}
	}


	}
}








