# STONE FIGHT

## Description
Stone Fight it's a game where 2 players throws stones by turns to each other across a wall placed in the middle of the screen, the objective is to kill the other player by decreasing the HP.


## MVP (DOM - CANVAS)
*CANVAS*, The mvp is a game where at least one player can throw a stone and hit the other player.

## Backlog
- Strenght and angle dynamic modulator
- Sprites
- Multiple leves with random wall 


## Data structure

## main.js - States y States Transitions
```
- splashScreen()
  - destroyGameOver(if)
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - destroySplash()
  - destroyGameOver()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener( if splashScreen, else startGame) 
```

### game.js
```
Game(){
  this.player;
  this.rock;
  this.wall;
  this.canvas;
  this.ctx;
  this.gameOver;
}

Game.prototype.startLoop(){
  loop()
}

Game.prototype.updateCanvas(){
}

Game.prototype.clearCanvas(){
}

Game.prototype.drawCanvas(){
}

Game.prototype.checkAllCollisons(){
}

Game.prototype.finishGameCallback(){
}
```

### player.js
```
Player(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
  this.lives;
  this.direction;
  this.speed;
}

Player.prototype.updateXPosition(){
}

Player.prototype.draw(){
}

Player.prototype.setDirection(){
}

Player.prototype.setLives(){
}

Player.prototype.blockPlayer(){
}

Player.prototype.checkCollisionWithWall(wall){
}
```

### rock.js
```
Rock(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
  this.gravity;
  this.deceleration;
  this.shotSpeed;
}

Character.prototype.draw(){
}

Character.prototype.throwPhysics(){
}

```

### wall.js
```
Wall(){
  this.x1;
  this.x2;
  this.size;
  this.canvas;
  this.ctx;
}

Wall.prototype.draw(){
}
```
## Task - WIP
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - 3 states transitions
- Game - loop
- Game - Create Player,rock and wall
- Main - GameWon
- Main - destroy Game
- Main - GameWon RESTART
- Main - removeGameWon
- Game - restartGame
- Game - addEventListener
- Wall - create
- Player - create
- Player - move
- Player - collision
- Rock - create
- Rock - throw (physics)
- Rock - collision
- Game - check win

## Links


### Trello
[Link url](https://trello.com/b/7AltuuZb/stone-fight-kanban)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/zebader/Stone-Fight)
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Link Slides.com]()