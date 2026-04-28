import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from '../../Model/experiencia';
import { Skill } from '../../Model/skill';
import { ExperienciaService as ExperienciaService } from '../../services/experiencia.service';
import { ImageService } from '../../services/image.service';
import { SkillService } from '../../services/skill.service';
import { HasSkillComponent } from '../has_skill/has_skill.component';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule, FormsModule, HasSkillComponent],
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  private experienciaService = inject(ExperienciaService);
  private skillService = inject(SkillService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  imageService = inject(ImageService);

  listaExperiencia: Experiencia[] = [];
  listaSkills: Skill[] = [];
  userName = "";
  listaActivos: Skill[] = [];
  exp_Id_selected: number = null;
  listaEliminar: Experiencia[] = [];
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
    this.obtenerListaExperiencia();
  }

  async obtenerListaExperiencia(): Promise<void> {
    this.listaExperiencia = await this.experienciaService.ObtenerLista(1);    
  }

  async obtenerSkills(): Promise<void> {
    this.listaSkills = await this.skillService.ObtenerLista(1);
  }

  Volver(): void {
    this.router.navigate(['Administrar']);
  }

  Agregar(): void {
    const nueva = {} as Experiencia;
    nueva.has_skills = [];
    this.listaExperiencia.push(nueva);
  }

  Eliminar(experiencia: Experiencia): void {
    this.listaEliminar.push(experiencia);
    const indexEliminar = this.listaExperiencia.findIndex(exp => exp.Id == experiencia.Id);
    this.listaExperiencia.splice(indexEliminar, 1);    
  }

  async Guardar(): Promise<void> {
    this.respuesta = "Guardando Informacion";
    this.respuesta = await this.experienciaService.Guardar(this.listaExperiencia);
    this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    
    if (this.listaEliminar.length > 0) {
      const result = await this.experienciaService.Eliminar(this.listaEliminar);
      this.respuesta += result;
      this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    }
    
    this.listaExperiencia.forEach(async exp => {
      if (exp.has_skills.length > 0) {
        this.experienciaService.AddSKill(exp.has_skills, exp.Id);
      }
      if (this.listaEliminarSkills[exp.Id]) {
        this.experienciaService.DeleteSKill(this.listaEliminarSkills[exp.Id], exp.Id);
      }      
    });
    
    await this.obtenerListaExperiencia();
  }

  borrarRespuesta(): void {
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number): Promise<void> {
    let id = 0;
    if (this.listaExperiencia[i].Id < 1) {
      this.listaExperiencia.forEach(exp => {
        if (exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaExperiencia[i].Id;
    }
    
    const name = 'experiencia_' + id;
    this.imageService.uploadImage($event, name);
    const data = await this.imageService.getImages(name);
    this.listaExperiencia[i].img_exp = data;
  }

  ModificarSkills(id: number, lista: Skill[]): void {
    this.exp_Id_selected = id;
    this.listaActivos = lista;
    if (!this.listaEliminarSkills[this.exp_Id_selected]) {
      this.listaEliminarSkills[this.exp_Id_selected] = [];      
    } 
  }
}
