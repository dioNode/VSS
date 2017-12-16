var mode = "";
$(document).ready(function() {
	console.log("working");
	mode = "norm";
	
	$("#scoreA").text(sessionStorage.ScoreAVal);
	$("#scoreB").text(sessionStorage.ScoreBVal);
	$("#setA").text(sessionStorage.setAVal);
	$("#setB").text(sessionStorage.setBVal);
	$("outA").text(sessionStorage.timeoutsA);
	$("outB").text(sessionStorage.timeoutsB);
	
	startGame();
});

function ClickingStuff(){

	 $("#teamA").click(function() {
		updateScore('a');
	});
	$("#teamB").click(function() {
		updateScore('b');
	});
	$("#outA").click(function() {
		callTimeOut('a');
	});
	$("#outB").click(function() {
		callTimeOut('b');
	})
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
			$("#scoreA").text(sessionStorage.ScoreAVal);
			$("#scoreB").text(sessionStorage.ScoreBVal);
			$("#setA").text(sessionStorage.setAVal);
			$("#setB").text(sessionStorage.setBVal);
			break;
	}
}

function callTimeOut(team){

		if (team == "a"){
			if(typeof(Storage) !== "undefined"){
				if (Number(sessionStorage.timeoutsA) <= 0){
					sessionStorage.timeoutsA = Number(sessionStorage.timeoutsA)-1;
					$("#outA").prop("onclick",null).off("click");
				}else {
					sessionStorage.timeoutsA = 2;
				}
			}
		} else	if (team=="b"){
			if(typeof(Storage) !== "undefined"){
				if (Number(sessionStorage.timeoutsB)<=0){
					sessionStorage.timeoutsB = Number(sessionStorage.timeoutsB)-1;
					$("#outB").prop("onclick",null).off("click");
				}else {
					sessionStorage.timeoutsB = 2;
				}
			}
		}
		$("outA").text(sessionStorage.timeoutsA);
		$("outB").text(sessionStorage.timeoutsB);
	}