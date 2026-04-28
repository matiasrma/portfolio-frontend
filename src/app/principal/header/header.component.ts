import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SocialComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDark = false; 
  @Input() isLogged = false;   
  @Output() emitLogout = new EventEmitter<boolean>();

  private tokenService = inject(TokenService);

  ngOnInit(): void {
    this.SwitchDarkTheme();
  }

  SwitchDarkTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');    
    document.body.classList.toggle('dark-theme', prefersDark.matches);
    this.isDark = prefersDark.matches;
  }

  onLogout(): void {
    this.tokenService.logout();
    this.emitLogout.emit(true);
  }

  Darkness(): void {
    document.body.classList.toggle('dark-theme');
    this.isDark = !this.isDark;
  }  
}
