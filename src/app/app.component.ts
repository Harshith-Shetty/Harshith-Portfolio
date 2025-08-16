import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
