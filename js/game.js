'use strict';

function Game(canvas){
  this.player = null;
  this.rock = null;
  this.wall = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
  this.backgroundXspeed = 0;
  this.turn = 1;
  this.finalVectorPos = null;
}

//Add initial elements and events ----------

Game.prototype.start = function(){
  this.backgroundImg = new Image();
  this.backgroundImg.src = "../img/skybg.gif";

  this.backgroundImg2 = new Image();
  this.backgroundImg2.src = "../img/mountainsbg.png";
 
  this.player = new Player(this.canvas,this.canvas.width/5);
  this.player2 = new Player(this.canvas,4*this.canvas.width/5);
  this.rock = new Rock(this.canvas);
  this.wall = new Wall(this.canvas);

//Event listeners ----------

  this.newMovement= this.playerMovement.bind(this);
  this.stopMovement = this.playerStopMovement.bind(this);
  this.newInitialPos = this.setThrowValues.bind(this);
  this.newFinalPos = this.throwRock.bind(this);
  this.drawHandlerLine = this.setCursorPosition.bind(this);

  document.addEventListener('keydown', this.newMovement);
  document.addEventListener('mousedown',  this.newInitialPos);
  document.addEventListener('mouseup', this.newFinalPos);
  document.addEventListener('keyup', this.stopMovement);
};

//Star game loop ----------

Game.prototype.startLoop = function(){
  const loop = () => {
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.checkCollision();
    if (this.gameOver === false){
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
};

//Game methods ----------

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.updateCanvas = function(){
  this.player.updateXPosition();
  this.player2.updateXPosition();
  if (this.turn % 2 !== 0) {
    this.rock.setPositionStart(this.player.updateXPosition()+this.player.size/2-this.rock.size/2);
  } else {
    this.rock.setPositionStart(this.player2.updateXPosition()+this.player2.size/2-this.rock.size/2);
  }
  this.rock.updatePosition();
}

Game.prototype.drawCanvas = function(){
  this.drawBackground();
  this.player.draw('purple');
  this.player2.draw('yellow');
  this.rock.draw();
  this.wall.draw();

  if(this.finalVectorPos){
    this.drawPowerLine();}
}

Game.prototype.drawBackground = function(){
  this.ctx.drawImage(this.backgroundImg,this.backgroundXspeed ,0);
  this.ctx.drawImage(this.backgroundImg, this.backgroundImg.width - Math.abs(this.backgroundXspeed),0);
  this.ctx.drawImage(this.backgroundImg, this.backgroundImg.width*2 - Math.abs(this.backgroundXspeed),0);

  if (Math.abs(this.backgroundXspeed) > this.backgroundImg.width) {
    this.backgroundXspeed = 0;
  }
  this.backgroundXspeed -= 0.1;

  this.ctx.drawImage(this.backgroundImg2,0,this.canvas.height - this.backgroundImg2.height);
  this.ctx.drawImage(this.backgroundImg2,this.backgroundImg2.width,this.canvas.height - this.backgroundImg2.height);
  this.ctx.drawImage(this.backgroundImg2,this.backgroundImg2.width*2,this.canvas.height - this.backgroundImg2.height);
}

Game.prototype.switchPlayerTurn = function(){
  this.rock = new Rock(this.canvas);
  this.rock.resetValues(this.player2.x);
  this.rock.x = 1000;
  this.turn ++;
  document.addEventListener('keydown', this.newMovement);
  document.addEventListener('mousedown',  this.newInitialPos);
  document.addEventListener('mouseup', this.newFinalPos);
}

Game.prototype.checkCollision = function(){
  if (this.rock.checkCollisionWithWall(this.wall)){
    this.switchPlayerTurn();
  }
  if (this.rock.checkCollisionWithPlayer(this.player2)){
    this.player2.lives--
    console.log('player2', this.player2.lives)
    this.switchPlayerTurn();
    if(this.player2.lives === 0){
      this.gameOver = true;
      this.onGameOver();

      var gameOverScreen = document.querySelector('h1');
      gameOverScreen.innerHTML = "Player 1 wins"
    }
  }
  if (this.rock.checkCollisionWithPlayer(this.player)){
    this.player.lives--
    console.log('player', this.player.lives)
    this.switchPlayerTurn();
    if(this.player.lives === 0){
      this.gameOver = true;
      this.onGameOver();

      var gameOverScreen = document.querySelector('h1');
      gameOverScreen.innerHTML = "Player 2 wins"
    }
  }
  if (this.player.checkCollisionWithWall(this.wall)){
    this.player.x = this.wall.x - this.player.size;
  }
  if (this.player2.checkCollisionWithWall(this.wall)){
    this.player2.x = this.wall.x + this.wall.sizeX;
  }
  if(this.rock.y > this.canvas.height ){
    this.switchPlayerTurn();
  }
}

Game.prototype.setGameOverCallBack = function(callback){
  this.onGameOver = callback;
}

// Events methods ===========================================

Game.prototype.playerMovement = function(event){
  const key = event.keyCode;

  if(this.turn%2 !== 0){
    if(key === 37){
      this.player.setDirection(-1);
      this.player2.setDirection(0);
    }
    else if (key === 39){
      this.player.setDirection(1);
      this.player2.setDirection(0);
    }
  }
  else {
    if(key === 37){
      this.player.setDirection(0);
      this.player2.setDirection(-1);
    }
    else if (key === 39){
      this.player.setDirection(0);
      this.player2.setDirection(1);
    }
  }
}

Game.prototype.playerStopMovement = function(event){
  const key = event.keyCode;
  if(key !== 37 || key !== 39){
    this.player.setDirection(0)
    this.player2.setDirection(0)
  }
}

Game.prototype.setThrowValues = function(event){

  document.addEventListener('mousemove', this.drawHandlerLine);

  this.player.blockPlayer();
  document.removeEventListener('keydown', this.newMovement)
  this.rock.setThrowRockInitValues();
}

Game.prototype.throwRock = function(event){
  document.removeEventListener('mousedown',  this.newInitialPos);
  document.removeEventListener('mouseup', this.newFinalPos);
  document.removeEventListener('mousemove', this.drawHandlerLine);
  this.rock.ifStart = true;
  this.rock.setDirection(1);
  this.rock.setThrowRockValues();
  this.rock.initialVector = [];
  this.finalVectorPos = null;
  
}

Game.prototype.setCursorPosition = function(event){
  this.finalVectorPos = [event.offsetX,event.offsetY];
}

Game.prototype.drawPowerLine = function(){
  var setRadiusModule = [Math.abs(this.finalVectorPos[0] - this.rock.initialVector[0]),Math.abs(this.finalVectorPos[1] - this.rock.initialVector[1])];
  var powerRadius = Math.floor((Math.sqrt(Math.pow(setRadiusModule[0],2) + Math.pow(setRadiusModule[1],2))));

  this.ctx.beginPath();
  this.ctx.strokeStyle= 'yellow';
  this.ctx.lineWidth = 4;
  this.ctx.moveTo(this.rock.initialVector[0], this.rock.initialVector[1]);
  this.ctx.lineTo(this.finalVectorPos[0], this.finalVectorPos[1]);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle= 'yellow';
  this.ctx.lineWidth = 1;
  this.ctx.arc(this.rock.initialVector[0], this.rock.initialVector[1], powerRadius, 0, 2 * Math.PI);
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.strokeStyle= 'yellow';
  this.ctx.lineWidth = 3;
  this.ctx.arc(this.rock.initialVector[0], this.rock.initialVector[1], powerRadius+10, 0, (powerRadius/9)/(2 * Math.PI));
  this.ctx.stroke();
}
