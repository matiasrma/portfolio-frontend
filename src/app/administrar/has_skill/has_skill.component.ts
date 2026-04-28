import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../Model/skill';

@Component({
  selector: 'app-has_skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './has_skill.component.html',
  styleUrls: ['./has_skill.component.css']
})
export class HasSkillComponent {
  @Input() listaActivos: Skill[] = [];
  @Input() listaSkill: Skill[] = [];
  @Input() listaEliminarSkills: { [Id: number]: Skill[] } = {};
  @Input() Id_selected: number = null;
  
  userName = "";
  guardarClass = "guardar";

  esActivo(skill: Skill): boolean {    
    return this.listaActivos.some(a => a.Id === skill.Id);    
  }
  
  Modificar(skill: Skill): void {
    const index = this.listaActivos.findIndex(activo => activo.Id === skill.Id);
    const indexEliminar = this.listaEliminarSkills[this.Id_selected]?.findIndex(s => s.Id === skill.Id);

    if (index >= 0) {
      this.listaActivos.splice(index, 1);
      if (!this.listaEliminarSkills[this.Id_selected]) {
        this.listaEliminarSkills[this.Id_selected] = [];
      }
      this.listaEliminarSkills[this.Id_selected].push(skill);
    } else {
      if (indexEliminar !== undefined && indexEliminar >= 0) {
        this.listaEliminarSkills[this.Id_selected].splice(indexEliminar, 1);
      }
      this.listaActivos.push(skill);
    }
  }
}
