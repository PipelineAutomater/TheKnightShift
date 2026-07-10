import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoveList } from '../../../../../the-knight-shift/src/app/chess-logic/models';

@Component({
  selector: 'app-move-list',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './move-list.html',
  styleUrls: ['./move-list.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class MoveListComponent {
  @Input({ required: true }) public moveList!: MoveList;
  @Input({ required: true }) public gameHistoryPointer: number = 0;
  @Input({ required: true }) public gameHistoryLength: number = 1;
  @Output() public showPreviousPositionEvent = new EventEmitter<number>();

  public showPreviousPosition(moveIndex: number): void {
    this.showPreviousPositionEvent.emit(moveIndex);
  }
}
