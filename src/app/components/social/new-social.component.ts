import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Social } from 'src/app/Model/social';
import { ImageService } from 'src/app/services/image.service';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-new-social',
  templateUrl: './new-social.component.html',
  styleUrls: ['./new-social.component.css']
})
export class NewSocialComponent implements OnInit {

  lista: Social[] = [];
  social: Social;
  enableUpload: boolean = false;
  
  constructor(
    private socialService: SocialService,
    public imageSocialService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSocial();    
    this.social = new Social("","");
    this.imageSocialService.imageurl = "";
    this.imageSocialService.uploadProgress = 0;
  }

  onCreate(): void{
    this.social.imgSocial = this.imageSocialService.imageurl;     
    if(this.social.imgSocial != ''){       
      this.socialService.save(this.social).subscribe(
        data => {
          alert("Red social guardada")
          this.router.navigate([''])
        }, err =>{
          alert("No se pudo guarda la red social")
          this.router.navigate([''])
        }
      )
    } else {
      alert("No se guardo la red social, debe agregar imagen")
      this.router.navigate([''])
    }
  }

  loadSocial(): void{
    this.socialService.lista().subscribe(
      data =>{this.lista = data, this.enableUpload = true;}
    );
  }

  uploadImagen($event: any): void {
    let nuevoid:number = 0;
    this.lista.forEach(element => {
      if(element.id > nuevoid) { nuevoid = element.id };
    }); 
    const numero = nuevoid + 1;
    const name = 'social_' + numero;
    this.imageSocialService.uploadImage($event, name);
  }
}
