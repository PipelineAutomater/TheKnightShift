import { Routes } from '@angular/router';
import { ChessBoardComponent } from './modules/chess-board/chess-board';
import { ComputerMode } from './modules/computer-mode/computer-mode';
import { App } from './app';

export const routes: Routes = [
    {path: "", redirectTo: 'against-friend', pathMatch: 'full'},
    {path: "against-friend", component: ChessBoardComponent, title: "Play against friend"},
    {path: "against-computer", component: ComputerMode, title: "Play against computer"}
];