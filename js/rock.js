'use strict';

function Rock(canvas,shotSpeed,shotAngle){
  this.canvas = canvas;
  this.size = 20;
  this.x= 0;
  this.y = 0;
  this.ctx = this.canvas.getContext('2d');
  this.direction = 0;
  this.gravity = 0.5;
  this.velocityX = shotSpeed*(Math.cos(shotAngle*Math.PI/180));
  this.velocityY = shotSpeed*(Math.sin(shotAngle*Math.PI/180));
  this.time = 0;
  this.direction = 0;
  this.ifStart = false;
}

Rock.prototype.setPositionStart = function(posX){
  this.startX = posX;
  this.startY = this.canvas.height-100;
}

Rock.prototype.updatePosition = function(){

  //console.log('inicial time', this.time)
  //console.log('inicial', this.x, this.y)
  
  this.x = this.startX + (this.velocityX*this.time)*this.direction;
  this.y = this.startY - ((this.velocityY*this.time - (1/2 * this.gravity*Math.pow(this.time,2))))*this.direction;

  if(this.ifStart === false){
    this.time = 0;
  }
  else{
    this.time +=0.6;
  }

  //console.log('triggered',this.x, this.y)
}
Rock.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
  // return this.direction;
}

Rock.prototype.draw = function(){
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(this.x,this.y,this.size,this.size);

  this.ctx.beginPath();
  this.ctx.arc(this.x+this.size, this.y + this.size, 5, 0, 2 * Math.PI);
  this.ctx.stroke();
}

Rock.prototype.checkCollisionWithWall = function(wall){
  const collisionRight = this.x + this.size > wall.x && this.x + this.size < wall.x + wall.sizeX && this.y + this.size > wall.y ;
  //const collisionLeft = this.x - this.size/2 < wall.x + wall.sizeX;
  //const collisionTop = this.y - this.size/2 < wall.y + wall.sizeY;
  console.log('colls', this.x + this.size > wall.x , this.x + this.size < wall.x + wall.sizeX , this.y + this.size > wall.y);
  return collisionRight /*&& collisionLeft && collisionTop*/;
}