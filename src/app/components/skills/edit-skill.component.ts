import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/Model/skill';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill: Skill;
  imgAnterior: string;

  constructor(
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public imageSkillService: ImageService
  ) { }

  ngOnInit(): void {
    this.loadSkill()
    this.imageSkillService.imageurl = "";
    this.imageSkillService.uploadProgress = 0;
  }

  onUpdate(id: number): void{        
    if (this.imageSkillService.imageurl != '') {
      this.skill.imgSkill = this.imageSkillService.imageurl 
    } else {
      let conservar = confirm("No selecciono nueva imagen. Desea conservar la anterior?")
      if(conservar) { 
        this.skill.imgSkill = this.imgAnterior; 
      } else{
        this.skill.imgSkill = this.imageSkillService.imageurl
      }
    }
    if (this.skill.imgSkill != '') {
      this.skill.showImg = true;
    }else{
      this.skill.showImg = false;
    }
    if(id != undefined){
      this.skillService.update(id, this.skill).subscribe(
        data =>{
          alert("Se actualizo Skill correctamente")
          this.router.navigate([''])
        }, err =>{
          alert("no se pudo actualizar skill" + err)
          this.router.navigate([''])
        }
      )
    }
  }

  loadSkill(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.skillService.detail(id).subscribe(
      data => { 
        this.skill = data;
        this.imgAnterior = this.skill.imgSkill;
      }, err => { 
        alert("No se pudo cargar skill " + err)
      }
    )
  }

  uploadImagen($event:any): void{
    const name = "skill_" + this.skill.id;
    this.imageSkillService.uploadImage($event, name);
  }

}
