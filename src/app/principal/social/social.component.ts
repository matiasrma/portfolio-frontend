import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Social } from '../../Model/social';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  private socialService = inject(SocialService);
  socials: Social[] = [];  

  ngOnInit(): void {
    this.ObtenerLista();
  }

  async ObtenerLista(): Promise<void> {
    this.socials = await this.socialService.ObtenerLista(1);
  }
}
