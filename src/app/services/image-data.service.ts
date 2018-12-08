import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {
  url = 'http://localhost:3000';
  prodUrl = 'https://kunalgallery.firebaseio.com';
  constructor(private _http: HttpClient) { }

  getAllImages() {
    // return this._http.get<any>(this.url + '//imageResults');
    return this._http.get<any>(this.prodUrl + '/imageResults.json');
  }
  getImageById(id) {
    // return this._http.get<any>(this.url + '//imageResults' + id);
    return this._http.get<any>(this.prodUrl + `/imageResults/${id}.json`);
  }

  updateImages(images) {
    return this._http.put<any>(this.prodUrl + `/imageResults.json`, JSON.stringify(images));
  }
}
