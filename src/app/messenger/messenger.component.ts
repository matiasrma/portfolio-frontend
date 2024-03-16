import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../principal/header/header.component';
import { TokenService } from '../services/token.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ChatComponent]
})
export class MessengerComponent implements OnInit {


  listChats: number[] = [];
  isLogged: boolean = false;   

  constructor(
    private tokenService: TokenService, 
  ) { }

  ngOnInit(): void {
    this.getIsLogged();
  }

  getIsLogged(){
    let token = this.tokenService.getToken();
    if(token != 'undefined' && token != null){      
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }    
    
  }

  async onLogout(){
    this.tokenService.logout();
    this.getIsLogged();
  }

  AddChat(){
    this.listChats.push(this.listChats.length);
  }

}
