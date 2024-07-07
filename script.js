<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plinko Game</title>
  <style>
    body {
      background-color: #1a1a2e;
      color: #fff;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      display: flex;
      flex-direction: row;
    }

    .settings {
      margin-right: 20px;
    }

    canvas {
      background-color: #0f3460;
      border: 2px solid #fff;
      border-radius: 10px;
    }

    .settings div {
      margin: 10px 0;
    }

    .settings button, .settings select, .settings input {
      background-color: #16213e;
      color: #fff;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
      text-align: center;
      width: 150px;
    }

    .settings select, .settings input {
      width: 50px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="settings">
      <div>
        <label>Difficulty</label><br>
        <button onclick="setDifficulty('Easy')">Easy</button>
        <button onclick="setDifficulty('Normal')">Normal</button>
        <button onclick="setDifficulty('Hard')">Hard</button>
      </div>
      <div>
        <label>Bet Amount</label><br>
        <input type="number" id="betAmount" value="10" min="1" max="100">
      </div>
      <div>
        <label>Amount of Rows</label><br>
        <button onclick="setRows(8)">8</button>
        <button onclick="setRows(10)">10</button>
        <button onclick="setRows(12)">12</button>
        <button onclick="setRows(14)">14</button>
        <button onclick="setRows(16)">16</button>
      </div>
      <div>
        <button id="startGame">Start New Game</button>
      </div>
      <div>
        <div id="balance">Balance: $100</div>
        <button id="add-ball">Add Ball</button>
      </div>
    </div>
    <canvas id="gameCanvas" width="800" height="800"></canvas>
  </div>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const DECIMAL_MULTIPLIER = 10000;
    const WIDTH = 800;
    const HEIGHT = 800;
    const ballRadius = 7;
    const obstacleRadius = 4;
    const baseGravity = 0.2;
    let gravity = pad(baseGravity);
    const horizontalFriction = 0.4;
    const verticalFriction = 0.8;
    let balls = [];
    let balance = 100;
    let betAmount = 10;
    let rows = 10;
    let difficulty = 'Easy';

    let obstacles = [];
    let sinks = [];
    const sinkMultipliers = [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9];

    function pad(n) {
      return n * DECIMAL_MULTIPLIER;
    }

    function unpad(n) {
      return Math.floor(n / DECIMAL_MULTIPLIER);
    }

    function createObstacles() {
      obstacles = [];
      for (let row = 2; row < rows; row++) {
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;
        for (let col = 0; col < numObstacles; col++) {
          const x = WIDTH / 2 - spacing * (row / 2 - col);
          obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
        }
      }
    }

    function createSinks() {
      sinks = [];
      const sinkWidth = 36;
      for (let i = 0; i < sinkMultipliers.length; i++) {
        const x = WIDTH / 2 + (i - 7.5) * (sinkWidth) + obstacleRadius;
        const y = HEIGHT - 240;
        const width = sinkWidth;
        const height = width;
        sinks.push({ x, y, width, height, multiplier: sinkMultipliers[i % sinkMultipliers.length] });
      }
    }

    class Ball {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.stopped = false;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        if (this.stopped) return;

        this.vy = this.vy + gravity;
        this.x += this.vx;
        this.y += this.vy;

        obstacles.forEach(obstacle => {
          const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
          if (dist < pad(this.radius + obstacle.radius)) {
            const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = (Math.cos(angle) * speed * horizontalFriction);
            this.vy = Math.sin(angle) * speed * verticalFriction;
            const overlap = this.radius + obstacle.radius - unpad(dist);
            this.x += pad(Math.cos(angle) * overlap);
            this.y += pad(Math.sin(angle) * overlap);
          }
        });

        sinks.forEach(sink => {
          if (
            unpad(this.x) > sink.x - sink.width / 2 &&
            unpad(this.x) < sink.x + sink.width / 2 &&
            unpad(this.y) + this.radius > sink.y - sink.height / 2
          ) {
            this.vx = 0;
            this.vy = 0;
            this.stopped = true;
            balance += betAmount * sink.multiplier;
            updateBalance();
          }
        });
      }
    }

    function drawObstacles() {
      ctx.fillStyle = 'white';
      obstacles.forEach(obstacle => {
        ctx.beginPath();
        ctx.arc(unpad(obstacle.x), unpad(obstacle.y), obstacle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    }

    function drawSinks() {
      ctx.fillStyle = 'green';
      for (let i = 0; i < sinks.length; i++) {
        const sink = sinks[i];
        ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - obstacleRadius * 2, sink.height);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(sink.multiplier + 'x', sink.x + 8, sink.y - 10);
        ctx.fillStyle = 'green';
      };
    }

    function addBall() {
      if (balance < betAmount) return;
      const newBall = new Ball(pad(WIDTH / 2 + 13), pad(50), ballRadius, 'red');
      balls.push(newBall);
      balance -= betAmount;
      updateBalance();
    }

    function updateBalance() {
      document.getElementById('balance').innerText = 'Balance: $' + balance.toFixed(2);
    }

    function draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawObstacles();
      drawSinks();
      balls.forEach(ball => {
        ball.draw();
        ball.update();
      });
    }

    function update() {
      draw();
      requestAnimationFrame(update);
    }

    function startGame() {
      balls = [];
      createObstacles();
      createSinks();
    }

    function setDifficulty(level) {
      difficulty = level;
      switch (level) {
        case 'Easy':
          gravity = pad(baseGravity);
          break;
        case 'Normal':
          gravity = pad(baseGravity * 1.5);
          break;
        case 'Hard':
          gravity = pad(baseGravity * 2);
          break;
      }
    }

    function setRows(numRows) {
      rows = numRows;
      startGame();
    }

    document.getElementById('add-ball').addEventListener('click', addBall);
    document.getElementById('startGame').addEventListener('click', startGame);

    setDifficulty(difficulty);
    setRows(rows);
    updateBalance();
    update();
  </script>
</body>

</html>
