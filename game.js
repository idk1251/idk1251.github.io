const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 320;  // Adjust for sidebar width
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

const obstacles = [];
const multis = [];

function init() {
    createGrid(10); // Default to 10 rows
    for (let i = 0; i < 10; i++) {
        obstacles.push(new Obstacle(Math.random() * canvas.width, Math.random() * canvas.height, 20));
    }
    for (let i = 0; i < 5; i++) {
        multis.push(new Multi(Math.random() * canvas.width, Math.random() * canvas.height, 'blue', 2));
    }
    ball = new Ball(canvas.width / 2, canvas.height / 2);
}

let ball;

function createGrid(rows) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dotSpacing = canvas.height / (rows + 1);
    const cols = Math.floor(canvas.width / dotSpacing);
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            ctx.beginPath();
            ctx.arc(j * dotSpacing, i * dotSpacing, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGrid(document.querySelector('.rows .active').getAttribute('data-rows')); // Redraw grid based on selected rows
    obstacles.forEach(obstacle => obstacle.draw());
    multis.forEach(multi => multi.draw());
    ball.update();
    ball.draw();
    requestAnimationFrame(animate);
}

init();
animate();

// Sidebar Interactions
document.querySelectorAll('.mode button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.mode .active').classList.remove('active');
        button.classList.add('active');
    });
});

document.querySelectorAll('.difficulty button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.difficulty .active').classList.remove('active');
        button.classList.add('active');
    });
});

document.querySelectorAll('.rows button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.rows .active').classList.remove('active');
        button.classList.add('active');
        createGrid(parseInt(button.getAttribute('data-rows')));
    });
});

document.querySelector('.start-game').addEventListener('click', () => {
    init(); // Reinitialize the game
});
