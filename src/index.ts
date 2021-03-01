export interface options {
    color?: string
}

export interface particle {
    position: Vector;
    speed: Vector;
    settings: particleSettings;
}

export interface particleCreateSettings {
    startPosition?: Vector;
    startSpeed?: Vector;
    settings?: particleSettings;
}

interface particleSettings {
    size: Vector;
    color: string;
}

interface Vector {
    x: number,
    y: number
}

const defaultOptions: options = {
    color: "white"
}

const defaultSettings: particleSettings = {
    size: { x: 10, y: 10 },
    color: "black"
}

class Instance {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    options: options;
    
    particles: particle[] = [];
    active: boolean = false;
    timeStamp: number | null = null;
    
    constructor(canvas: HTMLCanvasElement, options: options) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.options = options;

        this.clear();
    }
    
    emit(settings: particleCreateSettings) {
        let particle: particle = {
            position: settings.startPosition || { x: this.width / 2, y: this.height / 2},
            speed: settings.startSpeed || { x: 10, y: 10 },
            settings: { ...settings.settings, ...defaultSettings },
        }
        
        this.particles.push(particle);
        this.start();
    }
    
    start() {
        if (this.active) {
            return;
        }
        
        window.requestAnimationFrame(now => {
            this.timeStamp = now;
            window.requestAnimationFrame(this.draw);
        });
    }
    
    stop() {
        this.active = false;
        this.clear();
        this.timeStamp = null;
    }
    
    draw(now: number) {
        if (this.particles.length > 0) {
            this.stop();
            return;
        }
        
        const deltaTime = now - this.timeStamp;
        this.timeStamp = now;
        
        this.clear();
        
        this.particles.forEach(particle => {
            particle.position.x += particle.speed.x * deltaTime / 1000;
            particle.position.y += particle.speed.y * deltaTime / 1000;
            
            this.ctx.fillStyle = particle.settings.color;
            this.ctx.fillRect(particle.position.x, particle.position.y, particle.settings.size.x, particle.settings.size.y);
        });
    }
    
    clear() {
        this.ctx.fillStyle = this.options.color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

var canvas = document.getElementById("canvas") as HTMLCanvasElement;
var instance = new Instance(canvas, {});
instance.emit({});