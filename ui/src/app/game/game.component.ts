import { Component, OnInit } from '@angular/core';

import { MainService } from '../services/main.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private category: string;
  private difficulty: string;
  private questionLimit: number = 1;
  private timeForNextQuestion: number = 10;

  public step: number = 0;
  public currentQuestion: number = 0;
  public score: number = 0;
  public maxQuestions: number = 10;

  public questionLater = ['a)', 'b)', 'c)', 'd)'];
  public questions = [];
  public answers = [];

  public loading: boolean = false;
  public multipleCorectAnswer: boolean = false;
  public endGame: boolean = false;

  constructor(
    private mainSvc: MainService,
  ) {
    this.category = localStorage.getItem("category") || "all";
    this.difficulty = localStorage.getItem("difficulty") || "random";

    this.getQuestion();
   }

  ngOnInit(): void {
  }

  getQuestion() {
    this.loading = true;
    this.currentQuestion++;

    this.mainSvc.getQuestion(this.questionLimit ,this.category, this.difficulty)
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          this.questions = element.question;
          this.multipleCorectAnswer = element.multiple_correct_answers;
          this.answers = element.answers;
        });
        this.loading = false;
      });
  }

  checkAnswer(answer: string) {
    this.mainSvc.getAnswer()
      .subscribe((res: any) => {
        if (answer === res.correct_answers)
          this.score++;
      });
      setTimeout(() => {
        if (this.currentQuestion < this.maxQuestions)
          this.nextQuestion();
        else
          this.closeGame();
      }, this.timeForNextQuestion * 1000);
  }

  nextQuestion() {
    this.step += 100 / this.maxQuestions;
    this.getQuestion();
  }
  
  closeGame() {
    this.endGame = true;
  }
}
