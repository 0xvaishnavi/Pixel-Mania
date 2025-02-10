document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("gameCanvas");
    if (!canvas) {
        console.error("Canvas element not found! Make sure your HTML has <canvas id='gameCanvas'>");
        return;
    }

    const ctx = canvas.getContext("2d");

    const background = new Image();
    background.src = "backgroundnew.jpg";
    let bgX = 0;
    let bgSpeed = 0.5;

    const player = {
        x: 50,
        y: 230,
        width: 60,
        height: 60,
        speed: 5,
        spriteRight1: new Image(),
        spriteRight2: new Image(),
        spriteLeft1: new Image(),
        spriteLeft2: new Image(),
        direction: "right",
        currentSprite: 1
    };

    player.spriteRight1.src = "player_right.png";
    player.spriteRight2.src = "player_right.png";
    player.spriteLeft1.src = "player_left.png";
    player.spriteLeft2.src = "player_left.png";

    const obstacleImg = new Image();
    const obstacleImg2 = new Image();
    const obstacleImg3 = new Image();
    const obstacleImg4 = new Image();

    obstacleImg.src = "obstacle.png";
    obstacleImg2.src = "gold-coin.png";
    obstacleImg3.src = "obstacle2.png";
    obstacleImg4.src = "stone.png";

    let obstacles = [{ x: 800, y: 234, width: 50, height: 50 }];
    let obstacles2 = [{ x: 600, y: 134, width: 20, height: 20 }];
    let obstacles3 = [{ x: 450, y: 234, width: 35, height: 35 }];
    let obstacles4 = [{ x: 1150, y: 234, width: 50, height: 50 }];

    let keys = {};
    let score = 0;
    let difficulty = 30;
    let jump = false;
    let velocityY = 0;
    const gravity = 0.5;

    document.addEventListener("keydown", (e) => keys[e.key] = true);
    document.addEventListener("keyup", (e) => delete keys[e.key]);


    //sound options
const coingather = new Audio("coingather.mp3");
const gameOverSound = new Audio("1reverse.mp3");
const jumpSound = new Audio("jump.mp3");

