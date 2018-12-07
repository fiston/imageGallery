import { Component, OnInit, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery-component.component.html',
  styleUrls: ['./gallery-component.component.css']
})
export class GalleryComponentComponent implements OnInit {
  selectedFile = null;
  uploadFileBase64 = null;
  @Input() images;
  constructor(private dialog: MatDialog) {}

  openDialog(evt): void {
    const selectedImageString = evt.target.src;
    const selectedImageID = evt.target.id;
      this.dialog.open(ImagePreviewComponent, {
        data: {allImages: this.images, currentImageID: selectedImageID}
        , width : '80%',
        height: '70%',
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
      imgString: this.uploadFileBase64
    });
  }
  onUpload() {
    // upload the image binary;
  }

  ngOnInit() {
  }

}
