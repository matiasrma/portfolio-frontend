import { Routes } from '@angular/router';
import { AuhtGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'NewHome', pathMatch: 'full' },
  { 
    path: 'Inicio', 
    loadComponent: () => import('./principal/principal.component').then(m => m.PrincipalComponent),
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', loadComponent: () => import('./principal/home/home.component').then(m => m.HomeComponent) },
      { path: 'Login', loadComponent: () => import('./principal/login/login.component').then(m => m.LoginComponent) },
      { path: 'Social', loadComponent: () => import('./principal/social/social.component').then(m => m.SocialComponent) }
    ]
  },
  { path: 'Inicio', redirectTo: 'NewHome', pathMatch: 'full' },
  { path: 'Home', redirectTo: 'NewHome', pathMatch: 'full' },
  { 
    path: 'Administrar', 
    canActivate: [AuhtGuard],
    children: [
    { path: 'Experiencia', loadComponent: () => import('./administrar/experiencia/experiencia.component').then(m => m.ExperienciaComponent) },
    { path: 'Skill', loadComponent: () => import('./administrar/skill/skill.component').then(m => m.SkillComponent) },
    { path: 'AcercaDe', loadComponent: () => import('./administrar/acercade/acercade.component').then(m => m.AcercaDeComponent) },
    { path: 'Proyecto', loadComponent: () => import('./administrar/proyecto/proyecto.component').then(m => m.ProyectoComponent) },
    { path: 'Social', loadComponent: () => import('./administrar/social/social.component').then(m => m.SocialComponent) },
  ]
  },
  { 
    path: 'NewHome', 
    loadComponent: () => import('./new-home/new-home.component').then(m => m.NewHomeComponent)
  },
  { 
    path: 'Login', 
    loadComponent: () => import('./login/login-cg.component').then(m => m.LoginCGComponent)
  },
  { 
    path: 'ControlGastos', 
    loadComponent: () => import('./control-gastos/control-gastos.component').then(m => m.ControlGastosComponent),
    canActivate: [AuhtGuard]
  },
  { path: '**', redirectTo: 'NewHome' }
];
