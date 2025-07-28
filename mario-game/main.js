const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let runner = {
  x: 100, y: canvas.height - 100,
  width: 60, height: 60,
  vy: 0, gravity: 1.5,
  grounded: false,
  legToggle: false,
};

const obstacles = [];
let frame = 0;
let gameRunning = false;

// Load Mr Bean face image
const beanImg = new Image();
beanImg.src = 'https://favpng.com/png_view/mrbean-rowan-atkinson-mr-bean-zazu-humour-laughter-png/YPQPVrjE' ;

document.addEventListener("keydown", e => {
  if (e.code === "Space" && runner.grounded) {
    runner.vy = -20;
    runner.grounded = false;
  }
});

function startGame() {
  gameRunning = true;
  requestAnimationFrame(loop);
}

function loop() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // squares as obstacles
  if (frame % 120 === 0) {
    obstacles.push({ x: canvas.width, y: canvas.height - 50, w: 30, h: 50 });
  }

  obstacles.forEach((obs, index) => {
    obs.x -= 4;
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

    // collision?
    if (runner.x < obs.x + obs.w && runner.x + runner.width > obs.x &&
        runner.y < obs.y + obs.h && runner.y + runner.height > obs.y) {
      gameRunning = false;
    }

    if (obs.x + obs.w < 0) obstacles.splice(index,1);
  });

  // gravity + position
  runner.vy += runner.gravity;
  runner.y += runner.vy;
  if (runner.y > canvas.height - runner.height - 20) {
    runner.y = canvas.height - runner.height - 20;
    runner.vy = 0;
    runner.grounded = true;
  }

  drawRunner();
  frame++;
  requestAnimationFrame(loop);
}

function drawRunner() {
  const { x, y, width, height } = runner;
  ctx.drawImage(beanImg, x, y, width, height);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (runner.legToggle) {
    ctx.moveTo(x+15,y+height);
    ctx.lineTo(x+5,y+height+20);
    ctx.moveTo(x+45,y+height);
    ctx.lineTo(x+55,y+height+20);
  } else {
    ctx.moveTo(x+15,y+height);
    ctx.lineTo(x+25,y+height+20);
    ctx.moveTo(x+45,y+height);
    ctx.lineTo(x+35,y+height+20);
  }
  ctx.stroke();
  runner.legToggle = !runner.legToggle;
}



// const homeScreen = document.getElementById('homeScreen');
// const gameScreen = document.getElementById('gameScreen');
// const startBtn = document.getElementById('startBtn');
// const scoreDiv = document.getElementById('score');

// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');

// const config = {
//   gravity: 0.8,
//   jumpPower: 15,
//   marioWidth: 40,
//   marioHeight: 50,
//   obstacleWidth: 30,
//   obstacleHeight: 40,
//   obstacleGapMin: 200,
//   obstacleGapMax: 400,
//   speed: 5,
//   homeX: 3000,
// };

// let mario;
// let obstacles;
// let keys;
// let distance;
// let gameRunning;
// let animationId;
// let scrollX;

// function initGame() {
//   mario = {
//     x: 100,
//     y: canvas.height - config.marioHeight - 50,
//     width: config.marioWidth,
//     height: config.marioHeight,
//     dy: 0,
//     grounded: true,
//     color: 'red',
//   };

//   obstacles = [];
//   keys = {};
//   distance = 0;
//   scrollX = 0;
//   gameRunning = true;
//   scoreDiv.textContent = 'Distance: 0';

//   let nextObstacleX = 600;
//   while (nextObstacleX < config.homeX) {
//     obstacles.push({
//       x: nextObstacleX,
//       y: canvas.height - config.obstacleHeight - 50,
//       width: config.obstacleWidth,
//       height: config.obstacleHeight,
//       color: 'brown',
//     });
//     nextObstacleX += config.obstacleGapMin + Math.random() * (config.obstacleGapMax - config.obstacleGapMin);
//   }
// }

// function clear() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function drawGround() {
//   ctx.fillStyle = '#654321';
//   ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
// }

// function drawMario() {
//   // Body
//   ctx.fillStyle = mario.color;
//   ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

//   // Face
//   const faceRadius = 15;
//   const faceX = mario.x + mario.width / 2;
//   const faceY = mario.y + 20;

//   ctx.fillStyle = '#f5d6b4'; // skin tone
//   ctx.beginPath();
//   ctx.arc(faceX, faceY, faceRadius, 0, Math.PI * 2);
//   ctx.fill();

