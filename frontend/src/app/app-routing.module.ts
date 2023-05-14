import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ListsComponent } from './lists/lists.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { LibraryComponent } from './library/library.component';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserLoginComponent },
  { path: 'edit', component: UserEditComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'user-profile/:id/lists', component: ListsComponent },
  { path: 'user-profile/:id/followers', component: FollowersComponent },
  { path: 'user-profile/:id/following', component: FollowingComponent },
  { path: 'user-profile/:id/library', component: LibraryComponent },
  { path: 'items/:name', component: ItemDetailComponent},
  { path: 'itemsdetail/:id', component: ItemDetailComponent},
  { path: 'cart/:id', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }