let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m2 - m1)) / (m1 + m2) + (u1.x * 2 * m1) / (m1 + m2),
      y: u2.y,
    };

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

addEventListener("click", function () {
  init();
});
const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6,
    };
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      if (
        getDistance(this.x, this.y, particles[i].x, particles[i].y) -
          this.radius * 2 <
        0
      ) {
        resolveCollision(this, particles[i]);
      }
    }
    if (
      getDistance(mouse.x, mouse.y, this.x, this.y) < 30 &&
      this.opacity < 0.2
    ) {
      this.opacity += 0.08;
    } else if (getDistance(mouse.x, mouse.y, this.x, this.y) > 30) {
      this.opacity -= 0.01;
      this.opacity = Math.max(0, this.opacity);
    }

    if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius > innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//implemantasyon
let particles;

function init() {
  particles = [];
  let radius = 15;
  console.log(
    Math.floor((innerHeight * innerWidth) / (Math.PI * radius * radius * 21))
  );
  for (
    let i = 0;
    i <
    Math.floor((innerHeight * innerWidth) / (Math.PI * radius * radius * 21));
    i++
  ) {
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);

    let color = (c.fillStyle =
      "#" + (((1 << 24) * Math.random()) | 0).toString(16));

    for (let j = 0; j < particles.length; j++) {
      if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
        x = randomIntFromRange(radius, canvas.width - radius);
        y = randomIntFromRange(radius, canvas.height - radius);

        j = -1;
      }

      console.log("anan");
    }

    particles.push(new Particle(x, y, radius, color));
  }
}

//animasyon döngüsü
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((Particle) => {
    Particle.update();
  });
}
init();
animate();
