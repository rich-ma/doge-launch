const Util = require("./util");
const Blackhole = require('./blackhole');
const Asteroid = require('./asteroid');
const Target = require('./target');


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