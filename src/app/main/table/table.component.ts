import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { User } from '../../types';
import { DataService } from "../../data.service";
import { Subscription } from 'rxjs';
import { UsersDataService } from '../../users-data.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnDestroy {
  users: User[] = [];  
  startIndex = 0;
  canGetUsers: boolean = true;
  timer;
  pattern: string;
  subscription: Subscription;
     
  constructor(private http: HttpClient, 
              private dataService: DataService, 
              private router: Router,
              private userData: UsersDataService) {}

  getUsers = () => {
    if(this.canGetUsers) {
      const url = `https://jsonplaceholder.typicode.com/users?_limit=5&_start=${this.startIndex}`;
      this.http.get(url).subscribe((data: User[]) => {
        if(data.length){
          this.users.push(...data);
          this.userData.usersDetails.push(...data);
          this.startIndex += 5;
        } else {
          this.canGetUsers = false;
        }
      });
    // console.log("this.users ", this.users)  
    // this.userData.usersDetails = JSON.parse(JSON.stringify(this.users));
    // console.log("this.usersDetails send from TABLE to SERVICE: ", this.userData.usersDetails)
     this.userData.log();
    }
    
    
  }

  onUserClick(e: Event): void {
    let target = e.target || e.currentTarget;
    let elementId = (target as Element).id;
    let name = this.users[Number(elementId) - 1].name;
    this.router.navigate(["features", elementId, name]);

  }

  onScroll(){
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(this.getUsers, 250);
  }

  ngOnInit(): void {
    this.subscription = this.dataService.currentPattern.subscribe(pattern => {
      this.pattern = pattern;
    });
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


