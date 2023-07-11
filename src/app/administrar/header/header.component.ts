import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  isDark: boolean = false; 

  @Input() isLogged: boolean = false;   
  @Output() emmitLogout = new EventEmitter();

  constructor(private router:Router, 
    private authFirebase : ImageService
    ) { }

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');    
    document.body.classList.toggle('dark-theme', prefersDark.matches);
    this.isDark = prefersDark.matches;
  }

  async onLogout(){
    this.authFirebase.logout();
    this.emmitLogout.emit();
  }

  Darkness(){
    document.body.classList.toggle('dark-theme');
    this.isDark = !this.isDark;
  }  

}
