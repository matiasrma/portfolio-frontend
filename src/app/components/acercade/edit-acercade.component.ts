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

    acerca: Acd = null;
    enableUpload: boolean = false;

    constructor(
        public acdService: AcdService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public tokenService: TokenService){}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params["id"];
        this.getACD(id);
    }

    async getACD(id: number) {     

      this.acerca = await this.acdService.detail(id);
      if (this.acerca === null) {
        alert("No se pudo cargar la información");
        this.router.navigate(['']);
      }

      this.enableUpload = true;

    }

    async onUpdate() {
        const id = this.activatedRoute.snapshot.params['id'];        
        await this.acdService.update(id, this.acerca);
        this.router.navigate(['']);        
    }
    
  }