import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';

export enum RoutePages {
  MENU = '',
  GAME = 'game'
}

const routes: Routes = [
  { path: RoutePages.MENU, component: MenuComponent },
  { path: RoutePages.GAME, component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
