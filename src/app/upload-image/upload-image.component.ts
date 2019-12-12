import { Component, OnInit } from '@angular/core';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  imageURL = './assets/img/download.png';
  fileUpload: File = null;
  constructor(private service: UploadImageService) { }

  ngOnInit() {
  }
  handleFileInput(file: FileList) {
    this.fileUpload = file.item(0);
    // img preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
  }

  Onsubmit(Caption, Image) {
    this.service.postFile(Caption.value, this.fileUpload).subscribe(
      res => {
        console.log('Done');
        Caption.value = null;
        Image.value = null;
        this.imageURL = './assets/img/download.png';
      }
    );
  }
}
