import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common'

import { Header } from './header/header'
import { BoidSim } from './boid-sim/boid-sim'
import { Footer } from './footer/footer'
import { Landing } from './landing/landing'

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, BoidSim, Footer, Landing],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('boids');
  show_boids = false;

  toggle_show_boids(){
    this.show_boids = !this.show_boids;
  }

}
