import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pattern: string;

  constructor() { }

  @Output() currentPattern = new EventEmitter<any>();

  sendPattern(){
    this.currentPattern.emit(this.pattern);
  }


  ngOnInit(): void {
  }

}
