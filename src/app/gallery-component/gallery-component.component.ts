import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery-component.component.html',
  styleUrls: ['./gallery-component.component.css']
})
export class GalleryComponentComponent implements OnInit {
  selectedFile = null;
  uploadFileBase64 = null;

  constructor(private http: HttpClient) {
  }
  onFileSelected(ev) {
    this.selectedFile = ev.target.files[0];
    this.getBase64(this.selectedFile).then(
      data => {
        this.uploadFileBase64 = data;
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
  onUpload() {
    // upload the image binary;
  }

  ngOnInit() {
  }

}
