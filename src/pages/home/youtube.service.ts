
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class YoutubeService {
    CONFIG: any = {
        youtubeEndPoint: 'https://www.googleapis.com/youtube/v3/videos',
        youtubeApiKey: 'AIzaSyDN0_g8dLaBp5hI8UdleGbEEMAQjZlnePU'
    }
    private params: any;
    private options: any;

    constructor(private http: Http, private _jsonp: Jsonp) { }

    getTrendingVideos(country: string) {
        this.params = new URLSearchParams();
        this.params.set('part', 'snippet');
        this.params.set('chart', 'mostPopular');
        this.params.set('regionCode', country);
        this.params.set('maxResults', '24');
        this.params.set('key', this.CONFIG.youtubeApiKey);
        this.options = new RequestOptions({
            search: this.params
        });
        return this.http.get(this.CONFIG.youtubeEndPoint, this.options)
            .map(res => res.json())
            .catch(this.throwError);
    }
    getTrendingVideosSearch(question: string) {
        this.params = new URLSearchParams();
        this.params.set('part', 'snippet');
        this.params.set('chart', 'mostPopular');
        this.params.set('regionCode', 'VN');
        this.params.set('maxResults', '24');
        this.params.set('q', question);
        this.params.set('key', this.CONFIG.youtubeApiKey);
        this.options = new RequestOptions({
            search: this.params
        });
        return this.http.get(this.CONFIG.youtubeEndPoint, this.options)
            .map(res => res.json())
            .catch(this.throwError);
    }
    getVideoDetails(videoId: string) {
        this.params = new URLSearchParams();
        this.params.set('part', 'statistics');
        this.params.set('id', videoId);
        this.params.set('key', this.CONFIG.youtubeApiKey);
        this.options = new RequestOptions({
            search: this.params
        });
        return this.http.get(this.CONFIG.youtubeEndPoint, this.options)
            .map(res => res.json())
            .catch(this.throwError);
    }
    private throwError(error: any) {
        return Observable.throw(error.status);
    }
}