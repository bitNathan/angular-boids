import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {PixiBoid} from '../pixi-boid';
import {Boid} from '../boid';
import {Application} from 'pixi.js'

const two_pi = Math.PI * 2;
const turn_rate_factor = 1 / 1000;
const turn_rate_offset = two_pi * (turn_rate_factor / 2)

@Component({
  selector: 'app-boid-sim',
  standalone: true,
  imports: [],
  templateUrl: './boid-sim.html',
  styleUrl: './boid-sim.css',
})
export class BoidSim {
  // only contains canvas element and manages boid service
  private app: Application | null = null;
  @ViewChild('pixiCanvas',
    { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  constructor(private pixi: PixiBoid) {}

  // get pixi-boid service on load
  async ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.app = await this.pixi.getApp(canvas);
    if (!(this.app instanceof Application)) throw new Error("app is null");
    const app = this.app; // create a local copy so typescript knows is not null...

    const texture = await this.pixi.boid_img;
    console.log(texture);
    const buffer = Math.max(this.app?.screen.width, this.app?.screen.height) / 10;

    // create boids
    // TODO adjust length / num_boids
    // TODO streamline Boid constructor
    const boids = Array.from({length: 50}, () => {
      // TODO generate random vals efficiently
      const b = new Boid(
        texture,
        Math.random() + 1,
        Math.random() * two_pi,
        ((Math.random() * two_pi) * turn_rate_factor) - turn_rate_offset,
        app.screen.height,
        app.screen.width
      )
      app.stage.addChild(b.sprite);
      return b;
    });

    // add boid updates to ticker
    // TODO pixi ticker object typing
    const update_all = (ticker: any) => {
      boids.forEach(b => b.update(
        ticker.deltaTime,
        -buffer,
        app.screen.height + buffer,
        -buffer,
        app.screen.width + buffer,
      ));
    };

    this.pixi.addTicker(update_all);
  }

  ngOnDestroy(){
    if (this.app){
      this.pixi.destroyApp();
    }
  }
}


