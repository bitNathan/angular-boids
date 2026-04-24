import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.css',
})
export class Header {
  @Output() toggle_boids = new EventEmitter<void>();

  toggle_show_boids(){
    this.toggle_boids.emit();
  }
}
