import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FENConverter } from '../../../../../the-knight-shift/src/app/chess-logic/FENConverter';

@Injectable({
  providedIn: 'root'
})
export class ChessBoardService {
  public chessBoardState$ = new BehaviorSubject<string>(FENConverter.initalPosition);
  public reset(): void {
    this.chessBoardState$ = new BehaviorSubject<string>(FENConverter.initalPosition)
  }
}