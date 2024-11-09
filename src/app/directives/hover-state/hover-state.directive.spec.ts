import { HoverStateDirective } from './hover-state.directive';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

describe('HoverStateDirective', () => {
  let directive: HoverStateDirective
  let elementRef: ElementRef
  let hoverStateEmitter: EventEmitter<boolean>

  beforeEach(() => {
    elementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef

    directive = new HoverStateDirective();
    hoverStateEmitter = directive.hoverState;
  })

  it('should create the directive', () => {
    expect(directive).toBeTruthy()
  })

  it('should emit true on mouse enter', () => {
    spyOn(hoverStateEmitter, 'emit')

    directive.onMouseEnter()

    expect(hoverStateEmitter.emit).toHaveBeenCalledWith(true)
  })

  it('should emit false on mouse leave', () => {
    spyOn(hoverStateEmitter, 'emit')

    directive.onMouseLeave()

    expect(hoverStateEmitter.emit).toHaveBeenCalledWith(false)
  })
})
