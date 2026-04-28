import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-en-contruccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './en-contruccion.component.html',
  styleUrls: ['./en-contruccion.component.css']
})
export class EnContruccionComponent {
  @Input() isLogged = false;
}
