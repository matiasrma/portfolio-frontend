import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acd } from 'src/app/Model/acd';
import { Social } from 'src/app/Model/social';
import { AcdService } from 'src/app/services/acd.service';
import { ImageService } from 'src/app/services/image.service';
import { SocialService } from 'src/app/services/social.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercaDeComponent implements OnInit {

  acercaDe: Acd = {} as Acd;
  texto: string[] = [];

  respuesta: string = "";
  guardarClass: string = "guardar";
  
  constructor(
    private AcercaDeService: AcdService,
    private router: Router,    
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.ObtenerACD();
  }

  async ObtenerACD() {
    await this.AcercaDeService.Obtener(1).then(data => this.acercaDe = data);
    this.texto = this.acercaDe.textoacd.split("\n");
  }

  async GuardarACD() {
    await this.AcercaDeService.Guardar(this.acercaDe).then(data => this.respuesta = data);
  }
    
  borrarRespuesta(){
    this.respuesta = '';
  }

  Volver(){
    this.router.navigate(['Inicio']);
  }

}
