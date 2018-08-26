/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/board.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/asteroid.js":
/*!*************************!*\
  !*** ./lib/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Asteroid {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.draw();
    this.collision = this.collision.bind(this);
  }

  draw() {
    const img = new Image();
    if (this.radius < 40){
      img.src = './assets/images/asteroid-small.png';
    } else {
      img.src = './assets/images/asteroid.png';
    }
    this.ctx.drawImage(img, this.x, this.y, this.radius * 2, this.radius * 2);
  }

  collision(doge){
    doge.dy *= -1;
    doge.dx *= -1;
  }
}

module.exports = Asteroid;

/***/ }),

/***/ "./lib/blackhole.js":
/*!**************************!*\
  !*** ./lib/blackhole.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

class Blackhole {
  constructor(ctx, x, y, mass, radius, gravity){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gravity = gravity;
    this.mass = mass;
    this.range = radius * 1.6;
    this.draw();
    this.calculateGravity = this.calculateGravity.bind(this);
  }

  draw(){
    const img = new Image();
    img.src ='./assets/images/blackhole.png';
    this.ctx.drawImage(img, this.x-this.radius/2, this.y-this.radius/2, this.radius*2, this.radius*2);
    // this.ctx.beginPath();
    // this.ctx.arc(this.x + this.radius/2, this.y + this.radius/2, this.radius, 0, Math.PI*2);
    // this.ctx.strokeStyle = '#FFF';
    // this.ctx.stroke();
    // this.ctx.closePath();
  }

  calculateGravity(doge, distance){
    const force = this.gravity*(this.mass)/(Math.pow(distance, 2));
    const dx = (this.x - doge.x)/100 * force;
    const dy = (this.y - doge.y)/100 * force;
    doge.dy -= dy;
    doge.dx -= dx;
  }




}


module.exports = Blackhole;

/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");
const Doge = __webpack_require__(/*! ./dogeball.js */ "./lib/dogeball.js");
const Util = __webpack_require__(/*! ./util.js */ "./lib/util.js");
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector('canvas');
    const restart = document.getElementById('restart');
    const retry = document.getElementById('retry');
    const modal = document.getElementById('myModal');
    const helpButton = document.getElementById('help-button');
    const span = document.getElementsByClassName("close")[0];
    const help = document.getElementById("help");
    const win = document.getElementById("win");
    const died = document.getElementById("died");


    help.style.display = 'block';
    modal.style.display = "block";

    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);


    
    addEventListener('mousedown', event => {
        if (doge.x !== 15 || doge.y !== 700) return null;
        if (modal.style.display === "block") return null;
        const distance = Util.distance(event.offsetX, event.offsetY, doge.x, doge.y + 50);
        if (distance < 100) {
            doge.clicked = true;
        }
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            doge.lineX = event.offsetX;
            doge.lineY = event.offsetY;
        }
    });
    addEventListener('mouseup', event => {
        if (doge.x !== 15 || doge.y !== 700) return null;
        if (modal.style.display === "block") return null;
        if (doge.clicked === false) return null;
        doge.clicked = false; 
        if(doge.lineX && doge.lineY) doge.shoot();            
    });
    
    let game = new Game(doge, ctx);
    
    retry.addEventListener('click', () => {
        game.retry();
    });

    helpButton.addEventListener('click', () => {
        help.style.display = 'block';
        modal.style.display = "block";
    });

    restart.addEventListener('click', () => {
        game.restart();
    });

    span.onclick = function () {
        modal.style.display = "none";
        help.style.display = 'none';
        win.style.display = 'none';
        died.style.display = 'none';
        
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            help.style.display = 'none';
            win.style.display = 'none';
            died.style.display = 'none';

        }
    }
});

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']




/***/ }),

