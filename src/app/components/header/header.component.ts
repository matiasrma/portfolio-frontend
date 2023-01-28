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

  isLogged = false;

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
  }

  onLogout(): void{
    this.authFirebase.logout();
    this.tokenService.logout();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login'])
  }

}
