let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x:undefined,
  y:undefined
}

addEventListener("mousemove",function(event){
  mouse.x = event.pageX
  mouse.y = event.pageY

})

class Kare{

  constructor(x,y,w,h,color){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color

  }

  draw(){
    c.beginPath()
    c.fillRect(this.x,this.y,this.w,this.h)
    c.fillStyle = this.color

  }

  update(){
    this.draw()
  }


}

function init(){
  Kare1 = new Kare(200,200,100,100,"blue")
  Kare2 = new Kare(undefined,undefined,100,100,"red")

}


function animate(){
  requestAnimationFrame(animate) //sonsuz döngü için
  c.clearRect(0,0,canvas.width,canvas.height)
  Kare2.update()
  Kare1.update()
  Kare2.x = mouse.x
  Kare2.y = mouse.y

  if (Kare2.x + Kare2.w>= Kare1.x && Kare2.x <= Kare1.x + Kare1.w
    && Kare2.y + Kare2.h>= Kare1.y && Kare2.y <= Kare1.y + Kare1.h) {
    Kare2.color = "black"
  }
  else{
    Kare2.color ="red"
  }

}

init()
animate()