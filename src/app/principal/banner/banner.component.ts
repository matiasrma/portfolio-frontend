import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/Model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() isLogged: boolean = false;
  persona: Persona = {} as Persona;  

  constructor(
    public personaService: PersonaService,
    ) { }

  ngOnInit(): void {    
    this.ObtenerDatos();
  }  

  async ObtenerDatos(){
    await this.personaService.Obtener(1).then(
      data => {
        this.persona = data; 
      });       
  }

}
