import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from '../../Model/skill';
import { SkillService } from '../../services/skill.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  private SkillService = inject(SkillService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  imageService = inject(ImageService);

  listaSkill: Skill[] = [];
  userName = "";
  listaEliminar: Skill[] = [];
  respuesta = "";
  guardarClass = "guardar";

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.userName = (params.get("user_name") ?? '');
      }
    );
    this.obtenerListaSkill();
  }

  async obtenerListaSkill(): Promise<void> {
    this.listaSkill = await this.SkillService.ObtenerLista(1);
  }

  Volver(): void {
    this.router.navigate(['Administrar']);
  }

  Agregar(): void {
    this.listaSkill.push({} as Skill);
  }

  Eliminar(skill: Skill): void {
    this.listaEliminar.push(skill);
    const indexEliminar = this.listaSkill.findIndex(exp => exp.Id == skill.Id);
    this.listaSkill.splice(indexEliminar, 1);    
  }

  async Guardar(): Promise<void> {
    this.respuesta = "Guardando Informacion";
    this.respuesta = await this.SkillService.Guardar(this.listaSkill);
    this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    
    if (this.listaEliminar.length > 0) {
      const result = await this.SkillService.Eliminar(this.listaEliminar);
      this.respuesta += result;
      this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    }
    
    await this.obtenerListaSkill();
  }

  borrarRespuesta(): void {
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number): Promise<void> {
    let id = 0;
    if (this.listaSkill[i].Id < 1) {
      this.listaSkill.forEach(exp => {
        if (exp.Id > id) id = exp.Id;
      });
    } else {
      id = this.listaSkill[i].Id;
    }
    
    const name = 'Skill_' + id;
    this.imageService.uploadImage($event, name);
    const data = await this.imageService.getImages(name);
    this.listaSkill[i].img_skill = data;
  }
}
