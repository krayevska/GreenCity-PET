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
    console.log("get usrs")
    if(this.canGetUsers) {
      const url = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
      console.log("url ", url)
      this.http.get(url).subscribe((data: User[]) => {
        console.log("data length ", data)
        if(data.length){
          this.users.push(...data);
          console.log("data ", data)
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
    console.log("onInit")
    this.getUsers();
  }

}


