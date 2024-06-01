(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const board = document.getElementById("pachinkoBoard");
        const movingBlock = document.getElementById("movingBlock");
        const ball = document.getElementById("ball");
        const prizeDisplay = document.getElementById("prizeDisplay");
        const dropBallButton = document.getElementById("dropBallButton");
        const jackpotSound = document.getElementById("jackpotSound");
        const ballSound = document.getElementById("ballSound");
        const pointSound = document.getElementById("pointSound");
        const shortSound = document.getElementById("shortSound");
        let ballDropped = false;
        let attempts = 0;
        let totalPoints = 0;
        const maxAttempts = 3;
        const jackpotPoints = 1500;
        function createPegs() {
            for (let y = 50, row = 1; y < 550; y += 50, row++) {
                const startX = row % 2 === 0 ? 25 : 50;
                for (let x = startX; x < 295; x += 50) {
                    const peg = document.createElement("div");
                    peg.classList.add("peg");
                    peg.style.left = `${x}px`;
                    peg.style.top = `${y}px`;
                    board.appendChild(peg);
                }
            }
        }
        function showFloatingNumber(points, position) {
            const number = document.createElement("div");
            number.classList.add("floating-number");
            number.textContent = points;
            number.style.left = `${position}px`;
            number.style.top = `${board.clientHeight - 60}px`;
            board.appendChild(number);
            pointSound.play();
            setTimeout((() => {
                number.remove();
                pointSound.pause();
                pointSound.currentTime = 0;
            }), 1500);
        }
        function determinePrize(finalPosition) {
            const cellWidth = board.clientWidth / 7;
            const cellIndex = Math.floor(finalPosition / cellWidth);
            let points = 0;
            switch (cellIndex) {
              case 0:
                points = 100;
                prizeDisplay.textContent = "Prize: 100 points";
                break;

              case 1:
                points = 250;
                prizeDisplay.textContent = "Prize: 250 points";
                break;

              case 2:
                points = 500;
                prizeDisplay.textContent = "Prize: 500 points";
                break;

              case 3:
                points = 1e3;
                prizeDisplay.textContent = "Prize: 1000 points";
                break;

              case 4:
                points = 500;
                prizeDisplay.textContent = "Prize: 500 points";
                break;

              case 5:
                points = 250;
                prizeDisplay.textContent = "Prize: 250 points";
                break;

              case 6:
                points = 100;
                prizeDisplay.textContent = "Prize: 100 points";
                break;

              default:
                prizeDisplay.textContent = "Prize: No points";
            }
            showFloatingNumber(points, finalPosition);
            totalPoints += points;
            attempts++;
            if (attempts >= maxAttempts) {
                if (totalPoints >= jackpotPoints) {
                    prizeDisplay.textContent = `Jackpot! Total points: ${totalPoints}`;
                    board.classList.add("jackpot");
                    prizeDisplay.classList.add("jackpot-text");
                    jackpotSound.play();
                    setTimeout((() => {
                        board.classList.remove("jackpot");
                        startSequentialFlash();
                    }), 4e3);
                    setTimeout((() => {
                        prizeDisplay.classList.remove("jackpot-text");
                        startSequentialFlash();
                    }), 17e3);
                    setTimeout((() => {
                        stopSequentialFlash();
                    }), 17e3);
                    dropBallButton.disabled = true;
                    setTimeout((() => {
                        dropBallButton.disabled = false;
                    }), 17e3);
                } else {
                    prizeDisplay.textContent = `Total points: ${totalPoints}`;
                    shortSound.play();
                    setTimeout((() => {
                        shortSound.pause();
                        shortSound.currentTime = 0;
                    }), 4e3);
                }
                attempts = 0;
                totalPoints = 0;
            } else prizeDisplay.textContent += ` | Total points: ${totalPoints}`;
            setTimeout((() => {
                ball.style.top = `${movingBlock.offsetTop + movingBlock.offsetHeight}px`;
                ball.style.left = `${movingBlock.offsetLeft + movingBlock.offsetWidth / 2 - ball.offsetWidth / 2}px`;
                ball.style.visibility = "visible";
            }), 500);
        }
        function startSequentialFlash() {
            const pegs = document.querySelectorAll(".peg");
            pegs.forEach(((peg, index) => {
                peg.style.animationDelay = `${index * .1}s`;
                peg.classList.add("sequential-flash");
            }));
        }
        function stopSequentialFlash() {
            document.querySelectorAll(".peg").forEach((peg => {
                peg.classList.remove("sequential-flash");
                peg.style.animationDelay = "";
            }));
        }
        function dropBall() {
            if (ballDropped) return;
            ballDropped = true;
            ballSound.play();
            ball.style.visibility = "visible";
            let ballTop = movingBlock.offsetTop + movingBlock.offsetHeight;
            let ballLeft = movingBlock.offsetLeft + movingBlock.offsetWidth / 2 - ball.offsetWidth / 2;
            ball.style.top = `${ballTop}px`;
            ball.style.left = `${ballLeft}px`;
            let hasBounced = false;
            const bounceDelay = 195;
            const moveBall = () => {
                ballTop += 5;
                ball.style.top = `${ballTop}px`;
            };
            const checkCollision = () => {
                const pegs = document.querySelectorAll(".peg");
                pegs.forEach((peg => {
                    const pegRect = peg.getBoundingClientRect();
                    const ballRect = ball.getBoundingClientRect();
                    if (ballRect.bottom > pegRect.top && ballRect.top < pegRect.bottom && ballRect.left < pegRect.right && ballRect.right > pegRect.left) if (!hasBounced) {
                        const v1i = 16;
                        const m1 = .5;
                        const m2 = 20;
                        const v2i = 0;
                        const v1f = (m1 - m2) / (m1 + m2) * v1i + 1 * m2 / (m1 + m2) * v2i;
                        const randomDirection = Math.random() < .5 ? -1.5 : 1.5;
                        ballLeft += v1f * randomDirection;
                        ball.style.transition = "left 0.03s";
                        ball.style.left = `${ballLeft}px`;
                        hasBounced = true;
                        setTimeout((() => {
                            hasBounced = false;
                        }), bounceDelay);
                    }
                }));
            };
            const ballInterval = setInterval((() => {
                moveBall();
                checkCollision();
                if (ballTop >= board.clientHeight - ball.offsetHeight) {
                    clearInterval(ballInterval);
                    ballSound.pause();
                    ballSound.currentTime = 0;
                    determinePrize(ballLeft);
                    ballDropped = false;
                    setTimeout((() => {
                        ball.style.visibility = "hidden";
                    }), 100);
                }
            }), 50);
        }
        function moveBallWithMovingBlock() {
            const updateBallPosition = () => {
                if (!ballDropped) {
                    ball.style.top = `${movingBlock.offsetTop + movingBlock.offsetHeight}px`;
                    ball.style.left = `${movingBlock.offsetLeft + movingBlock.offsetWidth / 2 - ball.offsetWidth / 2}px`;
                    ball.style.visibility = "visible";
                }
            };
            setInterval(updateBallPosition, 10);
        }
        createPegs();
        dropBallButton.addEventListener("click", dropBall);
        ball.style.top = `${movingBlock.offsetTop + movingBlock.offsetHeight}px`;
        ball.style.left = `${movingBlock.offsetLeft + movingBlock.offsetWidth / 2 - ball.offsetWidth / 2}px`;
        ball.style.visibility = "visible";
        moveBallWithMovingBlock();
    }));
    window["FLS"] = true;
})();