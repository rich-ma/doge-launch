const Util = require("./util");
const Blackhole = require('./blackhole');

class Game {
  constructor(doge, ctx){
    this.doge = doge;
    this.ctx = ctx;
    this.blackholes = [new Blackhole(ctx, 500, 500, 100, 75, 25)];
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
    this.blackholes.forEach(blackhole => blackhole.draw());
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