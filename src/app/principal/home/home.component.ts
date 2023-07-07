import { Component, OnInit } from '@angular/core';
import { Acd } from 'src/app/Model/acd';
import { AcdService } from 'src/app/services/acd.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private personaService: PersonaService,
    private acdService: AcdService
    ) { }

  isLoad = false;  
  acercaDe: Acd = {} as Acd;
  texto: string[] = []

  ngOnInit(): void {
    this.personaService.Obtener(1).then(
      data =>{
        this.isLoad = true;
      }
    )    
    this.ObtenerAcercaDe();
  }

  async ObtenerAcercaDe(){
    await this.acdService.Obtener(1).then(data => {
      this.acercaDe = data;
      this.texto = this.acercaDe.textoacd.split('\n');
    })
  }

  

}
