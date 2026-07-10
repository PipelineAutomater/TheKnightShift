import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlayAgainstComputerDialog } from '../play-against-computer-dialog/play-against-computer-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatDialogModule, CommonModule],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class NavMenu {
  constructor(private dialog: MatDialog) {}

  public playAgainstComputer(): void {
    this.dialog.open(PlayAgainstComputerDialog);
  }
}
