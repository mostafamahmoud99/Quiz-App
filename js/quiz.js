// global variable
let currentElement = document.getElementById("current");
let totalAmountElement = document.getElementById("totalAmount");
let questionElement = document.getElementById("question");
let rowAnswer = document.getElementById("rowAnswer");
let next = document.getElementById("next");
let scoreElement = document.getElementById('score');


export class Quiz {
  constructor(result, amount) {
    this.index = 0;
    this.result = result;
    this.amount = amount;
    this.current = currentElement;
    this.totalAmount = totalAmountElement;
    this.question = questionElement;
    this.rowAnswer = rowAnswer;
    this.scoreElement = scoreElement;
    this.score = 0;
    this.next = next;
    this.show();
    this.next.addEventListener("click", () => {
      this.nextQes();
    });
  }
  // show data
  show() {
    this.current.innerHTML = this.index + 1;
    this.totalAmount.innerHTML = this.amount;
    this.question.innerHTML = this.result[this.index].question;
    let answer = [this.result[this.index].correct_answer,...this.result[this.index].incorrect_answers];
    let reAns = this.getRandomAnswer(answer);
    this.display(reAns);
  }
// get random questions
  getRandomAnswer(answer) {
    let ranNums = [],
      i = answer.length,
      j = 0;

    while (i) {
      j = Math.floor(Math.random() * (i));
      ranNums.push(answer[j]);
      answer.splice(j, 1);
      i--;
    }
    return ranNums;
  }
// display qestions after random
  display(reAns) {
    let box = ``;
    for (let i = 0; i < reAns.length; i++) {
      box += `<input type='radio' name='choice' value='${reAns[i]}'/> ${reAns[i]} </br>`;
    }
    this.rowAnswer.innerHTML = box;
  }
// get next qestion
  nextQes() {
    let answerChoice = Array.from(document.getElementsByName("choice"));
    answerChoice = answerChoice.filter((e) => e.checked);
    if (answerChoice.length == 0) {
      $(".alert").fadeIn(500);
    } else {
      $(".alert").fadeOut(500);
      this.checkAns(answerChoice[0].value);
      this.plusQuestion();
    }
  }
// check answer
  checkAns(myAns) {
    if (this.result[this.index].correct_answer == myAns) {
      $("#Correct").fadeIn(500, () => {
        this.showNotification();
        this.score++
      });
    } else {
      $("#inCorrect").fadeIn(500, () => {
        this.showNotification();
      });
    }
  }
// get next qestion 
  plusQuestion() {
    this.index++;
    this.index >= this.amount ? this.finish() : this.show();
  }
// notifications
  showNotification() {
    $("#Correct").fadeOut(0);
    $("#inCorrect").fadeOut(0);
  }
// finish quiz
  finish() {
    $("#quiz").fadeOut(800, () => {
      $("#finish").fadeIn(500);
      this.scoreElement.innerHTML = this.score;
      $('#tryBtn').on('click',()=>{
        $("#finish").fadeOut(500,()=>{
          $('#setting').fadeIn(500)
        })
      })
    });
  }
}
