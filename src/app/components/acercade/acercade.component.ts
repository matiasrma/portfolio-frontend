import { Component, OnInit } from '@angular/core';
import { Acd } from 'src/app/Model/acd';
import { AcdService } from 'src/app/services/acd.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  
  isLogged = false;
  acerca: Acd = {} as Acd;
  texto: string[] = [];  
  
  constructor(    
    public acdService: AcdService,
    public tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.getACD();
    
    if(this.tokenService.getToken()){      
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }

  async getACD() {
    // this.acerca = await this.acdService.detail(1);
    this.texto = this.acerca.textoacd.split('\n');
  }

  
}
