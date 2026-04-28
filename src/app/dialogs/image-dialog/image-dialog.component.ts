import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageService } from '../../services/image.service';

export interface ImageDialogData {
  field: 'img' | 'banner';
  currentUrl: string;
  imageService: ImageService;
}

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDialogData
  ) {}

  ngOnInit(): void {
    this.previewUrl = this.data.currentUrl;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile) return;
    
    this.uploading = true;
    const personaId = 1;
    const imageName = this.data.field === 'banner' ? `banner_${personaId}.jpg` : `img_${personaId}.jpg`;
    
    const url = await this.data.imageService.uploadAndGetUrl({ target: { files: [this.selectedFile] } }, imageName);
    
    this.uploading = false;
    this.dialogRef.close({ field: this.data.field, url });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}