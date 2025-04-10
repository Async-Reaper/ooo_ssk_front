export default class Stats {
  private startTime: number = Date.now();

  private prevTime: number = this.startTime;

  private ms: number = 0;

  private msMin: number = Infinity;

  private msMax: number = 0;

  private fps: number = 0;

  private fpsMin: number = Infinity;

  private fpsMax: number = 0;

  private frames: number = 0;

  private mode: number = 0;

  public domElement: HTMLDivElement;

  constructor() {
    // Create container
    const container = document.createElement("div");
    container.id = "stats";
    container.style.cssText = "width:80px;opacity:0;cursor:pointer";
    container.addEventListener("mousedown", (event) => {
      event.preventDefault();
      this.setMode((this.mode + 1) % 2);
    });

    // FPS div
    const fpsDiv = document.createElement("div");
    fpsDiv.id = "fps";
    fpsDiv.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
    container.appendChild(fpsDiv);

    const fpsText = document.createElement("div");
    fpsText.id = "fpsText";
    fpsText.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    fpsText.innerHTML = "FPS";
    fpsDiv.appendChild(fpsText);

    const fpsGraph = document.createElement("div");
    fpsGraph.id = "fpsGraph";
    fpsGraph.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";
    fpsDiv.appendChild(fpsGraph);

    for (let i = 0; i < 74; i++) {
      const bar = document.createElement("span");
      bar.style.cssText = "width:1px;height:30px;float:left;background-color:#113";
      fpsGraph.appendChild(bar);
    }

    // MS div
    const msDiv = document.createElement("div");
    msDiv.id = "ms";
    msDiv.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
    container.appendChild(msDiv);

    const msText = document.createElement("div");
    msText.id = "msText";
    msText.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    msText.innerHTML = "MS";
    msDiv.appendChild(msText);

    const msGraph = document.createElement("div");
    msGraph.id = "msGraph";
    msGraph.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0";
    msDiv.appendChild(msGraph);

    for (let i = 0; i < 74; i++) {
      const bar = document.createElement("span");
      bar.style.cssText = "width:1px;height:30px;float:left;background-color:#131";
      msGraph.appendChild(bar);
    }

    this.domElement = container;

    this.setMode(this.mode);
  }

  setMode(value: number): void {
    this.mode = value;

    switch (this.mode) {
    case 0:
        (this.domElement.querySelector("#fps") as HTMLElement).style.display = "block";
        (this.domElement.querySelector("#ms") as HTMLElement).style.display = "none";
        break;
      case 1:
        (this.domElement.querySelector("#fps") as HTMLElement).style.display = "none";
        (this.domElement.querySelector("#ms") as HTMLElement).style.display = "block";
        break;
    }
  }

  private updateGraph(dom: HTMLElement, value: number): void {
    const child = dom.appendChild(dom.firstChild as HTMLElement);
    child.style.height = `${value}px`;
  }

  public begin(): void {
    this.startTime = Date.now();
  }

  public end(): number {
    const time = Date.now();

    this.ms = time - this.startTime;
    this.msMin = Math.min(this.msMin, this.ms);
    this.msMax = Math.max(this.msMax, this.ms);

    const msText = this.domElement.querySelector("#msText") as HTMLElement;
    msText.textContent = `${this.ms} MS (${this.msMin}-${this.msMax})`;

    const msGraph = this.domElement.querySelector("#msGraph") as HTMLElement;
    this.updateGraph(msGraph, Math.min(30, 30 - (this.ms / 200) * 30));

    this.frames++;

    if (time > this.prevTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.fpsMin = Math.min(this.fpsMin, this.fps);
      this.fpsMax = Math.max(this.fpsMax, this.fps);

      const fpsText = this.domElement.querySelector("#fpsText") as HTMLElement;
      fpsText.textContent = `${this.fps} FPS (${this.fpsMin}-${this.fpsMax})`;

      const fpsGraph = this.domElement.querySelector("#fpsGraph") as HTMLElement;
      this.updateGraph(fpsGraph, Math.min(30, 30 - (this.fps / 100) * 30));

      this.prevTime = time;
      this.frames = 0;
    }

    return time;
  }

  public update(): void {
    this.startTime = this.end();
  }
}
