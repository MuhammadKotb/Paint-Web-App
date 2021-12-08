import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { paintServices } from './app.services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [paintServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
