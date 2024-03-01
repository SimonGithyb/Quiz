import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private difficulty: string = 'random';

  public categories = [
    "linux",
    "bash",
    "php",
    "docker",
    "html",
    "mysql",
    "wordpress",
    "laravel",
    "kubernetes",
    "javascript",
    "devops"
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public open(category: string): void {
    localStorage.setItem('category', category);
    localStorage.setItem('difficulty', this.difficulty);
    this.router.navigate(['/game']);
  }

  public difficultyChange(value: any) {
    this.difficulty = value;
  }

}
