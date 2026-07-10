import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChessBoardComponent } from '../chess-board/chess-board';
import { StockfishService } from './stockfish';
import { filter, firstValueFrom, retry, Subscription, timer } from 'rxjs';
import { Color } from '../../../../../the-knight-shift/src/app/chess-logic/models';
import { ChessBoardService } from '../chess-board/chess-board.service';
import { CommonModule } from '@angular/common';
import { MoveListComponent } from '../move-list/move-list';
import { NavigationEnd, Router } from '@angular/router';
import { ChessMove } from './models';

@Component({
  selector: 'app-computer-mode',
  imports: [CommonModule, MoveListComponent],
  templateUrl: '../chess-board/chess-board.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: '../chess-board/chess-board.css',
})
export class ComputerMode extends ChessBoardComponent implements OnInit, OnDestroy {
  private computerSubscriptions$ = new Subscription();
  private cdr: ChangeDetectorRef;
  private prevColor: Color = Color.Black;
  private FEN: string;
  constructor(
    private stockfishService: StockfishService,
    private router: Router,
  ) {
    super(inject(ChessBoardService));
    this.cdr = inject(ChangeDetectorRef);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.FEN = '';
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.chessBoardService.reset());
    const computerConfigSubscription$: Subscription =
      this.stockfishService.computerConfiguration$.subscribe({
        next: (computerConfiguration) => {
          if (computerConfiguration.color !== this.prevColor) {
            this.flipBoard();
            this.prevColor = computerConfiguration.color;
          }
          this.cdr.markForCheck();
        },
      });
    const chessBoardStateSubscription$: Subscription =
      this.chessBoardService.chessBoardState$.subscribe({
        next: async (FEN: string) => {
          this.FEN = FEN;
          if (this.chessBoard.isGameOver) {
            chessBoardStateSubscription$.unsubscribe();
            return;
          }
          const player: Color = FEN.split(' ')[1] === 'w' ? Color.White : Color.Black;
          if (player !== this.stockfishService.computerConfiguration$.value.color) return;
          let response = null;
          while (!response) {
            try {
              response = await firstValueFrom(
                this.stockfishService.getBestMove(FEN).pipe(
                  retry({
                    count: 5,
                    delay: (_, retryCount) => {
                      const waitTime = Math.pow(2, retryCount + 1) * 1;
                      return timer(waitTime);
                    },
                  }),
                ),
              );
            } catch (e) {
              this.isRetryButtonActive = true;
              this.cdr.markForCheck();
              this.awaitRetry();
            }
          }
          const { prevX, prevY, newX, newY, promotedPiece } = response;
          this.updateBoard(prevX, prevY, newX, newY, promotedPiece);
          this.cdr.markForCheck();
          this.isRetryButtonActive = false;
        },
      });
    this.computerSubscriptions$.add(chessBoardStateSubscription$);
    this.computerSubscriptions$.add(computerConfigSubscription$);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.computerSubscriptions$.unsubscribe();
  }

  private awaitRetry(): void {
    while (this.isRetryButtonActive) {
      setTimeout(() => {}, 1000);
    }
  }

  public override retry(): void {
    this.isRetryButtonActive = false;
  }
}
