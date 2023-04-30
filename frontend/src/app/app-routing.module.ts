import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListsComponent } from './lists/lists.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { LibraryComponent } from './library/library.component';
import { UserLoginComponent } from './user-login/user-login.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: UserLoginComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'user-profile/:id/lists', component: ListsComponent },
  { path: 'user-profile/:id/followers', component: FollowersComponent },
  { path: 'user-profile/:id/following', component: FollowingComponent },
  { path: 'user-profile/:id/library', component: LibraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }