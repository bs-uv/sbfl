import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'message', loadChildren: './pages/message/message.module#MessagePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
