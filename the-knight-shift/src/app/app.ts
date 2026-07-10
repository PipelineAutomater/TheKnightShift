import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { NavMenu } from '../../../the-knight-shift/src/app/modules/nav-menu/nav-menu';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [NavMenu, RouterModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('the-knight-shift');
}
