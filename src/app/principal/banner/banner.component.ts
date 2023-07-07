import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/Model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  switchInteres: boolean = false;
  isLogged: boolean = false;
  persona: Persona = {} as Persona;  

  constructor(
    public personaService: PersonaService,
    public tokenService: TokenService    
    ) { }

  ngOnInit(): void {    
    this.personaService.Obtener(1).then(
      data => {
        this.persona = data; 
      });       
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }  

}
