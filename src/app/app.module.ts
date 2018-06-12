import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {ArtistSearchComponent} from './artist-search/artist-search.component';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';



@NgModule({
  declarations: [
      AppComponent,
      ArtistSearchComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpClientXsrfModule.withOptions({
          cookieName: 'My-Xsrf-Cookie',
          headerName: 'My-Xsrf-Header',
      }),
  ],
  providers: [

      HttpErrorHandler,
      MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
