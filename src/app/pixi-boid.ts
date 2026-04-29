import { Injectable, NgZone } from '@angular/core';
import {Application, Assets} from 'pixi.js'

@Injectable({
  providedIn: 'root',
})
export class PixiBoid {
  // singleton
  private app: Application | null = null;
  readonly boid_img = Assets.load('https://pixijs.com/assets/bunny.png');

  constructor(private ngZone: NgZone){}

  // TODO handle args for bg color
  async getApp(canvas: HTMLCanvasElement){
    // return app if present
    if (this.app) return this.app;

    // create and init app outside angular
    await this.ngZone.runOutsideAngular(async () => {
      this.app = new Application();

      await this.app.init({
        canvas,
        resizeTo: canvas.parentElement ?? window,
        backgroundColor: "ffffff",
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
  // TODO destroy
}
