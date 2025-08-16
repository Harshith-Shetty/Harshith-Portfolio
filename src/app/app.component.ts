import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
