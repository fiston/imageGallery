import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  constructor(private dialogRef: MatDialogRef<ImagePreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  faTrash = faTrash;
  public closeDialog() {
    this.dialogRef.close(this.data.allImages);
  }

  onDelete(currentImageID) {
    let index;
    for (let i = 0; i < this.data.allImages.length; i++) {
      if (this.data.allImages[i].id === parseInt(currentImageID, 10)) {
        index = i;
        break;
      }
    }
    const isLast = index === this.data.allImages.length - 1 ? true : false;
    this.data.allImages.splice(index, 1);
    localStorage.setItem('galleryImages', JSON.stringify(this.data.allImages));
    isLast ? this.imgChange('left') : this.imgChange('right') ;
  }
  imgChange(ev) {
    if (ev === 'right') {
      if (parseInt(this.data.currentImageID, 10) + 1 <= this.data.allImages.length - 1) {
        this.data.currentImageID++;
      }
    }
    if (ev === 'left') {
      if (parseInt(this.data.currentImageID, 10) - 1 >= 0) {
        this.data.currentImageID--;
      }
    }
  }
}
