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

// TODO dont use big for loop to toggle dark mode? batching?
  toggle_dark(){
    if (document.body.classList.contains('dark-mode')) for (const el of document.querySelectorAll('*')) {el.classList.remove('dark-mode')}
    else for (const el of document.querySelectorAll('*')) {el.classList.add('dark-mode')}
  }
}
