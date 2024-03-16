import { Component, Input, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NewMessage } from '../Model/newMessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]

})
export class ChatComponent implements OnInit {

  public userName = '';
  public groupName = '';
  public messageToSend = '';
  public joined = false;
  public conversation: NewMessage[] = [];

  private connection: HubConnection;

  sendign: boolean = false;

  @Input() public isShowChat: boolean = false;
  @Input() isLogged: boolean = false;   

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.URLChat + 'hubs/chat')
      .build();

    this.connection.on("NewUser", message => this.newUser(message));
    this.connection.on("NewMessage", message => this.newMessage(message));    
  }

  ngOnInit(): void {
    this.connection.start()
      .then(_ => {
        console.log('Connection Started');
      }).catch(error => {
        return console.error(error);
      });
  }

  public showChat(){
    this.isShowChat = !this.isShowChat;
  }

  public join() {

    this.sendign = true;
    if (this.isLogged){
      this.userName = 'Matias Rivas';
      this.connection.invoke('JoinGroup', this.groupName, this.userName)
      .then(_ => {
        this.joined = true;
        this.sendign = false;
      });
    } else {
      this.groupName = this.userName;
      this.connection.invoke('NewChat', this.userName)
      .then(_ => {
        this.joined = true;
      });
    }
    
  }

  public sendMessage() {
    const newMessage: NewMessage = {
      message: this.messageToSend,
      userName: this.userName,
      groupName: this.groupName
    };

    this.sendign = true;
    this.connection.invoke('SendMessage', newMessage)
      .then(_ => {
        this.messageToSend = '';
        this.sendign = false;
      });
      
  }

  public leave() {
    this.connection.invoke('LeaveGroup', this.groupName + "Group", this.userName)
      .then(_ => this.joined = false);
  }

  private newUser(message: string) {
    console.log(message);
    this.conversation.push({
      groupName: 'Sistema',
      userName: 'Sistema',
      message: message
    });

    if (this.conversation.length > 1 || this.isLogged){
      this.sendign = false;      
    } 
    else {
      this.conversation.push({
        groupName: 'Sistema',
        userName: 'Sistema',
        message: 'Esperando a Matias Rivas'
      });
    }
  }

  private newMessage(message: NewMessage) {
    console.log(message);
    this.conversation.push(message);    
  }

  Keyboard(event: KeyboardEvent, action: string){
    
    if (event.key == 'Enter' && action == 'join' && (this.userName != '' || this.isLogged) ){
      this.join()
    }

    if (event.key == 'Enter' && action == 'sendMessage' && this.messageToSend != ''){
      this.sendMessage()
    }
    
  }

}
