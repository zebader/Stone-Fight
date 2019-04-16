'use strict';

function Player(canvas,posX){
  this.canvas = canvas;
  this.size = this.canvas.height/6;
  this.x = posX;
  this.y = canvas.height - (this.size+10);
  this.ctx = this.canvas.getContext('2d');;
  this.lives = 3;
  this.direction = 0;
  this.speed = 3;
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

Player.prototype.draw = function(color){
  this.playerImg = new Image();
  this.playerImg.src = "./img/player.gif";
  this.ctx.drawImage(this.playerImg,this.x,this.y,this.size,this.size);
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
