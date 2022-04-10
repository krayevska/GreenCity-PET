import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DataService } from "../../data.service";
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy  {
  pattern: string;
  subscription: Subscription;

  constructor(private searchData: DataService) { }

  ngOnInit(): void {
    this.subscription = this.searchData.currentPattern.subscribe(pattern => this.pattern = pattern)
  }

  changePattern(){
    this.searchData.changePattern(this.pattern)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
