import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../../Model/proyecto';
import { Skill } from '../../Model/skill';
import { ProyectoService } from '../../services/proyecto.service';
import { ImageService } from '../../services/image.service';
import { SkillService } from '../../services/skill.service';
import { HasSkillComponent } from '../has_skill/has_skill.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, HasSkillComponent],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  private ProyectoService = inject(ProyectoService);
  private skillService = inject(SkillService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  imageService = inject(ImageService);

  listaProyecto: Proyecto[] = [];
  listaSkills: Skill[] = [];
  userName = "";
  listaActivos: Skill[] = [];
  proy_Id_selected: number = null;
  listaEliminar: Proyecto[] = [];
  listaEliminarSkills: { [Id: number]: Skill[] } = {};
  respuesta = "";
  guardarClass = "guardar";

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.userName = (params.get("user_name") ?? '');
      }
    );
    this.obtenerSkills();
    this.obtenerListaProyecto();
  }

  async obtenerListaProyecto(): Promise<void> {
    this.listaProyecto = await this.ProyectoService.ObtenerLista(1);    
  }

  async obtenerSkills(): Promise<void> {
    this.listaSkills = await this.skillService.ObtenerLista(1);
  }

  Volver(): void {
    this.router.navigate(['Administrar']);
  }

  Agregar(): void {
    this.listaProyecto.push({} as Proyecto);
  }

  Eliminar(proyecto: Proyecto): void {
    this.listaEliminar.push(proyecto);
    const indexEliminar = this.listaProyecto.findIndex(exp => exp.Id == proyecto.Id);
    this.listaProyecto.splice(indexEliminar, 1);    
  }

  async Guardar(): Promise<void> {
    this.respuesta = "Guardando Informacion";
    this.respuesta = await this.ProyectoService.Guardar(this.listaProyecto);
    this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    
    if (this.listaEliminar.length > 0) {
      const result = await this.ProyectoService.Eliminar(this.listaEliminar);
      this.respuesta += result;
      this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    }
    
    this.listaProyecto.forEach(async proyecto => {
      if (proyecto.has_skills.length > 0) {
        this.ProyectoService.AddSKill(proyecto.has_skills, proyecto.Id);
      }
      if (this.listaEliminarSkills[proyecto.Id]) {
        this.ProyectoService.DeleteSKill(this.listaEliminarSkills[proyecto.Id], proyecto.Id);
      }
    }); 
    
    await this.obtenerListaProyecto();
  }

  borrarRespuesta(): void {
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number): Promise<void> {
    let id = 0;
    if (this.listaProyecto[i].Id < 1) {
      this.listaProyecto.forEach(exp => {
        if (exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaProyecto[i].Id;
    }
    
    const name = 'Proyecto_' + id;
    this.imageService.uploadImage($event, name);      
  }

  ModificarSkills(id: number, lista: Skill[]): void {
    this.proy_Id_selected = id;
    this.listaActivos = lista;
    if (!this.listaEliminarSkills[this.proy_Id_selected]) {
      this.listaEliminarSkills[this.proy_Id_selected] = [];      
    } 
  }
}
