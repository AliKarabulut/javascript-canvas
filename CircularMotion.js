let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", function (event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distance = randomIntFromRange(50, 120);
  }

  draw(lastPoint) {
    c.beginPath();
    // c.arc(this.x,this.y,this.radius,0,Math.PI *2,false)
    // c.fillStyle = this.color
    // c.fill()
    // daire yapmamamızın sebebi çizimlerdeki kare izini
    // yok etmek

    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y,
    };

    this.radians += this.velocity;

    this.x = mouse.x + Math.cos(this.radians) * this.distance;
    this.y = mouse.y + Math.sin(this.radians) * this.distance;

    this.draw(lastPoint);
  }
}

let particles;

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, "blue")
    );
  }
  console.log(particles);
}

function animate() {
  requestAnimationFrame(animate); //sonsuz döngü için
  c.fillStyle = "rgba(255,255,255, 0.05)"; // İz Animasyonu için
  c.fillRect(0, 0, canvas.width, canvas.height); // İz Animasyonu için

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();

// function Particle(x,y,radius,color){

//   this.x = x
//   this.y = y
//   this.radius = radius
//   this.color = color
//   this.radians = 0
//   this.velocity = 0.05

// this.draw =() =>{
//   c.beginPath()
//   c.arc(this.x,this.y,this.radius,0,Math.PI *2,false)
//   c.fillStyle = this.color
//   c.fill()
//   c.closePath()
// }

// this.update=() =>{
//   this.radians += this.velocity
//   this.x = x +  Math.cos(this.radians) * 100
//   this.y = y + Math.sin(this.radians ) * 100

//   this.draw()

// }

// }
