import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Experience } from '../../models/experience.model';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor, ExperienceCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      company: 'Indus Valley Partners',
      role: 'Associate Software Engineer',
      location: 'Mumbai, India',
      start: 'July 2023',
      end: 'Present',
      achievements: [
        'Engineered and supported scalable FinTech applications using .NET Core, C, SQL, and Angular, enabling 32B Euro AUM tracking across 6,000+ issuers and 15,000 assets with improved system efficiency.',
        'Designed investment data tools and automated workflows for 500+ portfolio companies and 100K+ positions, improving operational efficiency and reducing API response times by 85%.',
        'Implemented Azure-based data solutions utilizing WebApps, Data Factories, Service Bus, Blob Storage, and Azure Functions, automating ETL processes to enhance data ingestion and overall performance.',
        'Created data pipelines and AG Grid dashboards to support real-time financial decision-making, improving integration with other systems and enabling more effective portfolio management based on calculation engine results.'
      ]
    }
  ];
}
