import { Injectable, NgZone } from '@angular/core';
import {Application, Assets} from 'pixi.js'

@Injectable({
  providedIn: 'root',
})
export class PixiBoid {
  // singleton
  private app: Application | null = null;
  readonly boid_img = Assets.load('boid-1.png');

  constructor(private ngZone: NgZone){}

  async getApp(canvas: HTMLCanvasElement){
    // return app if present
    if (this.app){
      this.app.renderer.resize(canvas.width, canvas.height);
      (this.app.renderer as any).view = canvas;
      return this.app;
    }

    // create and init app outside angular
    await this.ngZone.runOutsideAngular(async () => {
      this.app = new Application();

      // TODO reset bg color when header button is pressed
      let bg_color = "#fff9ee"
      if (document.body.classList.contains('dark-mode')) bg_color = "#92a7c5"

      await this.app.init({
        canvas,
        resizeTo: canvas.parentElement ?? window,
        backgroundColor: bg_color,
      });
    });

    return this.app;
  }

  // wrappers to add and remove tickers from app
  addTicker(fn: (dt: any) => void, priority = 0) {
    this.app?.ticker.add(fn, undefined, priority);
  }

  removeTicker(fn: (dt: any) => void) {
    this.app?.ticker.remove(fn);
  }

  destroyApp(){
    if (this.app){
      this.app.destroy(true);
      this.app = null;
    }
  }
}
