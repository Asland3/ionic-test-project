import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import Swiper from 'swiper';
import { Storage } from '@capacitor/storage'; // Import Storage here


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined; 
  swiper?: Swiper;
 

  constructor(private router: Router) { }


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
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
