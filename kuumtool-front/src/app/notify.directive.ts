import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Spot } from './models/Spot';

@Directive({
  selector: '[appNotify]'
})
export class NotifyDirective {

  @Input() labelData: Spot[] = [];
  @Input() visibilityMap: { [name: string]: boolean } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.clearLabels();
    this.createLabels();
  }

  private clearLabels(): void {
    const labels = this.el.nativeElement.querySelectorAll('.thought');
    labels.forEach((label: any) => {
      this.renderer.removeChild(this.el.nativeElement, label);
    });
  }

  private createLabels(): void {
    if (this.labelData) {
      this.labelData.forEach((data) => {
          const label = this.renderer.createElement('div');
          this.renderer.addClass(label, 'thought');
          this.renderer.setStyle(label, 'left', `${data.axx}px`);
          this.renderer.setStyle(label, 'top', `${data.axy-100}px`);
          this.renderer.setProperty(label, 'innerText', data.name);

          if (!this.visibilityMap[data.name]) {
            this.renderer.setStyle(label, 'display', 'none');
          }

          this.renderer.appendChild(this.el.nativeElement, label);
      });
    }
  }
}
