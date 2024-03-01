import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../services/main.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private category: string;
  private difficulty: string;
  private questionLimit: number = 1;
  private timeForNextQuestion: number = 1;
  private timeForEndScreen: number = 5;

  public step: number = 0;
  public currentQuestion: number = 0;
  public score: number = 0;
  public maxQuestions: number = 10;

  public questionLater = ['a)', 'b)', 'c)', 'd)', 'e)', 'f)'];
  public questionPack = [{
    question: 'question',
    multiple_correct_answers: 'multiple_correct_answers',
    answers: 'answers'
  }];

  public loading: boolean = false;
  public endGame: boolean = false;

  constructor(
    private mainSvc: MainService,
    private router: Router,
    private toast: ToastService
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
        this.questionPack = res;
        this.loading = false;
      });
  }

  checkAnswer(answerLatter: Number) {
    this.mainSvc.getAnswer(answerLatter)
      .subscribe((res: any) => {
        if(res) {
          this.score++;
          this.toast.openSnackBar('GOOD ANSWER!');
        } else {
          this.toast.openSnackBar('BAD ANSWER!');
        }

        setTimeout(() => {
          if (this.currentQuestion < this.maxQuestions)
            this.nextQuestion();
          else
            this.closeGame();
        }, this.timeForNextQuestion * 1000);
      }, error => {
         this.toast.openSnackBar(error, 'ERROR') 
      });
  }

  nextQuestion() {
    this.step += 100 / this.maxQuestions;
    this.getQuestion();
  }
  
  closeGame() {
    this.endGame = true;
    
    setTimeout(() => {
      this.goToMenu()
    }, this.timeForEndScreen * 1000);
  }

  goToMenu() {
    this.router.navigate(['/']);
  }
}
