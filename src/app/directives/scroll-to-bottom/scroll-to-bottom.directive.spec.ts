import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { ElementRef } from '@angular/core';

describe('ScrollToBottomDirective', () => {
  let directive: ScrollToBottomDirective
  let mockElementRef: ElementRef

  beforeEach(() => {
    mockElementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef

    directive = new ScrollToBottomDirective(mockElementRef)
  });

  it('should create', () => {
    expect(directive).toBeTruthy()
  });

});
