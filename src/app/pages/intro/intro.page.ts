import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    // Logic for going to next slide here
  }

  async start() {
     await Storage['set']({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

}
