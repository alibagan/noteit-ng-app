import { Component, OnInit } from '@angular/core';
import {Notebook} from './model/notebook';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //this.getAllNotebooks();
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occurred")
      }
    );
  }

  public createNotebook(){
    let newNotebook: Notebook = {
      id: null,
      name : 'New notebook',
      ngOfNotes: 0
    }

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occurred")
      }
    )
  }

  public updateNotebook(updateNotebook: Notebook){
    this.apiService.postNotebook(updateNotebook).subscribe(
      res =>{},
      err => {
        alert("you have an error !!!")
      }
    );
  }

  public deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure? are you like te delete this")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res =>{
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
      err => {
        alert("you have an error !!!")
      }
      );
    }
  }
}


















