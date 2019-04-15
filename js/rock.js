'use strict';

function Rock(canvas){
  this.canvas = canvas;
  this.size = 20;
  this.x= 0;
  this.y = 0;
  this.ctx = this.canvas.getContext('2d');
  this.direction = 0;
  this.gravity = 0.5;
  this.initialVector = [];
  this.rockSpeed = 0;
  this.rockAngle = 0;
  this.time = 0;
  this.direction = 0;
  this.ifStart = false;
}

Rock.prototype.setPositionStart = function(posX){
  this.startX = posX;
  this.startY = this.canvas.height-100;
}

Rock.prototype.setThrowRockInitValues = function(){
  this.initialVector = [event.offsetX,event.offsetY];
}

Rock.prototype.setThrowRockValues = function(){
  // SPEED ===============================
  var finalVector = [Math.abs(event.offsetX - this.initialVector[0]),Math.abs(event.offsetY - this.initialVector[1])];
  this.rockSpeed = Math.floor((Math.sqrt(Math.pow(finalVector[0],2) + Math.pow(finalVector[1],2)))/10);
  // ANGLE ================================
  var x1 = event.offsetX;
  var x2 = -event.offsetY;

  var y1 = this.initialVector[0];
  var y2 = -this.initialVector[1];

  this.rockAngle = Math.atan2(y2 - x2, y1 - x1) * 180 / Math.PI;
  //=============================
}

Rock.prototype.updatePosition = function(){
  this.velocityX = this.rockSpeed*(Math.cos(this.rockAngle*Math.PI/180));
  this.velocityY = this.rockSpeed*(Math.sin(this.rockAngle*Math.PI/180));

  this.x = this.startX + (this.velocityX*this.time)*this.direction;
  this.y = this.startY - ((this.velocityY*this.time - (1/2 * this.gravity*Math.pow(this.time,2))))*this.direction;

  if(this.ifStart === false){
    this.time = 0;
  }
  else{
    this.time +=0.6;
  }
}

Rock.prototype.setDirection = function(newDirection){
  this.direction = newDirection;
}

Rock.prototype.draw = function(){
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(this.x,this.y,this.size,this.size);
}

Rock.prototype.drawHandler = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.initialVector[0],this.initialVector[1], this.rockSpeed * 5, 0, 2 * Math.PI, false);
  this.ctx.fillStyle = 'green';
  this.ctx.fill();
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = '#003300';
  this.ctx.stroke();
}


Rock.prototype.checkCollisionWithWall = function(wall){
  const collisionRight = this.x + this.size > wall.x && this.x + this.size < wall.x + wall.sizeX && this.y + this.size > wall.y ;
  //const collisionLeft = ;
  //const collisionTop = ;
  return collisionRight /*&& collisionLeft && collisionTop*/;
}