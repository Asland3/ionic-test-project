import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup | any;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.validators();
  }

  get name() {
    return this.credentials?.get('name');
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  get rePassword() {
    return this.credentials?.get('rePassword');
  }

  validators() {
    this.credentials = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    let pass = control.get('password')?.value || '';
    let confirmPass = control.get('rePassword')?.value || '';

    return pass === confirmPass ? null : { notSame: true };
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      const user = await this.authService.register(this.credentials.value);
      await loading.dismiss();
  
      if (user) {
        this.navCtrl.navigateBack('login', { replaceUrl: true });
      }
    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: error.message,
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }  
}
