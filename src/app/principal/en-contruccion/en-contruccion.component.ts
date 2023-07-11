import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-contruccion',
  templateUrl: './en-contruccion.component.html',
  styleUrls: ['./en-contruccion.component.css']
})
export class EnContruccionComponent implements OnInit {

  @Input() isLogged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
