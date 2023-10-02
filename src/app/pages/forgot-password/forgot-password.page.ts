import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.validators();
  }

  get email() {
    return this.credentials?.get('email');
  }

  validators() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async forgotPassword() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.authService.forgotPassword(this.credentials.value).then(
      async (res: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Reset password link has been sent to your email',
          message: res,
          buttons: [{ text: 'OK', role: 'ok' }],
        });
  
        await alert.present();
        const result = await alert.onDidDismiss();
        if (result.role === 'ok') {
          this.credentials.reset();
          this.router.navigateByUrl('/login');
        }
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Reset password failed',
          message: err.message,
          buttons: [{ text: 'OK', role: 'ok' }],
        });
  
        await alert.present();
      }
    );
  }
  
}
