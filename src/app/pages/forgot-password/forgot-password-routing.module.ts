import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordPage } from './forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  },
  {
    path: 'forgot-password-modal',
    loadChildren: () => import('../../modals/forgot-password-modal/forgot-password-modal.module').then( m => m.ForgotPasswordModalPageModule)

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
