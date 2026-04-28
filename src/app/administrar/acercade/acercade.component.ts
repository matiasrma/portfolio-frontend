import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Acd } from '../../Model/acd';
import { AcdService } from '../../services/acd.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-acercade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercaDeComponent implements OnInit {
  private AcercaDeService = inject(AcdService);
  private router = inject(Router);    
  private token = inject(TokenService);

  acercaDe: Acd = {} as Acd;
  texto: string[] = [];
  respuesta: string = "";
  guardarClass = "guardar";
  
  ngOnInit(): void {
    this.ObtenerACD();
  }

  async ObtenerACD(): Promise<void> {
    this.acercaDe = await this.AcercaDeService.Obtener(1);
    if (this.acercaDe.textoacd) {
      this.texto = this.acercaDe.textoacd.split("\n");
    }
  }

  async GuardarACD(): Promise<void> {
    this.respuesta = await this.AcercaDeService.Guardar(this.acercaDe);
  }
    
  borrarRespuesta(): void {
    this.respuesta = '';
  }

  Volver(): void {
    this.router.navigate(['Administrar']);
  }
}
