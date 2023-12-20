var gamePattern=[]
var buttonColors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var started=false;
var level=0

function nextSequence() {
    level++;
    userClickedPattern=[]
    $("#level-title").text("Level "+ level);
    var randomNumber= Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
   console.log("compgen",randomChosenColour)
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour)
    animatePress(randomChosenColour)
    checkAnswer();
}
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("userclick",userClickedPattern)
    checkAnswer(userClickedPattern.length-1);
  });





function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length)
            setTimeout(function(){
                nextSequence();
        },1000);
    }
    else{
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }


}
function playSound(name){
    var audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(namee){    
    $("." + namee).fadeOut(500).fadeIn(500);
}
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  