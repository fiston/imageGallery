import { Component, OnInit, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

import { ImageDataService } from '../services/image-data.service';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery-component.component.html',
  styleUrls: ['./gallery-component.component.css']
})
export class GalleryComponentComponent implements OnInit {
  selectedFile = null;
  uploadFileBase64 = null;
  @Input() images;
  constructor(private dialog: MatDialog,
    private _imageDataService: ImageDataService) {}

  openDialog(evt): void {
    const selectedImageString = evt.target.src;
    const selectedImageID = evt.target.id;
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
        data: {allImages: this.images, currentImageID: selectedImageID}
        , width : '80%',
        height: '70%',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
  }
  onFileSelected(ev) {
    this.selectedFile = ev.target.files[0];
    this.getBase64(this.selectedFile).then(
      data => {
        this.uploadFileBase64 = data;
        this.addToGallery();
      }
    );
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  addToGallery() {
    this.images.push({
      id: this.images.length,
      timestamp: new Date().getTime(),
      imgString: this.uploadFileBase64
    });
    // this._imageDataService.updateImages(this.images);
    localStorage.setItem('galleryImages', JSON.stringify(this.images));
  }
  onUpload() {
    // upload the image binary;
  }

  ngOnInit() {
  }

}
