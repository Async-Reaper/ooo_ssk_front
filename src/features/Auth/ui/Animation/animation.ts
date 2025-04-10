// eslint-disable-next-line max-classes-per-file
import Stats from "./stats";

// Init Stats
const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);

/**
 * Constellation plugin for canvas
 */
class Constellation {
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  private config: Config;

  private stars: Star[] = [];

  private rAF: number | null = null;

  constructor(canvas: HTMLCanvasElement, options: Partial<Config>) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    const defaults: Config = {
      star: {
        color: "#5B5B5B",
        width: 3,
        randomWidth: true,
      },
      line: {
        color: "#5B5B5B",
        width: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
      width: window.innerWidth,
      height: window.innerHeight,
      velocity: 0.1,
      length: 1000,
      distance: 100,
      radius: 150,
      stars: [],
    };
    this.config = { ...defaults, ...options };
  }

  private setCanvas(): void {
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
  }

  private setContext(): void {
    this.context.fillStyle = this.config.star.color;
    this.context.strokeStyle = this.config.line.color;
    this.context.lineWidth = this.config.line.width;
  }

  private setInitialPosition(): void {
    if (!this.config.position) {
      this.config.position = {
        x: this.canvas.width * 2,
        y: this.canvas.height * 2,
      };
    }
  }

  private createStars(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.config.length; i++) {
      const star = new Star(this.canvas, this.config);
      this.stars.push(star);
      star.create(this.context);
    }

    this.stars.forEach((star) => star.line(this.context, this.stars, this.config));
    this.animateStars();
  }

  private animateStars(): void {
    this.stars.forEach((star) => star.animate(this.canvas, this.config));
  }

  private loop(callback: () => void): void {
    callback();

    this.rAF = requestAnimationFrame(() => {
      stats.begin();
      this.loop(callback);
      stats.end();
    });
  }

  private bind(): void {
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  private unbind(): void {
    window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  private handleMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.config.position.x = event.clientX - rect.left;
    this.config.position.y = event.clientY - rect.top + 350;
  }

  private handleResize(): void {
    if (this.rAF) cancelAnimationFrame(this.rAF);
  }

  public init(): void {
    this.setCanvas();
    this.setContext();
    this.setInitialPosition();
    this.loop(() => this.createStars());
    this.bind();
  }
}

class Star {
  x: number;

  y: number;

  vx: number;

  vy: number;

  radius: number;

  constructor(canvas: HTMLCanvasElement, config: Config) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = config.velocity - Math.random() * 0.5;
    this.vy = config.velocity - Math.random() * 0.5;
    this.radius = config.star.randomWidth
      ? Math.random() * config.star.width
      : config.star.width;
  }

  create(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }

  animate(canvas: HTMLCanvasElement, config: Config): void {
    if (this.y < 0 || this.y > canvas.height) {
      this.vy = -this.vy;
    } else if (this.x < 0 || this.x > canvas.width) {
      this.vx = -this.vx;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  line(
    context: CanvasRenderingContext2D,
    stars: Star[],
    config: Config,
  ): void {
    stars.forEach((star) => {
      if (
        Math.abs(this.x - star.x) < config.distance
                && Math.abs(this.y - star.y) < config.distance
                && Math.abs(this.x - config.position.x) < config.radius
                && Math.abs(this.y - config.position.y) < config.radius
      ) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(star.x, star.y);
        context.stroke();
        context.closePath();
      }
    });
  }
}

interface Position {
  x: number;
  y: number;
}

interface StarConfig {
  color: string;
  width: number;
  randomWidth: boolean;
}

interface LineConfig {
  color: string;
  width: number;
}

interface Config {
  star: StarConfig;
  line: LineConfig;
  position: Position;
  width: number;
  height: number;
  velocity: number;
  length: number;
  distance: number;
  radius: number;
  stars: Star[];
}

function instantiate(element: HTMLCanvasElement, options: Partial<Config>): void {
  const constellation = new Constellation(element, options);
  constellation.init();
}

document.querySelectorAll("canvas").forEach((canvas) => {
  instantiate(canvas as HTMLCanvasElement, {
    star: {
      width: 3,
    },
    line: {
      color: "#5B5B5B",
    },
    length: window.innerWidth / 5,
    radius: window.innerWidth / 5,
  });
});
