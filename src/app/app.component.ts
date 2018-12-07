import { Component, OnInit } from '@angular/core';
import { ImageDataService } from './services/image-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  galleryImages = [];

  constructor(private _imageDataService: ImageDataService) {
  this.setDataSource();
  }
  setDataSource() {
    this._imageDataService.getAllImages()
    .subscribe(
      res => {
        this.galleryImages = res;
        // this.windowHeaderData = res[0];
        localStorage.setItem('galleryImages', JSON.stringify(res));
      },
      err => {
        console.log('service failed');
        // this.openSnackBar(`Error: ${err.error.text}`, 'Register a few users');
      }
    );
  }

  ngOnInit(): void {
    this.setDataSource();
  }
}

