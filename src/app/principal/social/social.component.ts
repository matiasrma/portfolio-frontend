import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Social } from 'src/app/Model/social';
import { ImageService } from 'src/app/services/image.service';
import { SocialService } from 'src/app/services/social.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SocialComponent implements OnInit {

  //islogged: boolean = false;
  socials: Social[] = [];  
  
  constructor(
    private socialService: SocialService,
    private router: Router,    
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.ObtenerLista();
    // if(this.token.getToken()){
    //   this.islogged = true;
    // } else{
    //   this.islogged = false;
    // }    
  }

  async ObtenerLista() {
    await this.socialService.ObtenerLista(1).then(data => this.socials = data);
  }
    
}
