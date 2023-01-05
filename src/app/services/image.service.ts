import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, list, getDownloadURL } from '@angular/fire/storage'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageurl: string = '';
  bannerurl: string = "";

  uploadProgress: number = 0;
  uploadProgress2: number = 0;
  uploadStart: boolean = false;
    
  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){ 

    const file = $event.target.files[0];
    const imgRef = ref(this.storage, 'imagen/' + name);
    const uploadTask = uploadBytesResumable(imgRef, file)
    this.uploadStart = true;

    uploadTask.on('state_changed', (snapshot) =>{
      if(name.includes("banner")){
        this.uploadProgress2 = (snapshot.bytesTransferred / snapshot.totalBytes) *80;
        console.log('Upload is' + this.uploadProgress2 + '% done');      
      } else{
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) *80;
        console.log('Upload is' + this.uploadProgress + '% done');      
      }
      
    }, err => {
      console.log(err)
    }, () =>{
      this.getImages(name)
    }
    )
  }


  getImages(name: string){    
    const imageRef = ref(this.storage, 'imagen/');        
    list(imageRef)
    .then(async response => {      
      for(let item of response.items){                
        if((await getDownloadURL(item)).includes(name)){
          if((await getDownloadURL(item)).includes("banner")){
            this.bannerurl = await getDownloadURL(item);
            this.uploadProgress2 += 20;
            console.log("la url es: " + this.bannerurl);        
          }else{
            this.imageurl = await getDownloadURL(item);
            this.uploadProgress += 20;
            console.log("la url es: " + this.imageurl);
          }
        }
      }
    })
    .catch(err => console.log(err));
  }  
}