//   // Eyes
//   ctx.fillStyle = 'black';
//   ctx.beginPath();
//   ctx.arc(faceX - 6, faceY - 3, 3, 0, Math.PI * 2);
//   ctx.fill();

//   ctx.beginPath();
//   ctx.arc(faceX + 6, faceY - 3, 3, 0, Math.PI * 2);
//   ctx.fill();

//   // Mouth (smile)
//   ctx.strokeStyle = 'black';
//   ctx.lineWidth = 2;
//   ctx.beginPath();
//   ctx.arc(faceX, faceY + 5, 7, 0, Math.PI);
//   ctx.stroke();

//   // Nose (line)
//   ctx.beginPath();
//   ctx.moveTo(faceX, faceY);
//   ctx.lineTo(faceX, faceY + 5);
//   ctx.stroke();
// }

// function drawObstacles() {
//   obstacles.forEach(obs => {
//     const screenX = obs.x - scrollX;
//     if (screenX + obs.width > 0 && screenX < canvas.width) {
//       ctx.fillStyle = obs.color;
//       ctx.fillRect(screenX, obs.y, obs.width, obs.height);
//     }
//   });
// }

// function update() {
//   if (!gameRunning) return;

//   let moveX = 0;
//   if (keys.right) moveX = config.speed;
//   if (keys.left) moveX = -config.speed;

//   mario.x += moveX;

//   // No left wall, allow negative x (offscreen left)
//   if (mario.x > canvas.width / 2) {
//     scrollX += moveX;
//     mario.x = canvas.width / 2;
//   }

//   distance = scrollX + mario.x;
//   if (distance < 0) distance = 0;
//   scoreDiv.textContent = 'Distance: ' + Math.floor(distance);

//   if (!mario.grounded) {
//     mario.dy += config.gravity;
//     mario.y += mario.dy;
//     if (mario.y + mario.height >= canvas.height - 50) {
//       mario.y = canvas.height - 50 - mario.height;
//       mario.grounded = true;
//       mario.dy = 0;
//     }
//   }

//   if ((keys.up || keys.space) && mario.grounded) {
//     mario.dy = -config.jumpPower;
//     mario.grounded = false;
//   }

//   // Collision detection
//   for (let obs of obstacles) {
//     const screenX = obs.x - scrollX;
//     if (
//       screenX < mario.x + mario.width &&
//       screenX + obs.width > mario.x &&
//       mario.y + mario.height > obs.y
//     ) {
//       gameOver();
//       return;
//     }
//   }

//   clear();
//   drawGround();
//   drawObstacles();
//   drawMario();

//   if (distance >= config.homeX) {
//     youWin();
//     return;
//   }

//   animationId = requestAnimationFrame(update);
// }

// function gameOver() {
//   gameRunning = false;
//   cancelAnimationFrame(animationId);
//   let restart = confirm("Game Over! You hit an obstacle!\n\nRestart?");
//   if (restart) {
//     startGame();
//   } else {
//     backToHome();
//   }
// }

// function youWin() {
//   gameRunning = false;
//   cancelAnimationFrame(animationId);
//   let restart = confirm("🎉 You Win! You reached home!\n\nPlay again?");
//   if (restart) {
//     startGame();
//   } else {
//     backToHome();
//   }
// }

// function backToHome() {
//   gameScreen.style.display = 'none';
//   homeScreen.style.display = 'block';
// }

// function startGame() {
//   initGame();
//   homeScreen.style.display = 'none';
//   gameScreen.style.display = 'block';
//   update();
// }

// startBtn.addEventListener('click', () => {
//   startGame();
// });

// window.addEventListener('keydown', (e) => {
//   if (!gameRunning) return;
//   if (e.key === 'ArrowUp') keys.up = true;
//   if (e.key === ' ') keys.space = true;
//   if (e.key === 'ArrowRight') keys.right = true;
//   if (e.key === 'ArrowLeft') keys.left = true;
// });

// window.addEventListener('keyup', (e) => {
//   if (!gameRunning) return;
//   if (e.key === 'ArrowUp') keys.up = false;
//   if (e.key === ' ') keys.space = false;
//   if (e.key === 'ArrowRight') keys.right = false;
//   if (e.key === 'ArrowLeft') keys.left = false;
// });

