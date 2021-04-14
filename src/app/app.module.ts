import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './components/roles/roles.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ModalRolesComponent } from './components/roles/modal-roles.component';
import { ModalProfileComponent } from './components/profiles/modal-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    ProfilesComponent,    
    ModalRolesComponent,    
    ModalProfileComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
