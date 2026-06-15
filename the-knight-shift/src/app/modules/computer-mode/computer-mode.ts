import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChessBoardComponent } from '../chess-board/chess-board';
import { StockfishService } from './stockfish';
import { firstValueFrom, Subscription } from 'rxjs';
import { Color } from '../../../../../the-knight-shift/src/app/chess-logic/models';
import { ChessBoardService } from '../chess-board/chess-board.service';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list';

@Component({
  selector: 'app-computer-mode',
  imports: [CommonModule, MoveListComponent],
  templateUrl: '../chess-board/chess-board.html',
  styleUrl: '../chess-board/chess-board.css',
})
export class ComputerMode extends ChessBoardComponent implements OnInit, OnDestroy{
  private computerSubscriptions$ = new Subscription();
  constructor(private stockfishService:StockfishService){
    super(inject(ChessBoardService));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    const computerConfigSubscription$: Subscription = this.stockfishService.computerConfiguration$.subscribe({next: (computerConfiguration) => {
      if (computerConfiguration.color === Color.White) this.flipBoard();
    }})
    const chessBoardStateSubscription$: Subscription = this.chessBoardService.chessBoardState$.subscribe({
      next: async (FEN:string) => {
        if (this.chessBoard.isGameOver) {
          chessBoardStateSubscription$.unsubscribe();
          return;
        }
        const player: Color = FEN.split(" ")[1] === "w" ? Color.White:  Color.Black;
        if (player !== this.stockfishService.computerConfiguration$.value.color) return;
        const {prevX, prevY, newX, newY, promotedPiece} = await firstValueFrom(this.stockfishService.getBestMove(FEN));
        this.updateBoard(prevX, prevY, newX, newY, promotedPiece);
      }
    });
    this.computerSubscriptions$.add(chessBoardStateSubscription$);
    this.computerSubscriptions$.add(computerConfigSubscription$);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.computerSubscriptions$.unsubscribe();
  }
}
