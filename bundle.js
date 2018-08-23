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
    this.gravity = radius;
    this.mass = mass;
    this.range = radius * 1.6;
    this.draw();
    this.applyGravity = this.applyGravity.bind(this);
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

  applyGravity(doge, distance){
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
    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);

    addEventListener('mousedown', event => {
        const distance = Util.distance(event.offsetX, event.offsetY, doge.x, doge.y + 50);
        if (distance < 100) {
            doge.clicked = true;
        }
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            debugger
            doge.lineX = event.offsetX;
            doge.lineY = event.offsetY;
        }
    });
    addEventListener('mouseup', event => {
        doge.clicked = false; 
        if(doge.lineX && doge.lineY) doge.shoot();            
    });

    let game = new Game(doge, ctx);
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

    this.shoot = this.shoot.bind(this);
     
  }

  win(){
    this.dy = 0;
    this.dx = 0;
    this.draw('blackhole');
  }

  draw(link = 'dogeball'){
    if(this.clicked){
      this.drawLine();
    }
    const img = new Image();
    img.src =`./assets/images/${link}.png`;
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
    this.velocity = Util.distance(50, 750, this.lineX, this.lineY)/20;
    this.dy = (750 - this.lineY)/100;
    this.dx = (50 - this.lineX)/100;
    console.log(this.dy, this.dx)
    this.angle = Util.angle360([50, 750], [this.lineX, this.lineY]);
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
const Target = __webpack_require__(/*! ./target */ "./lib/target.js");

class Game {
  constructor(doge, ctx){
    this.level = 0;
    this.doge = doge;
    this.ctx = ctx;
    this.win = false;
    this.blackholes = [
      new Blackhole(ctx, 400, 500, 100, 75, 15),
      new Blackhole(ctx, 100, 220, 70, 35, 8),
      new Blackhole(ctx, 700, 300, 75, 60, 15),
      new Blackhole(ctx, 750, 600, 150, 100, 40),
      new Blackhole(ctx, 450, 150, 50, 25, 6)
    ];
    this.bumpers = [];
    this.target = new Target(ctx, 950, 0, 50);
    this.animate = this.animate.bind(this);
    this.checkAttraction = this.checkAttraction.bind(this);
    this.updateDoge = this.updateDoge.bind(this);
    this.checkWin = this.checkWin.bind(this);
    window.requestAnimationFrame(this.animate);
  }

  animate(){
    console.log(this.doge.lineX, this.doge.lineY);
    this.ctx.clearRect(0,0, 1000, 800);
    this.target.draw();
    this.blackholes.forEach(blackhole => blackhole.draw());
    this.checkWin();
    this.updateDoge();
    this.checkAttraction();
    window.requestAnimationFrame(this.animate);
  }

  updateDoge(){
    this.doge.updatePos();
    this.doge.draw();
  }

  checkWin(){
    const distance = Util.distance(this.doge.x, this.doge.y, this.target.x, this.target.y);
    if (distance < this.target.size && !this.win){
      this.win = true;
      this.doge.win();
      alert("win!");
    }
  }

  checkAttraction(){
    this.blackholes.forEach(blackhole => {
      const distance = Util.distance(this.doge.x, this.doge.y, blackhole.x, blackhole.y);
      if (blackhole.range >= distance){
        blackhole.applyGravity(this.doge, distance);
      }
    })
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