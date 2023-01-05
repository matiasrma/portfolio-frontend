import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Social } from 'src/app/Model/social';
import { ImageService } from 'src/app/services/image.service';
import { SocialService } from 'src/app/services/social.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  islogged: boolean = false;
  socials: Social[] = [];  
  
  constructor(
    private socialService: SocialService,
    private router: Router,    
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.loadSocial();
    if(this.token.getToken()){
      this.islogged = true;
    } else{
      this.islogged = false;
    }    
  }

  loadSocial(): void{
    this.socialService.lista().subscribe(
      data =>{
        this.socials = data;
      }, err =>{
        alert("No se pueden cargar las redes sociales")
      }
    )
  }

  deleteSocial(id?: number): void{
    if (id != undefined){
      this.socialService.delete(id).subscribe(
        data =>{          
          this.router.navigate(['']);
        }, err =>{
          alert("No se borro el vinculo a la red social");          
        }
      )      
    } else{
      alert("No se borro el vinculo a la red social");
      this.router.navigate(['']);
    }
  }
  
}
