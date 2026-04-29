import {Sprite, Texture} from 'pixi.js'

export class Boid {
  sprite: Sprite;
  speed: number;
  rotation: number;
  turn_rate: number;

  constructor(texture: Texture, speed: number, rotation: number, turn_rate: number, height:number, width: number){
    this.sprite = new Sprite(texture);

    this.sprite.scale.set(0.5);
    this.sprite.anchor.set(0.5);
    this.sprite.x = Math.random() * width;
    this.sprite.y = Math.random() * height;

    this.speed = speed;
    this.rotation = rotation;
    this.turn_rate = turn_rate;
  }

  update(delta_t: number, min_height: number, max_height: number, min_width: number, max_width: number){
    // update pos
    this.sprite.x += delta_t * this.speed * Math.cos(this.rotation);
    this.sprite.y += delta_t * this.speed * Math.sin(this.rotation);
    this.rotation += this.turn_rate * delta_t;
    this.sprite.rotation = this.rotation;

    // buffer checks
    if (this.sprite.y < min_height){
      this.sprite.y = max_height;
    }
    else if (this.sprite.y > max_height){
      this.sprite.y = min_height;
    }

    // x buff checks
    if (this.sprite.x < min_width){
      this.sprite.x = max_width;
    }
    else if (this.sprite.x > max_width){
      this.sprite.x = min_width;
    }
  }
  // TODO destroy func
}
