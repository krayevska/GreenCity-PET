import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy  {
  pattern: string;
  subscription: Subscription;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentPattern.subscribe(pattern => this.pattern = pattern)
  }

  changePattern(){
    this.data.changePattern(this.pattern)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
