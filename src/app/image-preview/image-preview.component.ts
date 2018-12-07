import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  constructor(private dialogRef: MatDialogRef<ImagePreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  public closeDialog() {
    this.dialogRef.close();
  }

  imgChange(ev) {
    if (ev === 'right') {
      if (parseInt(this.data.currentImageID, 10) + 1 <= this.data.allImages.length - 1 ) {
        this.data.currentImageID ++;
      }
    }
    if (ev === 'left') {
      if (parseInt(this.data.currentImageID, 10) - 1 >= 0) {
        this.data.currentImageID --;
      }
    }
  }
}
