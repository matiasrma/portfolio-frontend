import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/Model/skill';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {

  lista: Skill[] = [];
  skill: Skill;
  
  constructor(
    private skillService: SkillService,
    public imageSkillService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSkills();
    this.skill = new Skill("",0,"", true);
    this.imageSkillService.imageurl = "";
    this.imageSkillService.uploadProgress = 0;
  }

  onCreate(): void{
    this.skill.imgSkill = this.imageSkillService.imageurl;    
    if (this.skill.imgSkill != '') {
      this.skill.showImg = true;
    }else{
      this.skill.showImg = false;
    }
    this.skillService.save(this.skill).subscribe(
      data => {
        alert("Skill guardada")
        this.router.navigate([''])
      }, err =>{
        alert("No se pudo guarda Skill")
        this.router.navigate([''])
      }
    )
  }

  loadSkills(): void{
    this.skillService.lista().subscribe(
      data =>{this.lista = data;}
    )
  }

  uploadImagen($event: any): void{
    let nuevoid:number = 0;
    this.lista.forEach(element => {
      if(element.id > nuevoid) { nuevoid = element.id + 1 };
    }); 
    const numero = nuevoid;
    const name = 'skill_' + numero;
    this.imageSkillService.uploadImage($event, name);
  }

}
