import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  public open(category: string): void {
    localStorage.setItem('category', category);
  }

}
