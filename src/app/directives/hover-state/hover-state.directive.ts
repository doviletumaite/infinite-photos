import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHoverState]',
  standalone: true
})
export class HoverStateDirective {

  @Output() hoverState = new EventEmitter<boolean>();

  @HostListener('mouseenter')
   onMouseEnter() {
    this.hoverState.emit(true)
  }

  @HostListener('mouseleave')
   onMouseLeave() {
    this.hoverState.emit(false)
  }
}
