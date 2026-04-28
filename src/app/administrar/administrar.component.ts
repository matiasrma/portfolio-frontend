import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {
  private tokenService = inject(TokenService);
  isLogged = false;  

  ngOnInit(): void {
    this.getIsLogged();
  }

  getIsLogged(): void {
    this.isLogged = !!this.tokenService.getToken();
  }  

  onLogout(): void {
    this.tokenService.logout();
    this.getIsLogged();
  }
}
