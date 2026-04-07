// Écrans
const screens = document.querySelectorAll(".screen");
function showScreen(id){
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// Quiz : 15 questions
const quiz = [
    { question: "Quel est l’usage principal de Word ?", answers: ["Rédiger documents", "Excel", "PowerPoint", "Teams"], correct: 0 },
    { question: "Excel sert surtout à ?", answers: ["Présentations", "Calculs et données", "Emails", "Réunions"], correct: 1 },
    { question: "PowerPoint sert à ?", answers: ["Tableaux", "Emails", "Présentations", "Calendrier"], correct: 2 },
    { question: "Teams est utilisé pour ?", answers: ["Gestion de projet", "Communication & réunions", "Création documents", "Calculs"], correct: 1 },
    { question: "Outlook permet de ?", answers: ["Créer des tableaux", "Envoyer/recevoir emails", "Présentations", "Analyser données"], correct: 1 },
    { question: "OneNote sert à ?", answers: ["Prendre des notes", "Calculs", "Réunions", "Présentations"], correct: 0 },
    { question: "Forms permet de ?", answers: ["Créer sondages et quiz", "Envoyer emails", "Présentations", "Tableaux"], correct: 0 },
    { question: "Planner sert à ?", answers: ["Planification des tâches", "Calculs", "Emails", "Présentations"], correct: 0 },
    { question: "SharePoint est pour ?", answers: ["Stockage et partage fichiers", "Notes", "Réunions", "Emails"], correct: 0 },
    { question: "OneDrive sert à ?", answers: ["Stockage en ligne", "Emails", "Création documents", "Réunions"], correct: 0 },
    { question: "Teams peut intégrer ?", answers: ["PowerPoint & Excel", "Photoshop", "Zoom", "WordPress"], correct: 0 },
    { question: "Outlook peut gérer ?", answers: ["Calendrier et emails", "Présentations", "Notes", "Calculs"], correct: 0 },
    { question: "Qui peut accéder à SharePoint ?", answers: ["Collaborateurs autorisés", "Tout le monde", "Personne", "Seulement admins"], correct: 0 },
    { question: "Quelle application pour créer un PDF ?", answers: ["Word", "Excel", "PowerPoint", "Teams"], correct: 0 },
    { question: "Comment partager un fichier OneDrive ?", answers: ["Lien de partage", "Email uniquement", "Impression", "Téléphone"], correct: 0 },
];

// Variables quiz
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

// Afficher question
function loadQuestion() {
    const q = quiz[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;

        btn.addEventListener("click", () => {
            selectedAnswer = index;
            document.querySelectorAll("#answers button").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            document.getElementById("nextBtn").disabled = false;
        });

        answersDiv.appendChild(btn);
    });

    document.getElementById("nextBtn").disabled = true;
    updateProgress();
}

// Barre de progression
function updateProgress() {
    const percent = (currentQuestion / quiz.length) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}

// Suivant
document.getElementById("nextBtn").addEventListener("click", () => {
    if(selectedAnswer === quiz[currentQuestion].correct){
        score++;
    }
    currentQuestion++;

    // Après Q7 → formulaire
    if(currentQuestion === 7){
        showScreen("screen3");
        return;
    }

    if(currentQuestion < quiz.length){
        loadQuestion();
    } else {
        showScore();
    }
});

// Boutons accueil
document.getElementById("btnTest").addEventListener("click", () => {
    showScreen("screen2");
    loadQuestion();
});

document.getElementById("btnFormation").addEventListener("click", () => showScreen("screen4"));

// Afficher score
function showScore() {
    showScreen("screen3");
    const screen3 = document.getElementById("screen3");
    screen3.innerHTML = `
        <h2>Quiz terminé !</h2>
        <p>Votre score : ${score} / ${quiz.length}</p>
        <button id="restartBtn">Recommencer</button>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        selectedAnswer = null;
        showScreen("screen2");
        loadQuestion();
    });
}

// Formulaire simple
document.getElementById("contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Formulaire envoyé !");
});