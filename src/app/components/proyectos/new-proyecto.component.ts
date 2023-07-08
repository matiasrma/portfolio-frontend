import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/Model/proyecto';
import { ServiceproyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  lista: Proyecto[] = [];
  proyecto: Proyecto;
  enableUpload: boolean = false;

  constructor(
    private proyectoService: ServiceproyectoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.proyecto = new Proyecto("","","");
  }

  cargarProyectos(): void{
    this.proyectoService.lista().subscribe(
      data => { this.lista = data; this.enableUpload = true;}      
    )
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
