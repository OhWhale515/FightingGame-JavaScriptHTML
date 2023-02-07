const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    update() {
        this.draw()
        
        this.position.x += this.velocity.x        
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }  
}


const player = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position:{
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    }
})

console.log(player, enemy);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {  
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    // Player Movement
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3
    }   else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3
    }   else if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y = -10
    }   else if (keys.s.pressed && player.lastKey === 's') {
        player.velocity.y = 10
    }
// Enemy Movement    
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3
    }   else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }   else if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y = -10
    }   else if (keys.ArrowDown.pressed && enemy.lastKey === 'ArrowDown') {
        enemy.velocity.y = 10
    }
    
    
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key){
// Player Controls        
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'            
            break
        case 'w':
            keys.w.pressed = true
            player.velocity.y = -10            
            break
        case 's':
            keys.s.pressed = true
            player.lastKey = 's'            
            break

// Enemy Controls
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'           
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            enemy.velocity.y = -10            
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            enemy.lastKey = 'ArrowDown'            
            break                       
    }
    console.log(event.key)
})
window.addEventListener('keyup', (event) => {
    switch (event.key){
// Player Controls
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
    }

// Enemy Controls            
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break 
        case 'ArrowLeft':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowDown.pressed = false
            break     
    }
    console.log(event.key)
})
