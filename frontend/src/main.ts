import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { provideStore } from '@ngrx/store';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
// import { routes } from './app/app.routes';
// import { cartReducer } from './app/store/cart/cart.reducer';

bootstrapApplication(AppComponent, appConfig) 
//   providers: [
//     provideRouter(routes),
//     provideStore({
//       cart: cartReducer
//     }),
//     provideStoreDevtools({
//       maxAge: 25,
//       logOnly: false
//     })
//   ]
// })
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}
);

