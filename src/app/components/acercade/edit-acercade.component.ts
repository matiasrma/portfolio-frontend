import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Acd } from "src/app/Model/acd";
import { AcdService } from "src/app/services/acd.service";
import { TokenService } from "src/app/services/token.service";


@Component({
    selector: 'app-edit-acercade',
    templateUrl: './edit-acercade.component.html',
    styleUrls: ['./edit-acercade.component.css']
  })
  export class EditAcercadeComponent implements OnInit{

    acerca: Acd = new Acd("");

    constructor(
        public acdService: AcdService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public tokenService: TokenService){}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params["id"];
        this.acdService.detail(id).subscribe(
            data =>{
              this.acerca = data;
            }, err =>{
              alert("No se pude cargar el perfil");
              this.router.navigate([''])
            }
          )    
    }

    onUpdate(): void{
        const id = this.activatedRoute.snapshot.params['id'];        
        this.acdService.update(id, this.acerca).subscribe(
        data =>{
            alert("Actualizado!");
            this.router.navigate([''])
        }, err =>{
            alert("Error al actualizar");
            this.router.navigate([''])
        }
        )
    }
    
  }