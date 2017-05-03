import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YoutubeService } from './youtube.service';
import { DomSanitizer } from '@angular/platform-browser';

import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private trendingVideos: any[] = [];
  private embedUrl:any;
  
  constructor(public navCtrl: NavController, public youtubeService: YoutubeService, private sanitizer: DomSanitizer) {
    //this.loadVideos('VN');
    this.searchVideo('can nha mau tim');
  }
  public loadVideos(countryCode: string) : void {
    this.youtubeService.getTrendingVideos(countryCode).subscribe((result)=>{
      for (var i = 0; i < result.items.length; i++) {
        this.trendingVideos[i] = {
          id: result.items[i].id,
          title: result.items[i].snippet.title,
          thumbnail: result.items[i].snippet.thumbnails.high.url
        };
      }
    });
  }
  
  public searchVideo(question: any){
    this.youtubeService.getTrendingVideosSearch(question).subscribe((result)=>{
      for (var i = 0; i < result.items.length; i++) {
        this.trendingVideos[i] = {
          id: result.items[i].id,
          title: result.items[i].snippet.title,
          thumbnail: result.items[i].snippet.thumbnails.high.url
        };
      }
    });
  }

  public openVideoPlayer(videoId: any) : void {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?autoplay=1');
    this.navCtrl.push(DetailPage, {
      link: this.embedUrl,
    });
  }
}