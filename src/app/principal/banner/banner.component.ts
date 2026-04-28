import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../Model/persona.model';
import { ImageService } from '../../services/image.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageDialogComponent, ImageDialogData } from '../../dialogs/image-dialog/image-dialog.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  private personaService = inject(PersonaService);
  private imageService = inject(ImageService);
  private dialog = inject(MatDialog);

  @Input() isLogged = false;
  persona: Persona = {} as Persona;
  isLoad = false;

  ngOnInit(): void {
    this.ObtenerPersona();
  }

  openImageDialog(field: 'img' | 'banner'): void {
    const data: ImageDialogData = {
      field,
      currentUrl: field === 'banner' ? this.persona.banner : this.persona.img,
      imageService: this.imageService
    };
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '400px',
      data
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result && result.url) {
        if (result.field === 'banner') {
          this.persona.banner = result.url;
        } else {
          this.persona.img = result.url;
        }
        await this.personaService.Guardar(this.persona);
      }
    });
  }

  async ObtenerPersona(): Promise<void> {
    this.persona = await this.personaService.Obtener(1);
    this.isLoad = true;
  }
}