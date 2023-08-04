import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, list, getDownloadURL } from '@angular/fire/storage';
import { getAuth, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, GoogleAuthProvider, signInWithCredential, browserLocalPersistence } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { Persona } from '../Model/persona.model';

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

  persona: Persona = {} as Persona;
    
  constructor(private storage: Storage) { }

  async login(email: string, password: string) {

    const auth = getAuth();

    // await signInWithEmailAndPassword(auth, email, password)
    // .then(() =>{
    //   this.user = auth.currentUser.uid.toString();
    // }).catch((error) => {
    //   console.log("error of authentication Firebase!!!");              
    // });

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // La autenticación fue exitosa, puedes almacenar la información de usuario
        const user = userCredential.user;
        this.user = user.uid;
        // Otros pasos necesarios después de la autenticación exitosa
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      
  }

  public logout(){

    const auth = getAuth();
    signOut(auth).then(() => {
    })
  }

  public isLoggedFB(){
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user){
      this.loginUid();
    }
  }

  loginUid(){
    const auth = getAuth();
    const uid = localStorage.getItem('uid');

    if (!auth.currentUser && uid) {
      const credential = GoogleAuthProvider.credential(uid);
  
    signInWithCredential(auth, credential)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log('Inicio de sesión exitoso:', user);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
    }
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
      //this.getImages(name)
    }
    )
  }

  async getImages(name: string): Promise<string> {    
    const imageRef = ref(this.storage, environment.images + name);
    let respuesta: any = null;
    await getDownloadURL(imageRef)
      .then(data =>{
        respuesta = data;
        if ( data.includes("banner")){
          this.bannerurl = data;      
          this.uploadProgress2 += 20;          
        }else{
          this.imageurl = data;
          this.uploadProgress += 20;          
        }
      });
    
      return respuesta;
  }    
}
