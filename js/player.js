'use strict';

function Player(canvas,posX){
  this.canvas = canvas;
  this.size = this.canvas.height/6;
  this.x = posX;
  this.y = canvas.height - (this.size+60);
  this.ctx = this.canvas.getContext('2d');;
  this.lives = 3;
  this.direction = 0;
  this.speed = 3;
  this.heartsImg = ["./img/life.png","./img/life2.png","./img/life3.png"]
  this.spritePos = 0;
  this.getHitByRock = false;
  this.playerTurn = false;
  this.wasHit = false;
}

Player.prototype.updateXPosition = function(){
  this.x = this.x + this.direction*this.speed;
  if(this.x < 0){
    this.x = 0
  }
  if(this.x >= this.canvas.width - this.size){
    this.x = this.canvas.width - this.size;
  }
  return this.x
}
Player.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
}

Player.prototype.draw = function(){
  this.playerImg = new Image();
  console.log(this.spritePos);
  
  this.playerImg.src = "./img/player-sprite.png";
  this.ctx.drawImage(this.playerImg,this.playerImg.height*this.spritePos,0,this.playerImg.height,this.playerImg.height,this.x,this.y,this.size,this.size);
}

Player.prototype.drawLife = function(posX,posY,size){
  this.lifeImg = new Image();
  if(this.lives === 3){
    this.lifeImg.src = this.heartsImg[0];
  }
  if(this.lives === 2){
    this.lifeImg.src = this.heartsImg[1];
  }
  if(this.lives === 1){
    this.lifeImg.src = this.heartsImg[2];
  }
  this.ctx.drawImage(this.lifeImg,posX,posY,size*3,size);
}


Player.prototype.setLives = function(){
  this.lives--;
}

Player.prototype.blockPlayer = function(fixedPos){
  this.direction = 0;
}

Player.prototype.checkCollisionWithWall = function(wall){
  const collisionRight = this.x + this.size > wall.x;
  const collisionLeft = this.x < wall.x + wall.sizeX;
  
  return collisionRight && collisionLeft;
}
