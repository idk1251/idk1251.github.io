const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const sidebarWidth = 200;
let numRows = 10;
let obstacles = [];
let multis = [];

canvas.width = window.innerWidth - sidebarWidth;
canvas.height = window.innerHeight;

class Obstacle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

class Multi {
    constructor(x, y, color, amount) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.amount = amount;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = 2;
        this.radius = 10;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Collision detection with canvas borders
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Collision detection with obstacles and multis
        obstacles.forEach(obstacle => {
            if (Math.hypot(this.x - obstacle.x, this.y - obstacle.y) < this.radius + obstacle.radius) {
                // Handle collision
                console.log('Hit an obstacle!');
            }
        });

        multis.forEach(multi => {
            if (Math.hypot(this.x - multi.x, this.y - multi.y) < this.radius + 10) {
                // Handle collision
                console.log('Hit a multi!');
            }
        });
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

function generateObstacles() {
    obstacles = [];
    for (let i = 0; i < numRows * numRows; i++) {
        const x = (canvas.width / numRows) * (i % numRows) + (canvas.width / numRows) / 2;
        const y = (canvas.height / numRows) * Math.floor(i / numRows) + (canvas.height / numRows) / 2;
        obstacles.push(new Obstacle(x, y, 5));
    }
}

function generateMultis() {
    multis = [];
    const colors = ['#ff5f5f', '#ff9f5f', '#ffdf5f', '#5fff5f', '#5fffbf', '#5f9fff', '#bf5fff', '#ff5fbf'];
    for (let i = 0; i < numRows; i++) {
        const x = (canvas.width / numRows) * i + (canvas.width / numRows) / 2;
        const y = canvas.height - 20;
        multis.push(new Multi(x, y, colors[i % colors.length], 1 + i * 0.1));
    }
}

const ball = new Ball(canvas.width / 2, canvas.height / 2);

function init() {
    generateObstacles();
    generateMultis();
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    obstacles.forEach(obstacle => obstacle.draw());
    multis.forEach(multi => multi.draw());
    ball.update();
    ball.draw();
    requestAnimationFrame(animate);
}

document.getElementById('rows8Btn').addEventListener('click', () => { numRows = 8; init(); });
document.getElementById('rows10Btn').addEventListener('click', () => { numRows = 10; init(); });
document.getElementById('rows12Btn').addEventListener('click', () => { numRows = 12; init(); });
document.getElementById('rows14Btn').addEventListener('click', () => { numRows = 14; init(); });
document.getElementById('rows16Btn').addEventListener('click', () => { numRows = 16; init(); });
document.getElementById('startGameBtn').addEventListener('click', init);

init();
