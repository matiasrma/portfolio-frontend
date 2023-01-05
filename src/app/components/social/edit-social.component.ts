import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Social } from 'src/app/Model/social';
import { ImageService } from 'src/app/services/image.service';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-edit-social',
  templateUrl: './edit-social.component.html',
  styleUrls: ['./edit-social.component.css']
})
export class EditSocialComponent implements OnInit {

  social: Social = null;
  imgAnterior: string = "";

  constructor(
    private socialService: SocialService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imageSocialService: ImageService
  ) { }

  ngOnInit(): void {
    this.detailSocial();
    this.imageSocialService.imageurl = "";
    this.imageSocialService.uploadProgress = 0;
  }

  detailSocial(): void{
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.socialService.detail(id).subscribe(
      data => {
        this.social = data;
      }, err => {
        alert("No se pudo cargar los datos");
      }
    )
  }

  onUpdate(): void{        
    if (this.imageSocialService.imageurl != '') {
      this.social.imgSocial = this.imageSocialService.imageurl;
      this.socialService.update(this.social.id, this.social).subscribe(
        data =>{
          alert("Se actualizo Social correctamente")
          this.router.navigate([''])
        }, err =>{
          alert("no se pudo actualizar skill" + err)
          this.router.navigate([''])
        }
      )
    } else {
      alert("No selecciono nueva imagen, debe seleccionar una imagen")      
    }    
  }

  uploadImagen($event:any): void{
    const name = "social_" + this.social.id;
    this.imageSocialService.uploadImage($event, name);
  }

}
