var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2 
}

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;		
});

window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;	
  mouse.y = e.clientY;	
});

var colors = [
  {r: 255, g: 71, b: 71},
  {r: 0, g: 206, b: 237},
  {r: 255, g: 255, b: 255}
];



function Particle(x, y, dx, dy, r, ttl) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.shouldRemove = false;
  this.timeToLive = ttl;
  this.randomColor = Math.floor(Math.random() * colors.length);



  this.update = function() {

    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    c.fill()


    c.fillStyle = "yellow"
    c.closePath()
    this.r -= r / (ttl / 0.1)

    if (this.r < 0) this.r = 0 

    this.timeToLive -= 0.3
}


  this.remove = function() {
   
    return this.timeToLive <= 0;
  }
}

function Explosion(x, y) {
  this.particles = [];	

  this.init = function() {
    for (var i = 1; i <= 1; i++) {
      var randomVelocity = {
        x: (Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 3.5,
      }
      this.particles.push(new Particle(x, y, randomVelocity.x, randomVelocity.y, 10, 10));				
    }
  }

  this.init();

  this.draw = function() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();	

      if (this.particles[i].remove() == true) {
        this.particles.splice(i, 1);
        
      };
    }	
  }
}

var explosions = [];

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "#1e1e1e";
  c.fillRect(0, 0, canvas.width, canvas.height);

  explosions.push(new Explosion(mouse.x, mouse.y));

  for (var i = 0; i < explosions.length; i++) {
    explosions[i].draw();
  }
}
animate();