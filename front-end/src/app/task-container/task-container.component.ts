import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent {

  constructor(http: HttpClient) {
    http.get('http://localhost/app/api/v1/tasks');
  }
}
