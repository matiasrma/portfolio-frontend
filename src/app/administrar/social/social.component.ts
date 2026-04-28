import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Social } from '../../Model/social';
import { SocialService } from '../../services/social.service';
import { TokenService } from '../../services/token.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  socials: Social[] = [];
  listaEliminar: Social[] = [];
  respuesta: string = "";
  guardarClass = "guardar";
  
  private socialService = inject(SocialService);
  private router = inject(Router);
  private token = inject(TokenService);
  imageService = inject(ImageService);

  ngOnInit(): void {
    this.ObtenerLista();
  }

  async ObtenerLista(): Promise<void> {
    this.socials = await this.socialService.ObtenerLista(1);
  }

  Volver(): void {
    this.router.navigate(['Inicio']);
  }

  Agregar(): void {
    this.socials.push({} as Social);
  }

  Eliminar(social: Social): void {
    this.listaEliminar.push(social);
    const indexEliminar = this.socials.findIndex(s => s.Id == social.Id);
    this.socials.splice(indexEliminar, 1);
  }

  async Guardar(): Promise<void> {
    this.respuesta = "Guardando Informacion";
    this.respuesta = await this.socialService.Guardar(this.socials);
    this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";

    if (this.listaEliminar.length > 0) {
      const result = await this.socialService.Eliminar(this.listaEliminar);
      this.respuesta += result;
      this.guardarClass = this.respuesta.includes("correctamente") ? "guardar" : "guardar error";
    }

    await this.ObtenerLista();
  }

  borrarRespuesta(): void {
    this.respuesta = '';
  }

  async uploadImagen($event: any, i: number): Promise<void> {
    let id = 0;
    if (this.socials[i].Id < 1) {
      this.socials.forEach(s => {
        if (s.Id > id) id = s.Id;
      });
    } else {
      id = this.socials[i].Id;
    }

    const name = 'Social_' + id;
    this.imageService.uploadImage($event, name);
    const data = await this.imageService.getImages(name);
    this.socials[i].img_social = data;
  }
}
