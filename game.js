//VARIABLES AND CONSTANTS
var canvas;
var ctx;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 12;
var ballSpeedY = 6;
var paddle1Y = 250;
var paddle2Y = 100;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 13;
var p1score = 0;
var p2score = 0;
const WINNING_SCORE = 11;
var showingWinScreen = false;







//COMPUTER MOVEMENT
function MovementComp() {
  var paddle2Ycenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2Ycenter < ballY - PADDLE_HEIGHT / 3) {
    paddle2Y += 6;
  } else if (paddle2Ycenter > ballY + PADDLE_HEIGHT / 3) {
    paddle2Y -= 6;
  }
}






//MOUSE POSITIONING FUNCTION
function mousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY,
  };
}






//RESET ON MOUSE CLICK
function handleMouseClick(evt) {
  if (showingWinScreen == true) {
    if (p1score >= WINNING_SCORE)
    {p1score = -1;
    p2score = 0;
    }
    if (p2score >= WINNING_SCORE)
    {p1score = 0;
    p2score = -1;
    }
    
    
    showingWinScreen = false;
  }
  
}








//GENERAL
window.onload = function () {
  console.log("Begin!");
    canvas = document.getElementById("gameCanvas");
      ctx = canvas.getContext("2d");
      var fps = 30;
       setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / fps);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', function (evt) {
    var mousePos = mousePosition(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};






//RESETS BALL TO CENTER
function resetball() {
  if (p1score >= WINNING_SCORE || p2score >= WINNING_SCORE) {
    showingWinScreen = true;

  } else {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
}














//MOVEMENT
function moveEverything() {
    MovementComp();

  if (showingWinScreen) {
    if (p1score >= WINNING_SCORE) {
      ctx.font = "40px Arial";
      ctx.fillStyle = "rgb(102, 255, 51)";
      ctx.fillText ("Player 1 wins!",canvas.width / 2 - 130,
      canvas.height / 2)
      
      
    } else if (p2score >= WINNING_SCORE) {
      ctx.font = "40px Arial";
      ctx.fillStyle = "red";
      ctx.fillText ("Computer wins!",canvas.width / 2 - 140,
      canvas.height / 2)

    }

    addText(
      "Click to continue",
      canvas.width / 2 - 80,
      canvas.height / 2 + 150,
      "white"
    );
    return;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.3;
    } else {
      p2score++;
      resetball();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      p1score++;
      resetball();
    }
  }
  if (ballY > canvas.height || ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  
}




















//DRAWS EVERY OBJECT
function drawEverything() {
  //canvas
  drawRect(0, 0, canvas.width, canvas.height, "rgb(52, 52, 126)");
  if (showingWinScreen) {
    return;
  }
  //p1 paddle
  drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //p2 paddle
  drawRect(canvas.width - 13, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  //ball
  drawCircle(10, "red");
  //text
  addText(p1score, 150, 100, "white");
  addText(p2score, canvas.width - 160, 100, "white");
}

//RECTANGLE DRAWING FUNCTION
function drawRect(Xpos, Ypos, wid, len, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = 'black';
  ctx.fillRect(Xpos, Ypos, wid, len);
  
}

//CIRCLE DRAWING FUNCTION
function drawCircle(radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(ballX, ballY, radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.lineWidth = radius * 0.03;
  ctx.stroke();
}

//ADD TEXT
function addText(string, Xpos, Ypos, color) {
  ctx.font = "20px Arial";
  ctx.fillStyle = color;
  ctx.fillText(string, Xpos, Ypos);
}
