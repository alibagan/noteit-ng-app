import { Component, OnInit } from '@angular/core';
import {Notebook} from './model/notebook';
import {ApiService} from '../shared/api.service';
import {Note} from './model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectNotebook: Notebook;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
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



  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res =>{
        this.notes = res;
      },
      err =>{
        alert("An error has occurred!!!!")
      }
    );
  }

  public createNote(notebookId : string){
    let newNote: Note = {
      id: null,
      text: 'whrite something here',
      title: 'new title',
      notebookId: notebookId,
      lastModifiedOn: null
    };

    this.apiService.postNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("you have an error!!!!")
      }
    );
  }

  selectedNotebook(notebook: Notebook) {
    this.selectNotebook = notebook;
    this.apiService.getNotesByNotebook(this.selectNotebook.id).subscribe(
      res =>{
        this.notes = res;
      },
      err =>{
        alert("you have a problem!!!!!");
      }
  )
  }

  updateNote(updateNote: Note) {
   this.apiService.postNote(updateNote).subscribe(
     res =>{

     },
     err => {
       alert("you have an Error !!!!!")
     }
   )
  };

  selectAllNotes() {
    this.selectNotebook = null;
    this.getAllNotes();
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure you want to delete this note !!!")){
      this.apiService.deleteNote(note.id).subscribe(
      res =>{
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
      },
      err =>{
        alert("You have sure an error !!!!")
      }
    );
  }
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







































