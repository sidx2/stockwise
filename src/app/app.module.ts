import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { init } from './store/global.actions';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IGlobalState } from './store/global.reducers';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { globalReducer } from './store/global.reducers';
import { globalEffects } from './store/global.effects';

import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared-module/shared.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthModule } from './auth-module/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/errorInterceptor';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    AuthModule,
    SharedModule,

    SocketIoModule.forRoot(config),

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3000
    }),

    StoreModule.forRoot({global: globalReducer}),
    EffectsModule.forRoot([globalEffects]),


    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Actions],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

export function initializeApp() {
  const store = inject(Store<{ global: IGlobalState }>)
  return () => {
    store.dispatch(init());
  }
}
