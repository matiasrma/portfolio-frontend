import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/Model/skill';
import { ImageService } from 'src/app/services/image.service';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  isLogged = false;
  skills: Skill[] = [];

  constructor(
    private tokenService: TokenService,
    public imageSkillsService: ImageService,
    private skillService: SkillService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }

  loadSkills(): void{
    this.skillService.lista().subscribe(
      data =>{
        this.skills = data; }
    )
  }

  deleteSkill(id: number): void{
    if (id != undefined) {
      this.skillService.delete(id).subscribe(
        data =>{
          alert("Skill Deleted")
          this.router.navigate([''])
        }, err =>{
          alert("Skill not deleted")
          this.router.navigate([''])
        }
      )
    }
  }

}
