$(document).ready(function() {
	console.log("working");
	$("#teamA").click(function() {
		updateScore('a');
	});
	$("#teamB").click(function(){
		updateScore('b');
	});
});

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

	if (Number(sessionStorage.ScoreAVal) >= 25){
		sessionStorage.ScoreAVal = 0;
		sessionStorage.ScoreBVal = 0;
		if(typeof(Storage) !== "undefined"){
			if (sessionStorage.setAVal){
				sessionStorage.setAVal = Number(sessionStorage.setAVal)+1;
			}else {
				sessionStorage.setAVal = 1;
			}
		}
	} 	else if (Number(sessionStorage.ScoreBVal) >= 25){
		sessionStorage.ScoreBVal = 0;
		sessionStorage.ScoreAVal = 0;
		if(typeof(Storage) !== "undefined"){
			if (sessionStorage.setBVal){
				sessionStorage.setBVal = Number(sessionStorage.setBVal)+1;
			}else {
				sessionStorage.setBVal = 1;
			}
		}
	}

	$("#scoreA").text(sessionStorage.ScoreAVal);
	$("#scoreB").text(sessionStorage.ScoreBVal);
	$("#setA").text(sessionStorage.setAVal);
	$("setB").text(sessionStorage.setBVal);
}