import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/Model/educacion';
import { Experiencia } from 'src/app/Model/experiencia';
import { ServiceEducacionService } from 'src/app/services/service-educacion.service';
import { ServiceExperienciaService } from 'src/app/services/service-experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia-educacion',
  templateUrl: './experiencia-educacion.component.html',
  styleUrls: ['./experiencia-educacion.component.css']
})
export class ExperienciaEducacionComponent implements OnInit {

  experiencia: Experiencia[] = [];  
  educacion: Educacion[] = [];  

  constructor(
    private serviceExperiencia: ServiceExperienciaService,
    private tokenService: TokenService,
    private serviceEducacion: ServiceEducacionService
    ) { }
  
  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    this.loadEducacion();        
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  loadEducacion(): void{
    this.serviceEducacion.lista().subscribe(
      data => {this.educacion = data;}
    )
  }

  deleteEducacion(id?: number): void{
    if(id != undefined){
      this.serviceEducacion.delete(id).subscribe(
        data => {
          this.loadEducacion();
          alert("Educacion Borrada");
        }, err => {
          alert("No se borro el item de educación")
        }
      )
    }
  }

  cargarExperiencia(): void{
    this.serviceExperiencia.lista().subscribe(
      data => {this.experiencia = data;})
  }

  deleteExperiencia(id?: number): void {
    if(id != undefined){
      this.serviceExperiencia.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
          alert("Experiencia Borrada");
        }, err => {
          alert("No se borro la experiencia");
        }
      )
    }
  }

}


