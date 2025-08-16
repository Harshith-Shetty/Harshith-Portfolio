import { Component } from '@angular/core';
import { SocialLinkComponent } from '../../shared/components/social-link/social-link.component';

interface SocialLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SocialLinkComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly name = 'Harshith Shetty';
  readonly title = 'Software Engineer';
  readonly phone = '+91 9823781701';
  readonly email = 'harshithdshetty@gmail.com';

  readonly links: SocialLink[] = [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/harshithdshetty' },
    { label: 'GitHub', url: 'https://github.com/Harshith-Shetty' },
    { label: 'LeetCode', url: 'https://leetcode.com/harshithdshetty' }
  ];
}
