import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
}