//play on jump
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && !jump) {
        jump = true;
        velocityY = -10;
        jumpSound.play(); // Play jump sound
    }
});

    //soldier options
    function update() {

        //power up max option
        if (score>1000){
            player.width="70";
            player.height="70";
        }
        if (keys["ArrowRight"]) {
            player.direction = "right";
            player.currentSprite = player.currentSprite === 1 ? 2 : 1;
            player.x += player.speed;
        }
        if (keys["ArrowLeft"]) {
            player.direction = "left";
            player.currentSprite = player.currentSprite === 1 ? 2 : 1;
            player.x -= player.speed;
        }
        if (keys["ArrowUp"] && !jump) {
            jump = true;
            velocityY = -10;
        }

        if (jump) {
            player.y += velocityY;
            velocityY += gravity * (player.y < 180 ? 0.7 : 1.2);
            if (player.y >= 230) {
                player.y = 230;
                jump = false;
                velocityY = 0;
            }
        }

        //obstacles set 1 - slime monster
        obstacles.forEach(ob => ob.x -= (bgSpeed * 4));
        if (obstacles[0].x < -40) {
            obstacles.push({ x: canvas.width + Math.random() * difficulty, y: 234, width: 50, height: 50 });
            obstacles.shift();
            score += 10;
            if (score % 50 === 0) difficulty -= 5;
        }

        obstacles.forEach(ob => {
            if (
                player.x < ob.x + ob.width &&
                player.x + player.width > ob.x &&
                player.y + player.height > ob.y
            ) {
                gameOverSound.play(); 
                alert("Your soldier is dead! Score: " + score);
                score = 0;
                player.x = 50;
                player.y = 230;
                obstacles = [{ x: 800, y: 234, width: 40, height: 40 }];
                difficulty = 50;
                velocityY = 0;
                jump = false;
            }
        });

        //obstacles set 4- slime monster
        obstacles4.forEach(ob => ob.x -= (bgSpeed * 4));
        if (obstacles4[0].x < -40) {
            obstacles4.push({ x: canvas.width + Math.random() * difficulty, y: 234, width: 50, height: 50 });
            obstacles4.shift();
            score += 10;
            if (score % 50 === 0) difficulty -= 5;
        }

        obstacles4.forEach(ob => {
            if (
                player.x < ob.x + ob.width &&
                player.x + player.width > ob.x &&
                player.y + player.height > ob.y
            ) {
                alert("Your soldier is dead! Score: " + score);
                score = 0;
                player.x = 50;
                player.y = 230;
                obstacles4 = [{ x: 1000, y: 234, width: 40, height: 40 }];
                difficulty = 50;
                velocityY = 0;
                jump = false;
            }
        });

        
        //obstacles set 3 - flower
        obstacles3.forEach(ob => ob.x -= (bgSpeed * 4));
        if (obstacles3[0].x < -40) {
            obstacles3.push({ x: canvas.width + Math.random() * difficulty, y: 234, width: 35, height: 35 });
            obstacles3.shift();
            score += 10;
            if (score % 50 === 0) difficulty -= 5;
        }
        obstacles3.forEach(ob => {
            if (
                player.x < ob.x + ob.width &&
                player.x + player.width > ob.x &&
                player.y + player.height > ob.y
            ) {
                alert("Your soldier is dead! Score: " + score);
                score = 0;
                player.x = 50;
                player.y = 230;
                obstacles3 = [{ x: 450, y: 234, width: 35, height: 35 }];
                difficulty = 30;
                velocityY = 0;
                jump = false;
            }
        });


        //obstacle set 2 -> coins (power up)        
        obstacles2.forEach(ob => ob.x -= (bgSpeed * 4));
        if (obstacles2[0].x < -40) {
            obstacles2.push({ x: canvas.width + Math.random() * difficulty, y: 234, width: 20, height: 20 });
            obstacles2.shift();
            score += 10;
            if (score % 50 === 0) difficulty -= 5;
        }

        obstacles2.forEach(ob => {
            if (
                player.x < ob.x + ob.width &&
                player.x + player.width > ob.x &&
                player.y + player.height > ob.y
            ) {
                score += 20;
                obstacles2 = [{ x: 950, y: 160, width: 20, height: 20 }];
                difficulty = 10;
                velocityY = 0;
                jump = false;
                ob.width = 0;
                ob.height = 0;
            }
        });

        bgX -= bgSpeed;
        if (bgX <= -canvas.width) bgX = 0;
    }

    //canvas styling
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, bgX, 0, canvas.width, canvas.height);
        ctx.drawImage(background, bgX + canvas.width, 0, canvas.width, canvas.height);
        let sprite = player.direction === "right"
            ? (player.currentSprite === 1 ? player.spriteRight1 : player.spriteRight2)
            : (player.currentSprite === 1 ? player.spriteLeft1 : player.spriteLeft2);
        ctx.drawImage(sprite, player.x, player.y, player.width, player.height);
        obstacles.forEach(ob => ctx.drawImage(obstacleImg, ob.x, ob.y, ob.width, ob.height));
        obstacles2.forEach(ob => ctx.drawImage(obstacleImg2, ob.x, ob.y, ob.width, ob.height));
        obstacles3.forEach(ob => ctx.drawImage(obstacleImg3, ob.x, ob.y, ob.width, ob.height));
        obstacles4.forEach(ob => ctx.drawImage(obstacleImg4, ob.x, ob.y, ob.width, ob.height));
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("High Score: " + (localStorage.getItem("highScore") || 0), 10, 50);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    //restart    
    function resetGame() {
        score = 0;
        player.x = 50;
        player.y = 230;
        obstacles = [{ x: 800, y: 234, width: 40, height: 40 }];
        difficulty = 50;
        velocityY = 0;
        jump = false;
    }
    document.getElementById("restartButton").addEventListener("click", resetGame);

    background.onload = () => {
        player.spriteRight1.onload = () => {
            player.spriteRight2.onload = () => {
                player.spriteLeft1.onload = () => {
                    player.spriteLeft2.onload = () => {
                        gameLoop();
                    };
                };
            };
        };
    };
});