/***/ "./lib/dogeball.js":
/*!*************************!*\
  !*** ./lib/dogeball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class Dogeball {
  constructor(ctx){
    // this.getPos();
    this.ctx = ctx;
    this.clicked = false;
    this.lineX = 0;
    this.lineY = 0;
    this.x = 15;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = null;
    this.acc = null;
    this.dir = null;
    this.win = false;
    this.winImg = new Image();
    this.winImg.src = `./assets/images/dogepartySmall.png`;
    this.gravityImg = new Image();
    this.gravityImg.src = `./assets/images/dogeplsSmall.png`;
    this.img = new Image();
    this.img.src = `./assets/images/dogedayumSmall.png`;

    this.shoot = this.shoot.bind(this);
    this.reset = this.reset.bind(this);
    this.draw = this.draw.bind(this);
  }


  draw(win, gravity){
    if(this.clicked){
      this.drawLine();
    }
    let img;
    if(win){
     img = this.winImg;
    } else if(gravity){
      img = this.gravityImg;
    } else {
      img = this.img;
    }
    this.ctx.drawImage(img, this.x, this.y, 75, 75);

  }

  drawLine(){
    this.ctx.beginPath();
    this.ctx.moveTo(50, 750);
    this.ctx.lineTo(this.lineX, this.lineY);
    this.ctx.strokeStyle='#fff';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  }

  updatePos(){
    this.y -= this.dy;
    this.x -= this.dx;
   }

  shoot(){
    this.vel = Util.distance(50, 750, this.lineX, this.lineY);
    this.dy = (750 - this.lineY)/60;
    this.dx = (50 - this.lineX)/60;
    this.angle = Util.angle360([50, 750], [this.lineX, this.lineY]);
  }

  reset(){
    this.x = 15;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = 0;
    this.angle = 0;
    this.dir = null;
    this.acc = 0;
  }


}

module.exports = Dogeball;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const Blackhole = __webpack_require__(/*! ./blackhole */ "./lib/blackhole.js");
const Asteroid = __webpack_require__(/*! ./asteroid */ "./lib/asteroid.js");
const Target = __webpack_require__(/*! ./target */ "./lib/target.js");


class Game {
  constructor(doge, ctx){
    this.clicked = false;
    this.level = 0;
    this.deaths = 0;
    this.doge = doge;
    this.ctx = ctx;
    this.win = false;
    this.gravity = false;
    this.lose = false;
    this.blackholes = null;
    this.target = null;
    this.asteroids = [];
    this.animate = this.animate.bind(this);
    this.checkAttraction = this.checkAttraction.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.updateDoge = this.updateDoge.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.checkLose = this.checkLose.bind(this);
    this.restart = this.restart.bind(this);
    this.winAlert = this.winAlert.bind(this);
    this.drawComponents = this.drawComponents.bind(this);
    this.retry = this.retry.bind(this);
    this.level1 = this.level1.bind(this);
    window.requestAnimationFrame(this.animate);
  }

  checkLose(){
    const modal = document.getElementById('myModal');
    const deathModal = document.getElementById("died");
    const deathCount = document.getElementById("death-count2");
    if (this.lose === true) return null;
    if(this.doge.x > 1050 || this.doge.y > 850 || this.doge.x < -100 || this.doge.y < -200) {
      this.deaths += 1;
      this.lose = true;
      deathCount.innerText = `${this.deaths} ${this.deaths===1 ? 'death' : 'deaths'}`;
      deathModal.style.display = 'block';
      modal.style.display = 'block';
      this.retry();
    };
  }

  restart(){
    this.level = 0;
    this.deaths = 0;
    this.lose = false;
    this.clicked = false;
    this.doge.reset();
  }

  retry(){
    this.clicked = false;
    this.lose = false;
    this.doge.reset();
  }

  animate(){
    this.gravity = false;
    if(this.level <= 5) this.changeLevel(this.ctx);
    this.ctx.clearRect(0,0, 1000, 800);
    this.drawComponents();
    this.checkWin();
    this.checkAttraction();
    this.checkCollision();
    this.checkLose();
    this.updateDoge(this.win, this.gravity);
    this.frame = window.requestAnimationFrame(this.animate);
    this.winAlert();
  }

  updateDoge(){
    this.doge.updatePos();
    this.doge.draw(this.win, this.gravity);
  }

  drawComponents(){
    this.target.draw();
    this.blackholes.forEach(blackhole => blackhole.draw());
    this.asteroids.forEach(asteroid => asteroid.draw());
  }

  checkWin(){
    const distance = Util.distance(this.doge.x, this.doge.y, this.target.x-this.target.size/2, this.target.y-this.target.size/2);
    if (distance < this.target.size){
      this.win = true; 
      this.doge.win = true; 

      // this.doge.draw(this.win, this.gravity);
    }
  }

