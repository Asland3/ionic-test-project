import { Component, ElementRef, ViewChild } from '@angular/core';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import Swiper from 'swiper';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})

export class IntroPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined; 
  swiper?: Swiper;
 
  constructor(private navCtrl: NavController) { }

  swiperReady() {
    // Wait for the component to render completely
    setTimeout(() => {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }, 1000); 
  }
  
  next() {
    this.swiper?.slideNext();
  }

  async start() {
    await Preferences.set({ key: INTRO_KEY, value: 'true' });
    this.navCtrl.navigateRoot('/');
  }
}
