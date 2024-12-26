// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Grid boyutu
const tileCount = canvas.width / gridSize; // Ekran boyutuna göre yılanın hareket edeceği alan
let xPos = 10; // Yılanın başlangıç X pozisyonu
let yPos = 10; // Yılanın başlangıç Y pozisyonu
let xVel = 0; // Başlangıç X hızı
let yVel = 0; // Başlangıç Y hızı
let snakeArray = [{ x: xPos, y: yPos }]; // Yılan vücudu
let food = { x: 15, y: 15 }; // Yiyecek başlangıç pozisyonu
let score = 0; // Puan

// Kontroller
document.addEventListener("keydown", changeDirection);

// Oyunun ana fonksiyonu
function gameLoop() {
    // Yılanın hareketini ve ekranın her şeyi temizlemesini sağla
    moveSnake();
    if (isGameOver()) {
        alert("Game Over! Score: " + score);
        resetGame();
        return;
    }
    clearCanvas();
    drawFood();
    drawSnake();
    checkFoodCollision();
    drawScore();
    setTimeout(gameLoop, 1000 / 15); // FPS ayarı
}

// Yılanın hareketini değiştiren fonksiyon
function moveSnake() {
    xPos += xVel;
    yPos += yVel;

    // Yılanın başını ekleyip sonunu atarak vücut büyütme
    let newHead = { x: xPos, y: yPos };
    snakeArray.unshift(newHead);

    // Eğer yılan yiyeceği yediyse, vücuda ekle ve puanı arttır
    if (xPos === food.x && yPos === food.y) {
        score += 10;
        generateFood();
    } else {
        snakeArray.pop(); // Yılanın sonunu sil
    }
}

// Yılanın çarpması kontrolü
function isGameOver() {
    if (xPos < 0 || xPos >= canvas.width || yPos < 0 || yPos >= canvas.height) {
        return true; // Ekranın dışına çıkarsa
    }

    // Yılan kendine çarparsa
    for (let i = 1; i < snakeArray.length; i++) {
        if (xPos === snakeArray[i].x && yPos === snakeArray[i].y) {
            return true;
        }
    }

    return false;
}

// Yılanı çizme fonksiyonu
function drawSnake() {
    ctx.fillStyle = "lime";
    for (let i = 0; i < snakeArray.length; i++) {
        ctx.fillRect(snakeArray[i].x * gridSize, snakeArray[i].y * gridSize, gridSize, gridSize);
    }
}

// Yiyeceği çizme fonksiyonu
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Yiyeceği rastgele bir alanda yeniden oluşturma
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
    };
}

// Yılanın yediği yiyecek ile etkileşimini kontrol etme
function checkFoodCollision() {
    if (xPos === food.x && yPos === food.y) {
        generateFood();
    }
}

// Canvas'ı temizleme fonksiyonu
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Puanı yazdırma
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Puan: " + score, 10, 20);
}

// Yön değiştirme fonksiyonu
function changeDirection(event) {
    if (event.keyCode === 37 && xVel === 0) {
        xVel = -1;
        yVel = 0;
    }
    if (event.keyCode === 38 && yVel === 0) {
        xVel = 0;
        yVel = -1;
    }
    if (event.keyCode === 39 && xVel === 0) {
        xVel = 1;
        yVel = 0;
    }
    if (event.keyCode === 40 && yVel === 0) {
        xVel = 0;
        yVel = 1;
    }
}

// Oyunu sıfırlama
function resetGame() {
    xPos = 10;
    yPos = 10;
    xVel = 0;
    yVel = 0;
    snakeArray = [{ x: xPos, y: yPos }];
    score = 0;
    generateFood();
}

// Başlat
generateFood();
gameLoop();
