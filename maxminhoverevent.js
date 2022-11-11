let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40
let minRadius = 5 

window.addEventListener("mousemove",
    function(event) {
        console.log(event)
        mouse.x = event.x
        mouse.y = event.y
        console.log(mouse)
    }

)

window.addEventListener("resize",

    function(){
        this.setTimeout(init,1000)
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        
})


function Circle(x,y,dx,dy,radius,color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    this.minRadius = radius
    this.maxRadius = radius*2

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

        //interaktiflik

        if (mouse.x - this.x <50 && mouse.x - this.x > -50
            && mouse.y - this.y <50 && mouse.y - this.y > -50) {
            
            if (this.radius < this.maxRadius ){
                this.radius += 1
            }


        
        }
        
        else if(this.radius > this.minRadius){
            this.radius -=1
        }



        
        this.x += this.dx
        this.y += this.dy  
    }
}

let circleArray = []

function init() {
    circleArray = []

    for (let index = 0; index < 50; index++) {
        let radius = Math.random() * 30 + 1
        let x = Math.random() * (innerWidth - radius *2) + radius
        let y = Math.random() * (innerHeight - radius *2) + radius
        let dx = (Math.random() - 0.5) * 4
        let dy = (Math.random() - 0.5) * 4
        let color = c.fillStyle = "#" + (((1 << 24) * Math.random()) | 0).toString(16);//random color
    
        circleArray.push(new Circle(x,y,dx,dy,radius,color))
        
        
    }
    

}

//sonsuz döngü
function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0,0, innerWidth,innerHeight) // ekranı belirtilen koordinatlardan itibaren canvas için temizler
    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update()
        
    }

}


animate()
init()