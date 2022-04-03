import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pattern: string;
  searchPattern: string;

  constructor() { }

  sendPattern(){
    console.log("pattern ", this.pattern);
    // this.searchPattern = this.pattern;
    // console.log("array ", this.searchPattern);
  }

  ngOnInit(): void {
  }

}
