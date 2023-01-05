import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/Model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  persona: Persona = null;
  imgperfilanterior: string = '';
  imgbanneranterior: string = '';

  uploadProgress: Observable<number>;
  
  constructor(
    private personaService: PersonaService,
    public imageService: ImageService,    
    private activatedRoute: ActivatedRoute,
    private router: Router   
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.imageService.imageurl = "";
    this.imageService.bannerurl = "";
    this.imageService.uploadProgress = 0;
    this.personaService.detail(id).subscribe(
      data =>{
        this.persona = data;
        this.imgperfilanterior =  this.persona.img;
        this.imgbanneranterior =  this.persona.banner;
      }, err =>{
        alert("No se pude cargar el perfil");
        this.router.navigate([''])
      }
    )    
  }

  onUpdate(): void{
    if (this.imageService.imageurl != '') {
      this.persona.img = this.imageService.imageurl 
    } else {
      let conservar = confirm("No selecciono nueva imagen. Desea conservar la anterior?")
      if(conservar) { 
        this.persona.img = this.imgperfilanterior; 
      } else{
        this.persona.img = this.imageService.imageurl
      }
    }
    if (this.imageService.imageurl != '') {
      this.persona.banner = this.imageService.imageurl 
    } else {
      let conservar = confirm("No selecciono nueva imagen. Desea conservar la anterior?")
      if(conservar) { 
        this.persona.banner = this.imgbanneranterior; 
      } else{
        this.persona.banner = this.imageService.imageurl
      }
    }    
    this.personaService.update(this.persona.id, this.persona).subscribe(
      data =>{
        alert("Perfil actualizado!");
        this.router.navigate([''])
      }, err =>{
        alert("Error al actualizar el perfil");        
      }
    )
  }

  uploadImagen($event: any): void{
    const id = this.activatedRoute.snapshot.params['id'];
    const name = 'perfil_' + id;
    this.imageService.uploadImage($event, name);
  }

  uploadBanner($event: any): void{
    const id = this.activatedRoute.snapshot.params['id'];
    const name = 'banner_' + id;
    this.imageService.uploadImage($event, name);    
  }

}
