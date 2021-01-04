var score = [0, 0, 0, 0, 0];
var round = ["empty"];

function test(){
    document.getElementById("test").innerHTML = "Yay it works!";
}

function Invalid_input_alert(){
    alert("Invalid Input. Please make sure you chose at least one player and the score is a valid number between 1 and 13.");
}

function isInteger(s){
    s = String(s);
    for(var i=0, len = s.length; i<len; i++){
        if(s[i]<'0' || s[i]>'9') return false;
    }
    return true;

}

function update_scoreboard(){
    for (var i = 1; i <= 4; i++) {
        console.log("p" + i + "_score");
        console.log("Player " + i + "score: " + score[i]);
        document.getElementById("p" + i + "_score").innerHTML = "Player " + i + " score: " + score[i];
    }
}

function update(){
    var radios = document.getElementsByName('selected_player');
    var chosen_player = 0;
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById("adds_p"+i).checked) {
            chosen_player = document.getElementById("adds_p"+i).value;
            break;
        }
    }
    var score_to_be_added = document.getElementById('adds').value;

    console.log("UPDATING - " + chosen_player + " | " + score_to_be_added);
    console.log(isInteger(score_to_be_added));

    if(chosen_player == 0 || !isInteger(score_to_be_added) || parseInt(score_to_be_added) <= 0 || parseInt(score_to_be_added) > 13){
        Invalid_input_alert();
        return 0;
    }

    score[chosen_player] += parseInt(score_to_be_added);
    round.push(chosen_player + toString(score_to_be_added));

    update_scoreboard();
}
