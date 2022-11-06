// global variable
let categoryElement = document.getElementById("category");
let amountElement = document.getElementById("Number");
let difficultyElement = Array.from(document.getElementsByName("difficulty"));
let startBtn = document.getElementById("startBtn");

// import quiz 
import {Quiz} from "./quiz.js"




export class Settings {
  constructor() {
    this.category = categoryElement;
    this.amount = amountElement;
    this.difficulty = difficultyElement;
    this.start = startBtn;
    this.start.addEventListener("click", () => {
      this.startQuiz();
    });
  }

  // start quiz
  async startQuiz() {
    let category = this.category.value;
    let amount = this.amount.value;
    let difficulty = this.difficulty.filter((d) => d.checked);
    let result = await this.fetchUrl(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`
    );
    if (result.length > 0) {
      $("#setting").fadeOut(500, () => {
        $("#quiz").fadeIn(500);
        new Quiz(result,amount);
      });
    }
  }
  // fetch data 
  async fetchUrl(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results)
    return data.results;
  }
}

