import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import { Directive, HostListener, ElementRef, Input } from '@angular/core';

// import { Item } from './item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('item') item: ElementRef;

  arrItem: any = [
    {id: 1, name: 'Tab 1'},
    {id: 2, name: 'Tab 2'},
    {id: 3, name: 'Tab 3'},
    {id: 4, name: 'Tab 4'},
    {id: 5, name: 'More', list: []}
  ];
  arrSpliceItem: any = [];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.resize(event);
  }

  resize(event) {
    // console.log(this.nav.nativeElement.clientWidth);
    // console.log(this.item.nativeElement.clientWidth);
    const tab = this.item.nativeElement.clientWidth;
    const nav = this.nav.nativeElement.clientWidth;
    const l = this.arrItem.length;
    const sum = l * tab;
    console.log('sum ', sum);
    if ( sum > nav ) {
      this.arrSpliceItem.push(this.arrItem.splice(this.arrItem.length - 2, 1));
      // console.log(this.arrSpliceItem);
    } else {
      if ( this.arrSpliceItem.length > 0 ) {
        const tmp = this.arrSpliceItem[this.arrSpliceItem.length - 1];
        this.arrSpliceItem.pop();
        this.arrItem.splice(this.arrItem.length - 2, 0, tmp[0]);
        console.log('LOL ', tmp);
      }
    }
  }
}
