import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private category: string;
  
  public step: number = 0;
  public loading: boolean = true;

  constructor() {
    this.category = localStorage.getItem("category") || "all";
   }

  ngOnInit(): void {
  }

}
