var score = [0, 0, 0, 0, 0];
var round = ["empty"];
var lowest_score_players;
var punishment_list = ["Punishment 1","Punishment 2","Punishment 3"];
var default_punishment_list = punishment_list;

function test(){
    document.getElementById("test").innerHTML = "Yay it works!";
}

function Invalid_input_alert(){
    alert("Invalid Input. Please make sure you chose at least one player and the score is a valid number between 1 and 13.");
}

function isInteger(s){
    s = String(s);
    for(var i=0, len = s.length; i<len; i++){
        if((s[i]<'0' || s[i]>'9') && s[i] != ' ') return false;
    }
    return true;

}

function restore_to_default(){
    punishment_list = default_punishment_list;
}

function reset_textbox(){
    document.getElementById("custom_list").value = "";
}

function generate_punishment_list(){
    var new_list = [], temp = "", s = document.getElementById("custom_list").value, size = 0;
    for(var i = 0; i < s.length; i++){
        temp += s[i];
        if(s[i] == '\n' || i + 1 == s.length){
            new_list.push(temp);
            temp="";
            size++;
        }
    }
    if(size < 3){
        alert("Plase add at least 3 punishments into the textbox.");
    }
    else{
        for(var i = 0; i < size; i++){
            console.log(new_list[i]);
        }
        punishment_list = new_list;
    }
}

function generate_slot(){
    var temp_html = "";
    for(var i = 0; i < punishment_list.length ; i++){
        temp_html += "<p id=\"slot_element" + i + "\"> Punishment: " + punishment_list[i] + " </p>"
    }
    document.getElementById("slot").innerHTML = temp_html;
}

function update_slot(shown_slot){
    var count = 0;
    var x = setInterval(function() {
        count++;
        $("#slot_element" + shown_slot).hide();
        shown_slot = Math.floor(Math.random() * punishment_list.length);
        $("#slot_element" + shown_slot).show();
        if (count == 150) {
            clearInterval(x);
        }
    }, 10);
}

function enable(){
    $('#g_punishment').removeAttr('disabled');
}

function generate_punishment(){
    $('#g_punishment').attr('disabled', 'disabled');
    setTimeout(enable, 2000);
    generate_slot();
    for(var i = 1; i < punishment_list.length ; i++) $("#slot_element"+i).hide();
    var shown_slot = update_slot(0,0);
}

function update_scoreboard(){
    for (var i = 1; i <= 4; i++) {
        console.log("p" + i + "_score");
        console.log("Player " + i + "score: " + score[i]);
        document.getElementById("p" + i + "_score").innerHTML = "Player " + i + " score: " + score[i];
    }
}

function update_lowest(){
    var min=1e9;
    for(var i = 1; i <= 4; i++){
        if(min > score[i]) min = score[i];
    }
    var output = "Player to be punished: ";
    lowest_score_players = "";
    var cnt = 0;
    for(var i = 1; i <= 4; i++){
        if(min == score[i]){
            if(cnt) lowest_score_players += ", ";
            lowest += "Player " + i;
            if(cnt) output += ", ";
            output += "Player " + i;
            cnt++;
        }
    }
    if(cnt == 4) output = "Player to be punished: None";
    document.getElementById("lowest").innerHTML = output;
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
    update_lowest();
}