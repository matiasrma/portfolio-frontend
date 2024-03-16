import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { TokenService } from 'src/app/services/token.service';
import { SocialComponent } from '../social/social.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,SocialComponent]
})
export class HeaderComponent implements OnInit {

  isDark: boolean = false; 

  @Input() isLogged: boolean = false;   
  @Output() emmitLogout = new EventEmitter();

  constructor(
    private authFirebase : ImageService
    ) { }

  ngOnInit(): void {
    this.SwitchDarkTheme();
  }

  SwitchDarkTheme(){
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
