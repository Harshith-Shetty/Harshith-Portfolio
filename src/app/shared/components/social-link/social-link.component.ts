import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-link',
  standalone: true,
  templateUrl: './social-link.component.html',
  styleUrl: './social-link.component.scss'
})
export class SocialLinkComponent {
  @Input() label!: string;
  @Input() url!: string;
}

