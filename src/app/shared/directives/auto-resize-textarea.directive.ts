import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textarea[autoResize]]',
  standalone: true,
})
export class AutoResizeTextareaDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput() {
    this.resize();
  }

  ngAfterViewInit() {
    setTimeout(() => this.resize(), 500);
  }

  resize() {
    const textarea = this.elementRef.nativeElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    console.log('textarea.scrollHeight', textarea.scrollHeight);
  }
}
