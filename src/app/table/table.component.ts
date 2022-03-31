import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  users: User[] = [];  
  numberOfUsers: string = "5";
  startIndex = -5;
  url: string = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
  canGetUsers: boolean = true;
  
  constructor(private http: HttpClient){}

  getUsers = () => {
    if(this.canGetUsers) {
      this.startIndex += 5;
      const url = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
           
      this.http.get(url).subscribe((data: User[]) => {
        if(data.length){
          this.users.push(...data);
        } else {
          this.canGetUsers = false;
        }
      });
    }
  }
  
  onScroll(){
    this.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  }
