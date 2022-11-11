let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function line(x, y) {
  this.x = x;
  this.y = y;

  c.lineTo(this.x, this.y);
  c.strokeStyle = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  c.stroke();
}

function animate() {
  requestAnimationFrame(animate); //sonsuz döngü için
  line(mouse.x, mouse.y);
}

animate();
