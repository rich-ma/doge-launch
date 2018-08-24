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
    if (this.radius < 10){
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