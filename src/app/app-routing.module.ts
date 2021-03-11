import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'creategasto',
    loadChildren: () => import('./modals/creategasto/creategasto.module').then( m => m.CreategastoPageModule)
  },
  {
    path: 'socios',
    loadChildren: () => import('./pages/socios/socios.module').then( m => m.SociosPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'parcelas',
    loadChildren: () => import('./pages/parcelas/parcelas.module').then( m => m.ParcelasPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'cultivos',
    loadChildren: () => import('./pages/cultivos/cultivos.module').then( m => m.CultivosPageModule),
    canLoad: [AuthGuard]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
