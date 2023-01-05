import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/Model/proyecto';
import { ServiceproyectoService } from 'src/app/services/serviceproyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  proyecto: Proyecto;

  constructor(
    private proyectoService: ServiceproyectoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proyecto = new Proyecto("","","");
  }

  onCreate(): void{    
    this.proyectoService.save(this.proyecto).subscribe(
      data =>{
        alert("Proyecto Guardado");
        this.router.navigate(['']);
      }, err =>{
        alert("No se guardo el proyecto");
        this.router.navigate(['']);
      }
    )
  }

}
