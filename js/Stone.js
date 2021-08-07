class Stone{
        constructor(x, y, r) {
          let options = {
            restitution: 0.8
          };
      
          this.body = Bodies.circle(x, y, r, options);
          this.r = r;
          this.color = color;
          World.add(world, this.body);
        }
      
        display() {
          let pos = this.body.position;
          push();
          translate(pos.x, pos.y);
          strokeWeight(1);
          fill("white");
          ellipseMode(RADIUS);
          ellipse(0, 0, this.r, this.r);
          noStroke();
          pop();
        }
      
}