import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  { path: 'profiles', component: ProfilesComponent },
  { path: 'roles', component: RolesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
