import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/Model/proyecto';
import { ServiceproyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto: Proyecto;
  enableUpload: boolean = false;

  constructor(
    private proyectoService: ServiceproyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.proyecto = new Proyecto("","","");
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data =>{
        this.proyecto = data;
        this.enableUpload = true;
      }, err => {
        alert("No se pudo cargar el proyecto")
      }
    )
  }

  onUpdate(){
    this.proyectoService.update(this.proyecto.id, this.proyecto).subscribe(
      data =>{
        alert("Se actulizó la información del proyecto");
        this.router.navigate([''])
      }, err =>{
        alert("No se pudo guardar el proyecto")
        this.router.navigate([''])
      }
    )    
  }

  

}
