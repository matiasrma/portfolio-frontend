import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SocialComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mensajeClass = "conectando";
  logMsj = "";
  isDark = false; 
  @Input() isLogged = false;   
  @Output() emitLogout = new EventEmitter<boolean>();

  private tokenService = inject(TokenService);
  private router = inject(Router);

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');    
    document.body.classList.toggle('dark-theme', prefersDark.matches);
    this.isDark = prefersDark.matches;
  }

  onLogout(): void {
    this.tokenService.logout();
    this.emitLogout.emit(true);
    this.router.navigate(['/']);
  }

  Darkness(): void {
    document.body.classList.toggle('dark-theme');
    this.isDark = !this.isDark;
  }  
}
