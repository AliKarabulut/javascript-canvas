let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')


let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40
let minRadius = 5 

window.addEventListener("mousemove",
    function(event) {
        
        mouse.x = event.x
        mouse.y = event.y

        
    }

)

window.addEventListener("resize",

    function(){
        this.setTimeout(init,1000)
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        
})


window.addEventListener("click",
function(){
    init()
})
let gravity = 1
let friction = 0.90

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
        if (this.x + this.radius + this.dx> innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx
            console.log(this.dx)


        }


        //yukarı aşağı çarpıp dönmesi için
        if (this.y + this.radius + this.dy > innerHeight || this.y - this.radius < 0 ) {
            this.dy = -this.dy*friction
            this.dx *= friction //her çarpmada x hızını azaltmak için
            
        }

        else {
            this.dy +=gravity
            console.log(this.dy)
            
            
        }


        
        this.x += this.dx 
        this.y += this.dy  
    }
}

let circleArray = []

function init() {
    circleArray = []

    for (let index = 0; index < 10; index++) {
        let radius = Math.random() * 30 + 1
        let x = Math.random() * (innerWidth - radius *2) + radius
        let y = Math.random() * (innerHeight - radius *2) + radius
        let dx = (Math.random() - 0.5) * 4
        let dy = (Math.random() ) * 4
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

