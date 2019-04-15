'use strict';

function main(){
  
  //===========CREATE SCREENS============================================================

  const mainElement = document.querySelector('main');

  function buildDom(html){
    mainElement.innerHTML = html;
    return mainElement;
  }

   //===========SPLASH SCREEN

  function buildSplashScreen(){
    buildDom(`
    <section class="game-container">
    <h1>STONE FIGHT</h1>
    <button>PLAY</button>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen);
  }

  //===========GAME SCREEN

  function buildGameScreen(){
    buildDom(`
    <section class="game-container">
     <canvas></canvas>
    </section>
    `)

  //start game----------

    const containerElement = document.querySelector('.game-container');
    const gameWidth = containerElement.offsetWidth;
    const gameHeight = containerElement.offsetHeight;
    
    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width',gameWidth);
    canvasElement.setAttribute('height',gameHeight);

    const game = new Game(canvasElement);
    game.start();
    game.startLoop();
    game.setGameOverCallBack(buildGameOverScreen);

  //Event listeners ----------

  document.addEventListener('keydown', playerMovement);
  document.addEventListener('keyup', playerStopMovement);
  canvasElement.addEventListener('mousedown', setThrowValues);
  canvasElement.addEventListener('mouseup', throwRock);

    function playerMovement(event){
      const key = event.keyCode;
      if(key === 37){
        game.player.setDirection(-1);}
      else if (key === 39){
        game.player.setDirection(1);
      }
      else if(key === 38){

      }
    }

    function playerStopMovement(event){
      const key = event.keyCode;
      if(key !== 37 || key !== 39){
        game.player.setDirection(0)
      }
    }
    
    function setThrowValues(event){

      document.removeEventListener('keydown',playerMovement);
      game.player.blockPlayer();
      canvasElement.removeEventListener('mousedown', setThrowValues);
 
      game.rock.initialVector = [event.offsetX,event.offsetY];

    }

    function throwRock(event){

      game.rock.ifStart = true;
      game.rock.setDirection(1);


      // SPEED ===============================
      var finalVector = [Math.abs(event.offsetX - game.rock.initialVector[0]),Math.abs(event.offsetY - game.rock.initialVector[1])];
      game.rock.rockSpeed = Math.floor((Math.sqrt(Math.pow(finalVector[0],2) + Math.pow(finalVector[1],2)))/10);
      // ANGLE ================================
      var x1 = event.offsetX;
      var x2 = -event.offsetY;

      var y1 = game.rock.initialVector[0];
      var y2 = -game.rock.initialVector[1];

      game.rock.rockAngle = Math.atan2(y2 - x2, y1 - x1) * 180 / Math.PI;
      //=============================

      canvasElement.removeEventListener('mouseup',throwRock);
    }

  }
  //===========GAMEOVER SCREEN
  function buildGameOverScreen(){
    buildDom(`
    <section class="game-container">
    <h1>Game Over</h1>
    <button>PLAY AGAIN</button>
    </section>
    `)
    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen)
  }
  buildSplashScreen();
}

window.addEventListener('load',main);