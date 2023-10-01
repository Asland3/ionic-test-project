import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup | any;

  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
   this.validators();
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  validators() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async googleLogin() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.googleLogin().then(
      async (res: any) => {
        await loading.dismiss();
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).then(
      async (res: any) => {
        await loading.dismiss();
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      },
      async (err: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('tabs', { replaceUrl: true });
    } else {
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: 'User already exists',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

}
