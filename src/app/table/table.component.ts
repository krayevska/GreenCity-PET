import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../types';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{
  users: User[] = [];  
  startIndex = 0;
  canGetUsers: boolean = true;
  timer;
     
  constructor(private http: HttpClient){}

  getUsers = () => {
    if(this.canGetUsers) {
      const url = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
      this.http.get(url).subscribe((data: User[]) => {
        if(data.length){
          this.users.push(...data);
          this.startIndex += 5;

        } else {
          this.canGetUsers = false;
        }
      });
    }
  }

  onScroll(){
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(this.getUsers, 250);
  }

  ngOnInit(): void {
    this.getUsers();
  }

}


