import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mensajeClass: string = "conectando"
  logMsj: string = "";
  isLogged: boolean = false;   
  isDark: boolean = false; 

  constructor(private router:Router, 
    private tokenService: TokenService,
    private authFirebase : ImageService
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');    
    document.body.classList.toggle('dark-theme', prefersDark.matches);
    this.isDark = prefersDark.matches;
  }

  onLogout(): void{
    this.authFirebase.logout();
    this.tokenService.logout();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login'])
  }

  Darkness(){
    document.body.classList.toggle('dark-theme');
    this.isDark = !this.isDark;
  }  

}
