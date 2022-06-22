const questions = [
  {},
  {
    question: "What is 1 + 1 ?",
    answer1: "0",
    answer2: "1",
    answer3: "2",
    answer4: "3",
    correctAnswer: "2",
    UserAnswer: "",
  },
  {
    question: "What is 2 + 2 ?",
    answer1: "1",
    answer2: "2",
    answer3: "3",
    answer4: "4",
    correctAnswer: "4",
    UserAnswer: "",
  },
  {
    question: "What is a + a ?",
    answer1: "a",
    answer2: "b",
    answer3: "aa",
    answer4: "bb",
    correctAnswer: "aa",
    UserAnswer: "",
  },
];

let CurrentQuestion = 0;
GenerateQuestion();

function GenerateQuestion() {
  let lastIndexQuestion = questions.length - 1;
  if (CurrentQuestion == lastIndexQuestion) {
    CalculateQuizResults();
    return;
  } else {
    CurrentQuestion++;
  }

  const QuizDiv = document.querySelector(".Quiz-container");
  QuizDiv.innerHTML = "";
  QuizDiv.innerHTML = `
      <div class="Question-container">
        <h1 class="question"><span id="Question-Id">${CurrentQuestion}</span>${questions[CurrentQuestion].question}</h1>
      </div>

      <div class="Answer-container">
        <h2 class="answer">${questions[CurrentQuestion].answer1}</h2>
        <h2 class="answer">${questions[CurrentQuestion].answer2}</h2>
        <h2 class="answer">${questions[CurrentQuestion].answer3}</h2>
        <h2 class="answer">${questions[CurrentQuestion].answer4}</h2>
      </div>

      <div class="navigator-container">
        <input type="button" value="Next" class="next-btn btn" onclick="GenerateQuestion()"/>
      </div>`;

  addEventListenerToElement();
}

function addEventListenerToElement() {
  let answer = document.getElementsByClassName("answer");
  for (let i = 0; i < answer.length; i++) {
    answer[i].addEventListener("mouseover", ChangeAnswerBackgroundColor);
    answer[i].addEventListener("mouseleave", ChangeAnswerBackgroundColor);
    answer[i].addEventListener("click", SelectAnswer);
  }

  function ChangeAnswerBackgroundColor(e) {
    if (e.target.style.background == "yellow") {
    } else if (e.target.style.background !== "") {
      e.target.style.background = "";
    } else {
      e.target.style.background = "darkseagreen";
    }
  }

  function SelectAnswer(e) {
    let QuestionId = parseInt(
      document.querySelector("#Question-Id").innerHTML.trim()
    );
    let UserAnswer = e.target.innerHTML;
    questions[QuestionId].UserAnswer = UserAnswer;

    removeBackgroundColorFromAll();
    e.target.style.background = "yellow";
  }

  function removeBackgroundColorFromAll() {
    let answer = document.getElementsByClassName("answer");
    for (let i = 0; i < answer.length; i++) {
      answer[i].style.background = "";
    }
  }
}

function CalculateQuizResults() {
  let points = 0;
  for (let i = 1; i < questions.length; i++) {
    let User_Answer = questions[i].UserAnswer;
    let correct_Answer = questions[i].correctAnswer;

    if (correct_Answer == User_Answer) {
      points++;
    }
  }
  const QuizDiv = document.querySelector(".Quiz-container");
  QuizDiv.innerHTML = "";
  QuizDiv.innerHTML = `
      <div class="Question-container">
        <h1 class="question">You Have Got ${points} Out Of ${
    questions.length - 1
  }</h1>
      </div>

      <div class="navigator-container">
        <input type="button" value="Restart" class="btn" onclick="GenerateQuestion()"/>
      </div>`;
  CurrentQuestion = 0;
}
