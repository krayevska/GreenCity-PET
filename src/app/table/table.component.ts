import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  dataFromServer;  
  numberOfUsers: string = "5";
  startIndex: string = "0";
  url: string = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
  wasThereScroll: boolean = false;

  constructor(private http: HttpClient){
    this.tablePromise.then(response => {
        this.dataFromServer = response;
      },
      error => {
        console.log("Error happened with dummy promise:", error)
      }
    )
  }

  tablePromise = new Promise((resolve, reject) => {
    this.http.get(this.url).subscribe( data => {
      this.dataFromServer = data;
      this.startIndex = '5';
    });
  });

  onScroll(){
    if(!this.wasThereScroll){
      this.url = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
      this.tablePromise = new Promise((resolve, reject) => {
        this.http.get(this.url).subscribe( data => {
          this.dataFromServer = [...this.dataFromServer, ...data[Symbol.iterator]()];
        });
      });
      this.wasThereScroll = true;
    }
  }

    ngOnInit(): void {
    }

  }
