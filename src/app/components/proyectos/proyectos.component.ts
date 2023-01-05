import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/Model/proyecto';
import { ServiceproyectoService } from 'src/app/services/serviceproyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyecto: Proyecto[] = [];
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private proyectoService: ServiceproyectoService) { }

  ngOnInit(): void {
    this.loadProyectos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }

  loadProyectos(): void{
    this.proyectoService.lista().subscribe(
      data => {this.proyecto = data}
    )
  }

  deleteProyecto(id: number): void{
    if(id != undefined){
      this.proyectoService.delete(id).subscribe(
        data =>{
          alert("Proyecto borrado");
          this.loadProyectos();          
        }, err =>{
          alert("No se pudo borar el pryecto")
        }
      )
    }
  }

}