  winAlert(){
    const modal = document.getElementById('myModal');
    const winModal = document.getElementById("win");
    const deathCount = document.getElementById("death-count");
    if(this.win){
      debugger
    this.ctx.clearRect(0, 0, 1000, 800);
    this.updateDoge(this.win, this.gravity);
    this.drawComponents();
    cancelAnimationFrame(this.frame);
    deathCount.innerText = `${this.deaths} ${this.deaths===1 ? 'death' : 'deaths'}`;
    winModal.style.display = 'block';
    modal.style.display = 'block';
    this.doge.reset();
    this.level += 1;
    this.win = false;
    window.requestAnimationFrame(this.animate);
    }
  }

  checkAttraction(){
    this.blackholes.forEach(blackhole => {
      const distance = Util.distance(this.doge.x, this.doge.y, blackhole.x, blackhole.y);
      if (blackhole.range >= distance){
        blackhole.calculateGravity(this.doge, distance);
        this.gravity = true;
      }
    })
  }

  checkCollision(){
    this.asteroids.forEach(asteroid => {
      const distance = Util.distance(this.doge.x, this.doge.y, asteroid.x + asteroid.radius / 2, asteroid.y + asteroid.radius / 2);
      if (distance <= asteroid.radius){
        asteroid.collision(this.doge);
      }
    })
  }

  changeLevel(ctx){
    if (this.level === 0) this.level0(ctx);
    if (this.level === 1) this.level1(ctx);
    if (this.level === 2) this.level2(ctx);
    if (this.level === 3) this.level3(ctx);
    if (this.level === 4) this.level4(ctx);
    if (this.level === 5) this.level5(ctx);
  }

  level0(ctx){
    this.blackholes = [];
    this.asteroids = [
    ];
    this.target = new Target(ctx, 450, 350, 50);
  }
  level1(ctx){
    this.blackholes = [new Blackhole(ctx, 200, 350, 50, 50, 50)];
    this.asteroids = [
      new Asteroid(ctx, 500, 350, 50)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }

  level2(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 300, 400, 100, 75, 15),
      new Blackhole(ctx, 600, 400, 100, 75, 15),
    ];
    this.asteroids = [
      new Asteroid(ctx, 500, 600, 100)
    ];
    this.target = new Target(ctx, 950, 700, 50);
  }
  
  level3(ctx) {
    this.blackholes = [
      // new Blackhole(ctx, 450, 350, 300, 150, 100),
      new Blackhole(ctx, 250, 350, 50, 50, 50),
    ];
    this.asteroids = [
      new Asteroid(ctx, -50, 500, 70)
    ];
    this.target = new Target(ctx, 50, 400, 50);
  }
  
  level4(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 30),
      new Blackhole(ctx, 100, 220, 70, 35, 16),
      new Blackhole(ctx, 700, 300, 75, 60, 25),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 15)
    ];
     this.asteroids = [
       new Asteroid(ctx, 400, 200, 70),
       new Asteroid(ctx, 600, 400, 30),
       new Asteroid(ctx, 800, 200, 50),
     ];
    this.target = new Target(ctx, 950, 50, 50);
  }

  level5(ctx) {
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 30),
      new Blackhole(ctx, 100, 220, 70, 35, 16),
      new Blackhole(ctx, 700, 300, 75, 60, 25),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 15)
    ];
    this.target = new Target(ctx, 950, 50, 50);
  }
}

module.exports = Game;

/***/ }),

/***/ "./lib/target.js":
/*!***********************!*\
  !*** ./lib/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Target{
  constructor(ctx, x, y, size){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(){
  const img = new Image();
  img.src ='./assets/images/goal.png';
  this.ctx.drawImage(img, this.x - this.size/2, this.y + this.size/2, this.size, this.size);
  }


}

module.exports = Target;

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
 randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  
 randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)]
  },

 distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  },

  angle(x2, y2, x1, y1) {
    const dy = y1 - y2;
    const dx = x1 - x2;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI; 
    return theta;
  },

  angle360(start, end) {
    var theta = this.angle(start[0], start[1], end[0], end[1]);
    if (theta < 0) theta = 360 + theta;
    return theta;
  }
}


module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map