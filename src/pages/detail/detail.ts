import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  private link: string;
  
  constructor(public navCtrl: NavController, private navParams: NavParams) {
      this.link = navParams.get('link');
  }
}