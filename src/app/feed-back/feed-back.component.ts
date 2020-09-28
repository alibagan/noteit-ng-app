import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../shared/api.service';

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

  constructor(private apiService: ApiService) {


  }

  sendFeedback(): void{
    this.apiService.postFeedback(this.model).subscribe(
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
