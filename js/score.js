var mode = "";
$(document).ready(function() {
	console.log("working");
	mode = "norm";
	
	updateText();	
	startGame();
});

function ClickingStuff(){

	 $("#teamA").click(function() {
		updateScore('a');
	});
	$("#teamB").click(function() {
		updateScore('b');
	});
	if ((Number(sessionStorage.timeoutsA) > 0) || (!sessionStorage.timeoutsA)){
		$("#outA").click(function() {
		callTimeOut('a');
		});
	}
	if ((Number(sessionStorage.timeoutsB) > 0) || (!sessionStorage.timeoutsB)){
		$("#outB").click(function() {
			callTimeOut('b');
		});
	}
}

function startGame(){
	if(typeof(Storage) !== "undefined"){
			if (sessionStorage.inprog){
				if (sessionStorage.inprog == "going"){
					ClickingStuff();
				}
			}else {
				sessionStorage.inprog = "going";
				ClickingStuff();
			}
	}
}

function updateScore(team) {
	if (team=="a"){
		if(typeof(Storage) !== "undefined"){
			if (sessionStorage.ScoreAVal){
				sessionStorage.ScoreAVal = Number(sessionStorage.ScoreAVal)+1;
			}else {
				sessionStorage.ScoreAVal = 1;
			}
		}
	} else	if (team=="b"){
		if(typeof(Storage) !== "undefined"){
			if (sessionStorage.ScoreBVal){
				sessionStorage.ScoreBVal = Number(sessionStorage.ScoreBVal)+1;
			}else {
				sessionStorage.ScoreBVal = 1;
			}
		}
	}
	if(typeof(Storage) !== "undefined"){
		if (!sessionStorage.setAVal){
			sessionStorage.setAVal = 0;
		}	
	}
	if(typeof(Storage) !== "undefined"){
		if (!sessionStorage.setBVal){
			sessionStorage.setBVal = 0;
		}	
	}

	switch (mode) {
		case "norm":
			if ((Number(sessionStorage.setAVal)+Number(sessionStorage.setBVal))<=1){
				if (Number(sessionStorage.ScoreAVal) >= 25){
					sessionStorage.ScoreAVal = 0;
					sessionStorage.ScoreBVal = 0;
					sessionStorage.timeoutsA = 2;
					sessionStorage.timeoutsB = 2;
			
					if (sessionStorage.setAVal){
						sessionStorage.setAVal = Number(sessionStorage.setAVal)+1;
					}
				} 	else if (Number(sessionStorage.ScoreBVal) >= 25){
						sessionStorage.ScoreBVal = 0;
						sessionStorage.ScoreAVal = 0;
						if (sessionStorage.setBVal){
							sessionStorage.setBVal = Number(sessionStorage.setBVal)+1;
						}
					}
			} else {
				if (Number(sessionStorage.ScoreAVal) >= 15){
						if (sessionStorage.setAVal){
							sessionStorage.setAVal = Number(sessionStorage.setAVal)+1;
							$("#teamA").prop("onclick",null).off("click");
							$("#teamB").prop("onclick",null).off("click");
							sessionStorage.inprog = "complete";
						}
				} 	else if (Number(sessionStorage.ScoreBVal) >= 15){
							if (sessionStorage.setBVal){
								sessionStorage.setBVal = Number(sessionStorage.setBVal)+1;
								$("#teamA").prop("onclick",null).off("click");
								$("#teamB").prop("onclick",null).off("click");
								sessionStorage.inprog = "complete";
							}
					}
			}
			updateText();
			break;
	}
}

function callTimeOut(team){
		if (team == "a"){
			if(typeof(Storage) !== "undefined"){
				if (!sessionStorage.timeoutsA){
					sessionStorage.timeoutsA = 1;
				}else {
					sessionStorage.timeoutsA = Number(sessionStorage.timeoutsA)-1;
					if (Number(sessionStorage.timeoutsA) <=0){
						$("#outA").prop("onclick",null).off("click");
					}
				}
			}
		} else	if (team=="b"){
			if(typeof(Storage) !== "undefined"){
				if (!sessionStorage.timeoutsB){
					sessionStorage.timeoutsB = 1;
				}else {
					sessionStorage.timeoutsB = Number(sessionStorage.timeoutsB)-1;
					if (Number(sessionStorage.timeoutsB) <=0) {
						$("#outB").prop("onclick",null).off("click");
					}
				}
			}
		}
		updateText();
	}

function updateText(){
	$("#scoreA").text(sessionStorage.ScoreAVal);
	$("#scoreB").text(sessionStorage.ScoreBVal);
	$("#setA").text(sessionStorage.setAVal);
	$("#setB").text(sessionStorage.setBVal);
	$("#outAVal").text(sessionStorage.timeoutsA);
	$("#outBVal").text(sessionStorage.timeoutsB);
}