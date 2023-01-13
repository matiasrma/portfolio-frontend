import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/Model/educacion';
import { ImageService } from 'src/app/services/image.service';
import { ServiceEducacionService } from 'src/app/services/service-educacion.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {

  lista: Educacion[] = [];  
  educacion: Educacion;
  enableUpload: boolean = false;
  
  constructor(
    private educacionService: ServiceEducacionService, 
    private router: Router,
    public imageEduService: ImageService) { }

  ngOnInit(): void {
    this.loadEducacion();
    this.educacion = new Educacion("","","","");
    this.imageEduService.imageurl = "";
    this.imageEduService.uploadProgress = 0;
  }

  loadEducacion(): void{
    this.educacionService.lista().subscribe(
      data => {this.lista = data, this.enableUpload = true;}
    )
  }

  onCreate(): void{    
    this.educacion.imgEdu = this.imageEduService.imageurl;        
    this.educacionService.save(this.educacion).subscribe(
      data =>{
        alert('Educacion Añadida');
        this.router.navigate([''])
      }, err =>{
        alert('No se pudo agregar educacion')
        this.router.navigate([''])
      }
    )
  }
  
  uploadImagen($event: any): void{    
    let nuevoid:number = 0;
    this.lista.forEach(element => {
      if(element.id > nuevoid) { nuevoid = element.id };
    }); 
    const numero = nuevoid + 1;
    const name = 'educacion_' + numero;
    this.imageEduService.uploadImage($event, name);        
  }
}
