import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

  isLogged: boolean = false;  

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getIsLogged();
  }

  getIsLogged(){
    if(this.tokenService.getToken()){
      //this.roles = this.tokenService.getAuthorites();      
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    console.log(this.isLogged);
  }  

}
