let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



function Circle(x,y,dx,dy,radius,color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.draw = function() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0, Math.PI * 2, false)
        c.stroke()
        c.fillStyle = color
        c.fill()
    }
    
    this.update = function () {
        this.draw()
        //sağa sola çarpıp dönmesi için
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx
        }
        //yukarı aşağı çarpıp dönmesi için
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy  
    }
}

let circleArray = []
for (let index = 0; index < 10; index++) {
    let radius = Math.random() * 30
    let x = Math.random() * (innerWidth - radius *2) + radius
    let y = Math.random() * (innerHeight - radius *2) + radius
    let dx = (Math.random() - 0.5) * 8
    let dy = (Math.random() - 0.5) * 8
    let color = c.fillStyle = "#" + (((1 << 24) * Math.random()) | 0).toString(16);//random color

    circleArray.push(new Circle(x,y,dx,dy,radius,color))
    
    
}

//sonsuz döngü
function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0,0, innerWidth,innerHeight) // ekranı belirtilen koordinatlardan itibaren canvas için temizler
    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update()
        
    }

}

animate(circleArray)
