import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined; 
  swiper?: Swiper;

  constructor() { }


  swiperReady() {
    // Wait for the component to render completely
    setTimeout(() => {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }, 1000); 
  }


  next() {
    this.swiper?.slideNext();
  }

  skip() {
    // Logic for skipping to the last slide here
  }

  swiperSlideChanged(e: any) {
    console.log(e);
  }

}
