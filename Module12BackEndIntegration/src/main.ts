import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpRequest,
  HttpHandlerFn,
  provideHttpClient,
  withInterceptors,
  HttpEventType,
} from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
/*   const modifiedReq = request.clone({
    headers: request.headers.set('X-DEBUGr', 'TESTING'),
  }); */
  console.log('[Outgoing request]:', request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if(event.type === HttpEventType.Response) {
          console.log('[Incoming response]:', event);
        }
      }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
