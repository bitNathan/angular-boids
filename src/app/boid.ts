import {Sprite, Texture} from 'pixi.js'

// TODO set based on window size
const min_speed = 2;
const max_speed = 8;
const avoid_distance_threshold = 40;
const vision_threshold = 75; // TODO vision angle

const avoid_scale = 1;
const alignment_scale = 0.02;
const cohesion_scale = 0.005;
const noise_scale = 0.5;

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
    this.acceleration_x = Math.random() - 0.5;
    this.acceleration_y = Math.random() - 0.5;
  }

  update(delta_t: number, min_height: number, max_height: number, min_width: number, max_width: number, boids: Array<Boid>){
    this.sprite.x += this.speed_x * delta_t;
    this.sprite.y += this.speed_y * delta_t;

    // reset acceleration with some noise
    this.acceleration_x = (Math.random() - 0.5) * noise_scale;
    this.acceleration_y = (Math.random() - 0.5) * noise_scale;

    let sep_x = 0, sep_y = 0;
    let coh_x = 0, coh_y = 0;
    let ali_x = 0, ali_y = 0;

    let sep_count = 0;
    let coh_count = 0;

    for (const boid of boids) {
        if (boid === this) continue;

        const dx = boid.sprite.x - this.sprite.x;
        const dy = boid.sprite.y - this.sprite.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 0.0001) continue;

        if (dist < avoid_distance_threshold) {
            sep_x -= dx / dist;
            sep_y -= dy / dist;
            sep_count++;
        }

        else if (dist < vision_threshold) {
            coh_x += dx;
            coh_y += dy;

            ali_x += boid.speed_x;
            ali_y += boid.speed_y;

            coh_count++;
        }
    }

    //   Apply separation
    if (sep_count > 0) {
        this.acceleration_x += (sep_x / sep_count) * avoid_scale;
        this.acceleration_y += (sep_y / sep_count) * avoid_scale;
    }

    //   Apply cohesion / alignment
    if (coh_count > 0) {
        // Cohesion: steer toward average neighbor direction
        this.acceleration_x += (coh_x / coh_count) * cohesion_scale;
        this.acceleration_y += (coh_y / coh_count) * cohesion_scale;

        // Alignment
        ali_x /= coh_count;
        ali_y /= coh_count;

        this.acceleration_x += (ali_x - this.speed_x) * alignment_scale;
        this.acceleration_y += (ali_y - this.speed_y) * alignment_scale;
    }

    //   Update velocity
    this.speed_x += this.acceleration_x * delta_t;
    this.speed_y += this.acceleration_y * delta_t;

    // bound speed
    const speed = Math.sqrt(this.speed_x*this.speed_x + this.speed_y*this.speed_y);
    if (speed > max_speed) {
        this.speed_x = (this.speed_x / speed) * max_speed;
        this.speed_y = (this.speed_y / speed) * max_speed;
    } else if (speed < min_speed){
        this.speed_x = (this.speed_x / speed) * min_speed;
        this.speed_y = (this.speed_y / speed) * min_speed;
    }

    this.rotation = Math.atan2(this.speed_y, this.speed_x);
    this.sprite.rotation = this.rotation;

    // wrap-around
    if (this.sprite.x < min_width)  this.sprite.x = max_width;
    if (this.sprite.x > max_width)  this.sprite.x = min_width;
    if (this.sprite.y < min_height) this.sprite.y = max_height;
    if (this.sprite.y > max_height) this.sprite.y = min_height;
  }
}
