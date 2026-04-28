import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private supabase: SupabaseClient = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  private bucketName = 'portfolio-bucket';

  imageurl: string = '';
  bannerurl: string = '';
  uploadProgress: number = 0;
  uploadProgress2: number = 0;
  uploadStart: boolean = false;
  user: string = '';
  persona: any;

  constructor() { }

  public async uploadImage($event: any, name: string): Promise<void> {    
    const file = $event.target.files[0];
    const filePath = environment.images + name;
    this.uploadStart = true;
    
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      if (name.includes("banner")) {
        this.uploadProgress2 = 80;        
      } else {
        this.uploadProgress = 80;        
      }
    }
  }

  public async uploadAndGetUrl($event: any, name: string): Promise<string> {
    await this.uploadImage($event, name);
    return await this.getImages(name);
  }

  async getImages(name: string): Promise<string> {    
    const filePath = environment.images + name;
    let respuesta: string = '';
    
    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filePath);
    
    if (data) {
      respuesta = data.publicUrl;
      if (name.includes("banner")) {
        this.bannerurl = respuesta;      
        this.uploadProgress2 += 20;          
      } else {
        this.imageurl = respuesta;
        this.uploadProgress += 20;          
      }
    }
    
    return respuesta;
  }    
}
