import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { LoginUsuario } from '../Model/login-usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'control-gastos',
  templateUrl: './control-gastos.component.html',
  styleUrls: ['./control-gastos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
  
})
export class ControlGastosComponent implements OnInit {

    public usuario: LoginUsuario = { nombre_usuario: '',  password: '' } as LoginUsuario;
    
    constructor(public ms: MainService) { 
    }  

    ngOnInit(): void {    
        
    } 

    

}
