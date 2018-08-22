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

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");
const Doge = __webpack_require__(/*! ./dogeball.js */ "./lib/dogeball.js");
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    const doge = new Doge(ctx);

    addEventListener('mousedown', event => {
        doge.clicked = true;
    });
    addEventListener('mousemove', event => {
        if(doge.clicked){
            doge.lineX = event.pageX;
            doge.lineY = event.pageY;
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
    this.x = 0;
    this.y = 700;
    this.dy = 0;
    this.dx = 0;
    this.vel = null;
    this.acc = null;
    this.dir = null;

    this.shoot = this.shoot.bind(this);
     
  }

  draw(){
    if(this.clicked){
      this.drawLine();
    }
    const img = new Image();
    img.src ='./assets/images/dogeball.png';
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

class Game {
  constructor(doge, ctx){
    this.doge = doge;
    this.ctx = ctx;
    this.blackholes = [];
    this.bumpers = [];
    this.target = [];
    this.animate = this.animate.bind(this);
    this.checkAttraction = this.checkAttraction.bind(this);
    this.updateDoge = this.updateDoge.bind(this);
    window.requestAnimationFrame(this.animate);
  }

  animate(){
    console.log(this.doge.lineX, this.doge.lineY);
    this.ctx.clearRect(0,0, 1000, 800);
    this.checkAttraction();
    this.updateDoge();
    window.requestAnimationFrame(this.animate);
  }

  updateDoge(){
    this.doge.updatePos();
    this.doge.draw();
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
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  },

  angle360(start, end) {
    var theta = this.angle(start[0], start[1], end[0], end[1]); // range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }
}


module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map