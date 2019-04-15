'use strict';

function Wall(canvas){
  this.canvas = canvas;
  this.sizeX = canvas.width/12;
  this.sizeY = canvas.height/1.4;
  this.x = canvas.width/2 - this.sizeX/2;
  this.y = canvas.height-this.sizeY;
  this.ctx = this.canvas.getContext('2d');
  
  this.wallImg = new Image();
  this.wallImg.src = "../img/wall.png";
}

Wall.prototype.draw = function(){
  this.ctx.drawImage(this.wallImg,this.x ,this.y,this.sizeX,this.sizeY );
}