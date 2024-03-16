import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/Model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-has_skill',
  templateUrl: './has_skill.component.html',
  styleUrls: ['./has_skill.component.css']
})
export class HasSkillComponent {

  @Input() listaActivos: Skill[] = [];
  @Input() listaSkill: Skill[] = [];
  @Input() listaEliminarSkills: {[Id: number]: Skill[]} = {};
  @Input() Id_selected: number = null;
  
  userName: string = "";
    
  guardarClass: string = "guardar";

  constructor() {}   

  esActivo(skill: Skill): boolean{    
    return this.listaActivos.some(a => a.Id === skill.Id);    
  }
  
  Modificar(skill: Skill){
    
    let index = this.listaActivos.findIndex(activo => activo.Id === skill.Id);
    let indexEliminar = this.listaEliminarSkills[this.Id_selected].findIndex(s => s.Id === skill.Id);

    if (index >= 0){
      this.listaActivos.splice(index,1);
      this.listaEliminarSkills[this.Id_selected].push(skill);
    } else {
      
      if (indexEliminar >= 0){
        this.listaEliminarSkills[this.Id_selected].splice(indexEliminar,1);
      }

      this.listaActivos.push(skill);
    }

    console.log(this.listaEliminarSkills[this.Id_selected]);
    
  }

}
