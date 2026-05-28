import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
  },
  hostDirectives: [LogDirective]
})

export class SafeLinkDirective {
    queryParam = input('MyAngularApp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('SafeLinkDirective is Active!');
    }

    onClick(event: Event) {
        const wantsToLeave = window.confirm('Are you sure you want to leave this page?');

        if(wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + "?from=" + this.queryParam();
            return;
        }
        if (!wantsToLeave) {
            event.preventDefault();
        }
    }
}