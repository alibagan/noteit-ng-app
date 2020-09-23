import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {

  model: FeedBackViewModel = {
    name : '',
    email: '',
    feedback: ''
  };

  constructor(private http: HttpClient) {

  }

  sendFeedback(): void{
    let url = "http://localhost:8082/api/feedback";
    this.http.post(url, this.model).subscribe(
      res =>{
        location.reload();
      },
      err =>{
        alert("An error has occured while sending feedback");
      }
    )

  }

  ngOnInit(): void {
  }

}

export interface FeedBackViewModel{
  name: string;
  email: string;
  feedback: string;
}
