var game_pattern = [];
var user_pattern = [];
var color = ["blue" , "green" , "red" , "yellow"]
let flag = false; //// false : game Not started.
let level = 0;
var highScore = 0;

////letus start the game...
$("button").on("click" , function()
{
  if(flag == false)
  {
    flag = true;
    nextSequence();
    $(this).addClass("quit");
    $(this).text("Quit");
  }
  else
  {
    resstart();
  }
});


/////// function for next level...
function nextSequence()
{
  level++;
  $("#level-title").text("Level : " + level);
  var random_num = Math.floor(Math.random() * 4);
  var level_color = color[random_num];
  $("#" + level_color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(level_color);
  game_pattern.push(level_color);
};


/////// clicking for patterns.
$(".btn").on("click" , function()
{
  if(flag == true)
  {
    var choosen_color = $(this).attr("id");
    user_pattern.push(choosen_color);
    animate(choosen_color);
    checkAnswer(user_pattern.length);
  }
});



//////////////// check for answer.....
function checkAnswer(count)
{
  if(game_pattern[count-1] === user_pattern[count - 1])
  {
    if(game_pattern.length === count)
    {
      user_pattern = [];
      $("#your_score").text("Your Score : " + level);
      setTimeout(function(){nextSequence()} , 800);
    };
  }
  else
  {
    resstart();
  };
}



////// playing sounds for different key;
function playSound(name) {
  switch (name) {
    case "green":
      var aud = new Audio('sounds/green.mp3');
      aud.play();
      break;
    case "blue":
      var aud = new Audio('sounds/blue.mp3');
      aud.play();
      break;
    case "red":
      var aud = new Audio('sounds/red.mp3');
      aud.play();
      break;
    case "yellow":
      var aud = new Audio('sounds/yellow.mp3');
      aud.play();
      break;
    case "wrong":
      var aud = new Audio('sounds/wrong.mp3');
      aud.play();
      break;

  };
};



function animate(color)
{
  $("#" + color).addClass("pressed");
  setTimeout(function()
{
  $("#" + color).removeClass("pressed");
} , 100);
};



/////////// restart the game...
function resstart()
{
  ////game not started
  flag = false;
///// converting quir button to strart btn.
  $("button").removeClass("quit");
  $("button").text("Start");
  ///warning msg
  $("#level-title").text("Wrong!" + " Your Score : " + (level - 1));

  ///playing sound of wromng
  playSound("wrong");

  /// adding and removinf quit sound..
  $("body").addClass("game-over");
  setTimeout(function()
{
  $("body").removeClass("game-over")
} , 200);


///// updating highscore...
  if(level-1 > highScore)
  {
    highScore = level - 1;
    $("#high_score").text("High Score : " + (level-1));
  }

  ////making level zero
  level = 0;
  $("#your_score").text("Your Score : " + level);
  user_pattern = [];
  game_pattern = [];
}
