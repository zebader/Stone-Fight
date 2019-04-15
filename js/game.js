'use strict';

function Game(canvas){
  this.player = null;
  this.rock = null;
  this.wall = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
  this.backgroundXspeed = 0;
}

Game.prototype.start = function(){
  this.backgroundImg = new Image();
  this.backgroundImg.src = "../img/skybg.gif";

  this.backgroundImg2 = new Image();
  this.backgroundImg2.src = "../img/mountainsbg.png";
 
  this.player = new Player(this.canvas,this.canvas.width/5);
  this.player2 = new Player(this.canvas,4*this.canvas.width/5);
  this.rock = new Rock(this.canvas);
  this.wall = new Wall(this.canvas);
};

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

Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

Game.prototype.updateCanvas = function(){
  this.player.updateXPosition();
  this.player2.updateXPosition();
  this.rock.setPositionStart(this.player.updateXPosition()+this.player.size/2-this.rock.size/2);
  this.rock.updatePosition();
}

Game.prototype.drawCanvas = function(){

  this.drawBackground();
  this.player.draw('purple');
  this.player2.draw('yellow');
  this.rock.draw();
  this.rock.drawHandler();
  this.wall.draw();
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

Game.prototype.checkCollision = function(){
  if (this.rock.checkCollisionWithWall(this.wall)){
    this.gameOver = true;
    this.onGameOver();
  }
  if (this.player.checkCollisionWithWall(this.wall)){

    this.player.x = this.wall.x - this.player.size;
  }
  
  if(this.rock.y > this.canvas.height){

    this.gameOver = true;
    this.onGameOver();
  }
}

Game.prototype.setGameOverCallBack = function(callback){
  this.onGameOver = callback;
} 


