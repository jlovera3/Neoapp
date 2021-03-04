import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { appInitialize } from '@ionic/angular/app-initialize';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { routes } from 'src/environments/environment';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {
  
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.initialize();
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  upload(){
console.log("UPLOAD");
    let files = this.getFiles();
    console.log(files);

    let formData = new FormData();
    formData.append('somekey', 'some value') // Add any other data you want to send

    files.forEach((file) => {
      formData.append('image', file.rawFile, file.name);
      formData.append('title', 'default');
      formData.append('description', 'default');
    });

    this.uploadFormData(formData);

  }

  initialize() {
  }

  addImageToPost($event) {
    console.log("AddImageToPost");
    console.log($event);
  }

  public uploadFormData(formData) {
    return this.http.post<any>(`${routes.base + routes.createpost}`, formData).subscribe();
  }

}
