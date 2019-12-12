import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  postFile(caption: string, fileUpload: File) {
    const endoint = 'https://localhost:44359/api/UploadImage';
    const formData: FormData = new FormData();
    formData.append('Image', fileUpload, fileUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(endoint, formData);
  }
}
