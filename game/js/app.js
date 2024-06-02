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
        const msgButton = document.getElementById("msg");
        const win = document.getElementById("win");
        let ballDropped = false;
        let attempts = 0;
        let totalPoints = 0;
        const maxAttempts = 3;
        const jackpotPoints = 1500;
        function createPegs() {
            const maxScreenWidth = 991;
            const maxYForSmallScreen = 450;
            const maxYForLargeScreen = 560;
            let maxY;
            if (window.innerWidth <= maxScreenWidth) maxY = maxYForSmallScreen; else maxY = maxYForLargeScreen;
            for (let y = 55, row = 1; y < maxY; y += 55, row++) {
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
        function clearPegs() {
            const pegs = document.querySelectorAll(".peg");
            pegs.forEach((peg => peg.remove()));
        }
        createPegs();
        function showFloatingNumber(points, position) {
            const number = document.createElement("div");
            number.classList.add("floating-number");
            number.textContent = points;
            let leftPosition = position;
            if (leftPosition < 0) leftPosition = 0; else if (leftPosition > board.clientWidth - 30) leftPosition = board.clientWidth - 30;
            number.style.left = `${leftPosition}px`;
            number.style.top = `${board.clientHeight - 50}px`;
            board.appendChild(number);
            pointSound.play();
            setTimeout((() => {
                number.remove();
                pointSound.pause();
                pointSound.currentTime = 0;
            }), 1500);
        }
        function determinePrize(finalPosition) {
            const cellWidths = [ 30, 47, 47, 47, 47, 47, 30 ];
            const cellOffsets = cellWidths.map(((width, index) => cellWidths.slice(0, index).reduce(((acc, val) => acc + val), 0)));
            let cellIndex = cellOffsets.findIndex(((offset, index) => finalPosition >= offset && finalPosition < offset + cellWidths[index]));
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
                    win.classList.add("win");
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
                        win.classList.remove("win");
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
            let ballRotation = 0;
            ball.style.top = `${ballTop}px`;
            ball.style.left = `${ballLeft}px`;
            let hasBounced = false;
            const bounceDelay = 360;
            const moveBall = () => {
                ballTop += 4.1;
                if (ballTop >= board.clientHeight - ball.offsetHeight) ballTop = board.clientHeight - ball.offsetHeight;
                ball.style.top = `${ballTop}px`;
            };
            const checkCollision = () => {
                document.querySelectorAll(".peg").forEach((peg => {
                    const pegRect = peg.getBoundingClientRect();
                    const ballRect = ball.getBoundingClientRect();
                    if (ballRect.bottom > pegRect.top && ballRect.top < pegRect.bottom && ballRect.left < pegRect.right && ballRect.right > pegRect.left) if (!hasBounced) {
                        const v1i = 16, m1 = .5, m2 = 20, v2i = 0;
                        const v1f = (m1 - m2) / (m1 + m2) * v1i + 2 * m2 / (m1 + m2) * v2i;
                        const randomDirection = Math.random() < .5 ? -1.55 : 1.55;
                        ballLeft = Math.min(Math.max(ballLeft + v1f * randomDirection, 0), board.clientWidth - ball.offsetWidth);
                        ballRotation += (Math.random() * 640 + 180) * randomDirection;
                        ball.style.transition = "left 0.08s, transform 1.3s ease-out";
                        ball.style.left = `${ballLeft}px`;
                        ball.style.transform = `rotate(${ballRotation}deg)`;
                        hasBounced = true;
                        setTimeout((() => hasBounced = false), bounceDelay);
                        peg.classList.add("collision");
                        setTimeout((() => {
                            peg.classList.remove("collision");
                        }), 300);
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
                    ball.style.transition = "";
                    setTimeout((() => {
                        ball.style.opacity = 0;
                        ball.style.visibility = "hidden";
                        ball.style.transform = "rotate(0deg)";
                        setTimeout((() => {
                            ballDropped = false;
                        }), 1700);
                    }), 100);
                    setTimeout((() => {
                        ball.style.opacity = 1;
                    }), 1900);
                }
            }), 45);
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
        msgButton.addEventListener("click", (() => {
            ball.style.transition = "left 0.01s";
        }));
        dropBallButton.addEventListener("click", dropBall);
        ball.style.top = `${movingBlock.offsetTop + movingBlock.offsetHeight}px`;
        ball.style.left = `${movingBlock.offsetLeft + movingBlock.offsetWidth / 2 - ball.offsetWidth / 2}px`;
        ball.style.visibility = "visible";
        moveBallWithMovingBlock();
        window.addEventListener("resize", (() => {
            clearPegs();
            createPegs();
        }));
    }));
})();