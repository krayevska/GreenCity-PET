import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

dataFromServer;

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
  this.http.get('https://jsonplaceholder.typicode.com/users').subscribe( data => {
    console.log("data ", data);
    this.dataFromServer = data;
  });
  
});

  ngOnInit(): void {
  }

}
