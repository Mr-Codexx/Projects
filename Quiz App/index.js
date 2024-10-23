const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Great White Shark", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let userName = '';
let score = 0;
let timerInterval;
const passingScore = 0.8; // 80% to pass
let totalQuestions = questions.length;

// Get elements from the DOM
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const quizInfo = document.getElementById('quiz-info');
const timerDisplay = document.getElementById('timer');
const attemptedInfo = document.getElementById('attempted-info');
const reportCard = document.getElementById('report-card');
const reportContent = document.getElementById('report-content');
const restartQuizButton = document.getElementById('restart-quiz');
const toastBody = document.getElementById('toast-body');
const toastElement = document.getElementById('toast');

// Start the app by showing the name modal
const nameModal = new bootstrap.Modal(document.getElementById('nameModal'));
nameModal.show();

// Start Quiz button
document.getElementById('startQuizBtn').addEventListener('click', () => {
    userName = document.getElementById('userName').value;
    if (userName) {
        nameModal.hide();
        showTermsAndConditions();
    } else {
        showToast('Please enter your name.');
    }
});

// Show terms and conditions
function showTermsAndConditions() {
    showToast('You have accepted the terms and conditions. Starting the quiz!', 'success');
    setTimeout(startQuiz, 2000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block';
    quizInfo.style.display = 'block';
    nextButton.style.display = 'none';
    
    startTimer();
    updateAttemptedInfo();
    showQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
    let timeLeft = 60; // 60 seconds
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateAttemptedInfo() {
    attemptedInfo.innerText = `Attempted: ${currentQuestionIndex} | Remaining: ${totalQuestions - currentQuestionIndex}`;
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-light', 'mb-2');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
    updateAttemptedInfo();
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    clearInterval(timerInterval);
    const percentageScore = score / totalQuestions;
    showReportCard(percentageScore);
    localStorage.setItem(userName, JSON.stringify({ score, percentage: percentageScore }));
}

function showReportCard(percentageScore) {
    reportCard.style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none'; // Hide quiz
    const status = percentageScore >= passingScore ? 'Passed' : 'Failed';
    reportContent.innerHTML = `
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Score:</strong> ${score} / ${totalQuestions}</p>
        <p><strong>Percentage:</strong> ${(percentageScore * 100).toFixed(2)}%</p>
        <p><strong>Status:</strong> ${status}</p>
    `;
}

restartQuizButton.addEventListener('click', () => {
    reportCard.style.display = 'none';
    startQuiz();
});

// Toast function
function showToast(message, type = 'info') {
    toastBody.innerText = message;
    toastElement.className = `toast bg-${type}`;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}
