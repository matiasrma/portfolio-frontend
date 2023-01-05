import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/Model/experiencia';
import { ImageService } from 'src/app/services/image.service';
import { ServiceExperienciaService } from 'src/app/services/service-experiencia.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  experiencia: Experiencia = null;
  imgAnterior: string;

  constructor(
    private experienciaService: ServiceExperienciaService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    public imageExpService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.imageExpService.imageurl = "";
    this.imageExpService.uploadProgress = 0;
    this.experienciaService.detail(id).subscribe(
      data=>{
        this.experiencia = data;
        this.imgAnterior = this.experiencia.imgExp;   
      }, err =>{
        alert("Error al modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    if (this.imageExpService.imageurl != '') {
      this.experiencia.imgExp = this.imageExpService.imageurl 
    } else {
      let conservar = confirm("No selecciono nueva imagen. Desea conservar la anterior?")
      if(conservar) { 
        this.experiencia.imgExp = this.imgAnterior; 
      } else{
        this.experiencia.imgExp = this.imageExpService.imageurl
      }
    }    
    this.experienciaService.update(this.experiencia.id, this.experiencia).subscribe(
      data => {
        alert("Experiencia actualizada!");
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar experiencia")
        this.router.navigate(['']);
      }
    )
  }

  uploadImagen($event: any): void{
    const id = this.activatedRoute.snapshot.params['id'];
    const name = 'experiencia_' + id;
    this.imageExpService.uploadImage($event, name);
  }

}
