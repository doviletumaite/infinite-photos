import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Subject, throttleTime } from 'rxjs';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true
})
export class ScrollToBottomDirective {

  @Output() reachedBottom = new EventEmitter<boolean>()

  private scrollSubject = new Subject<void>()

  constructor(private el: ElementRef) {
    this.scrollSubject.pipe(
      throttleTime(300)
    ).subscribe(() => this.reachedBottom.emit());
  }

  @HostListener('scroll', ['$event']) onScroll() {
    const target = this.el.nativeElement as HTMLElement
    const scrollPosition = target.scrollTop + target.clientHeight
    const maxScroll = target.scrollHeight

    if (scrollPosition >= maxScroll - 1) {
      this.scrollSubject.next();
    }
  }

}
