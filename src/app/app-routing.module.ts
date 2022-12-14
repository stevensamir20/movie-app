import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', redirectTo: '' },
  { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)},
  { path: 'movies', component: MoviesListComponent, canActivate: [AuthGuard]},
  { path: 'movies/:id', loadChildren: () => import('./pages/single-movie/single-movie.module').then(m => m.SingleMovieModule), canActivate: [AuthGuard]},
  { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule), canActivate: [AuthGuard]},
  { path: 'actors', loadChildren: () => import('./pages/actors-list/actors-list.module').then(m => m.ActorsListModule), canActivate: [AuthGuard]},
  { path: 'actors/:id', loadChildren: () => import('./pages/single-actor/single-actor.module').then(m => m.SingleActorModule), canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }