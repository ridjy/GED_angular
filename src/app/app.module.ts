import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';

import { routing } from './app.routing';
import { AppSettings } from './app.settings';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import {Service} from "./pages/documentLibrary/document-library.service";
import {MetadataService} from "./metadata_services/metadata.service";
import {ServerService} from "./alfresco_services/AlfrescoApi.service";
import {AuthGuardService} from "./main/auth-guard.service";
import {AuthService} from "./main/auth.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    CalendarModule.forRoot(),
    routing
  ],
  providers: [ AppSettings, AuthService, AuthGuardService, ServerService, MetadataService, Service ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
