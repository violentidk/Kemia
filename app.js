// Fetch questions from the JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((questions) => initializeQuiz(questions));

let currentQuestionIndex = 0;
let selectedOption = null;

// Initialize Quiz
function initializeQuiz(questions) {
  const questionTitle = document.getElementById("question-title");
  const optionsContainer = document.getElementById("options-container");
  const checkAnswerButton = document.getElementById("check-answer");
  const nextButton = document.getElementById("next-button");

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => {
        // Unselect previous selection
        document.querySelectorAll(".option").forEach((el) => {
          el.classList.remove("selected");
        });
        optionElement.classList.add("selected");
        selectedOption = index;
        checkAnswerButton.disabled = false;
      });
      optionsContainer.appendChild(optionElement);
    });
  }

  checkAnswerButton.addEventListener("click", () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll(".option");

    options.forEach((option, index) => {
      option.classList.remove("selected");
      if (index === currentQuestion.correctAnswer) {
        option.classList.add("correct");
      } else if (index === selectedOption) {
        option.classList.add("wrong");
      }
    });

    checkAnswerButton.disabled = true;
    nextButton.disabled = false;
  });

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      nextButton.disabled = true;
      checkAnswerButton.disabled = true;
    } else {
      document.getElementById("quiz-container").innerHTML =
        "<h2>Test on lõppenud! Tubli töö!</h2>";
    }
  });

  loadQuestion();
}
