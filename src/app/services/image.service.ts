import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, list, getDownloadURL } from '@angular/fire/storage'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { environment } from 'src/environments/environment';
import { Persona } from '../Model/persona.model';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageurl: string = '';
  bannerurl: string = '';

  uploadProgress: number = 0;
  uploadProgress2: number = 0;
  uploadStart: boolean = false;
  user : string;

  persona: Persona = new Persona("","","","","","","","");
    
  constructor(private storage: Storage, private personaService : PersonaService) { }

  public login(password: string){

    this.personaService.detail(1).subscribe(data => { 
      this.persona = data; 
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.persona.correo, password)
        .then(() =>{

          this.user = auth.currentUser.uid.toString();

        })
        .catch((error) => {
          console.log("error of authentication Firebase!!!");        
          
        });
    });          
  }

  public logout(){

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('logout!!!')
      console.log(auth);      
    })
  }


  public uploadImage($event: any, name: string){    

    const file = $event.target.files[0];
    const imgRef = ref(this.storage, environment.images + name );
    const uploadTask = uploadBytesResumable(imgRef, file)    
    this.uploadStart = true;
    
    uploadTask.on('state_changed', (snapshot) =>{
      if(name.includes("banner")){
        this.uploadProgress2 = (snapshot.bytesTransferred / snapshot.totalBytes) *80;        
      } else{
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) *80;        
      }
      
    }, err => {
      console.log(err)
    }, () =>{
      this.getImages(name)
    }
    )
  }

  getImages(name: string){    
    const imageRef = ref(this.storage, environment.images + name);
    getDownloadURL(imageRef)
      .then(data =>{
        if ( data.includes("banner")){
          this.bannerurl = data;      
          this.uploadProgress2 += 20;          
        }else{
          this.imageurl = data;
          this.uploadProgress += 20;          
        }
      })
  }    
}
