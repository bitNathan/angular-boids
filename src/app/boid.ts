import {Sprite, Texture} from 'pixi.js'

const max_speed = 4;
const avoid_distance_threshold = 1000;

export class Boid {
  sprite: Sprite;
  speed_x: number;
  speed_y: number;
  rotation: number;
  acceleration_x: number;
  acceleration_y: number;

  constructor(texture: Texture, speed: number, rotation: number, height:number, width: number){
    this.sprite = new Sprite(texture);

    this.sprite.scale.set(0.5);
    this.sprite.anchor.set(0.5);
    this.sprite.x = Math.random() * width;
    this.sprite.y = Math.random() * height;

    this.rotation = rotation;

    this.speed_x = speed * Math.cos(this.rotation);
    this.speed_y = speed * Math.sin(this.rotation);

    // set acc randomly
    this.acceleration_x = Math.random();
    if (Math.random() > 0.5) this.acceleration_x *= -1;
    this.acceleration_y = Math.random();
    if (Math.random() > 0.5) this.acceleration_y *= -1;
  }

  update(delta_t: number, min_height: number, max_height: number, min_width: number, max_width: number, boids: Array<Boid>){
    const distance_from_right = max_width - this.sprite.x;
    const distance_from_left = this.sprite.x - min_width;
    const distance_from_top = max_height - this.sprite.y;
    const distance_from_bottom = this.sprite.y - min_width;

    // update accel based on wall distance
    this.acceleration_y = (distance_from_top - distance_from_bottom) / Math.max(Math.min(distance_from_top, distance_from_bottom), 1);
    this.acceleration_x = (distance_from_right - distance_from_left) / Math.max(Math.min(distance_from_left, distance_from_right), 1);

    // TODO without On^2
    // boid rules
    let distance: number;
    for (const boid of boids){
      distance = Math.sqrt(Math.pow(this.sprite.x, 2) + Math.pow(boid.sprite.x, 2));
      if (distance < avoid_distance_threshold){
        // seperation
        // this.acceleration_y -= (boid.sprite.y - this.sprite.y);
        // this.acceleration_x -= (boid.sprite.x - this.sprite.x);
      }
      else {
        // cohesion TODO display arrow
        // or dot or smth
        // this.acceleration_y += (boid.sprite.y - this.sprite.y) / 20;
        // this.acceleration_x += (boid.sprite.x - this.sprite.x) / 20;
        // TODO alignment
      }
    }

    // update velocity
    this.speed_x = Math.max(-max_speed, Math.min(max_speed, this.speed_x + this.acceleration_x));
    this.speed_y = Math.max(-max_speed, Math.min(max_speed, this.speed_y + this.acceleration_y));
    // this.speed_x += this.acceleration_x;
    // this.speed_y += this.acceleration_y;

    // rotation
    this.rotation = Math.atan2(this.speed_y, this.speed_x);
    this.sprite.rotation = this.rotation;

    // update pos
    this.sprite.x += delta_t * this.speed_x;
    this.sprite.y += delta_t * this.speed_y;

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
}
