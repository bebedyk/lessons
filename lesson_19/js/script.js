// Отримуємо елемент відео
const video = document.getElementById('backgroundVideo');

// Вимикаємо автоматичне відтворення і зациклення
video.autoplay = false;
video.loop = false;

// Змінна для перевірки, чи відео завершилося
let isVideoEnded = false;

// Коли відео завершується
video.addEventListener('ended', () => {
    video.pause();
    isVideoEnded = true; // Позначаємо, що відео завершилося
    video.currentTime = video.duration - 0.1; // Ставимо на останній кадр
});

// Додаємо можливість запускати відео кліком
video.addEventListener('click', () => {
    if (isVideoEnded) {
        // Якщо відео завершилося, запускаємо з початку
        video.currentTime = 0;
        isVideoEnded = false; // Скидаємо стан завершення
    }
    video.play(); // Відтворюємо
});
