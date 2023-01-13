import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/Model/educacion';
import { ImageService } from 'src/app/services/image.service';
import { ServiceEducacionService } from 'src/app/services/service-educacion.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  educacion: Educacion = null;
  imgAnterior: string;
  enableUpload: boolean = false;

  constructor(
    private educacionService: ServiceEducacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imageEduService: ImageService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.imageEduService.imageurl = "";
    this.imageEduService.uploadProgress = 0;
    this.educacionService.detail(id).subscribe(
      data =>{
        this.educacion = data;
        this.imgAnterior = this.educacion.imgEdu;
        this.enableUpload = true;
      }, err =>{
        alert("Error al cargar la experiencia");
        this.router.navigate([''])
      }
    )
  }

  onUpdate(): void {    
    if (this.imageEduService.imageurl != '') {
      this.educacion.imgEdu = this.imageEduService.imageurl 
    } else {
      let conservar = confirm("No selecciono nueva imagen. Desea conservar la anterior?")
      if(conservar) { 
        this.educacion.imgEdu = this.imgAnterior; 
      } else{
        this.educacion.imgEdu = this.imageEduService.imageurl
      }
    }    
    this.educacionService.update(this.educacion.id, this.educacion).subscribe(
      data =>{
        alert("Educacion actualizada!");
        this.router.navigate([''])
      }, err =>{
        alert("Error al cargar la experiencia");        
      }
    )
  }

  uploadImagen($event: any): void{
    const id = this.activatedRoute.snapshot.params['id'];
    const name = 'educacion_' + id;
    this.imageEduService.uploadImage($event, name);
  }

}
