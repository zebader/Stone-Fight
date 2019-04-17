'use strict';

function main(){
  var splashAudio = new Audio('../sounds/splash_2.mp3');
  var gameAudio = new Audio('../sounds/game.mp3');
  var buttonAudio = new Audio('../sounds/playnow.mp3');

  splashAudio.play();
  splashAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
  
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
    <article class="logo-splash">
      <img src="./img/sf-logo.png">
      <img src="./img/splash-bright.png" class="img-bright">
      <button>PLAY NOW!</button>
      <p>Use the arrows ( 🡄 🡆 ) to move the character, when you are ready click and drag ( ⇚ ➚ ) to set the power and direction of the shot, be careful, don't hit yourself !</p>
    </article>
    </section>
    `)

    const buttonStart = document.querySelector('button');
    buttonStart.addEventListener('click',buildGameScreen);
    buttonStart.addEventListener('mouseenter',function(){
      buttonAudio.currentTime = 0;
      buttonAudio.play();
    });
  }

  //===========GAME SCREEN

  function buildGameScreen(){
    splashAudio.pause();
    gameAudio.play();
    gameAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);

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