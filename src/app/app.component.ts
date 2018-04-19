import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('gamesRow') gamesRow: ElementRef;
  @ViewChild('gamesItem') gamesItem: ElementRef;
  
  gamesList: any[] = [
    {game:'soccer'},
    {game:'volleyball'},
    {game:'baseball'},
    {game:'hockey'},
    {game:'basketball'}
  ];

  moreGames: any[] = [{game: 'beliberda'}];

  debounce(func, wait, immediate?) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  constructor(
    private renderer: Renderer2) { }

  ngAfterViewInit() {
    let rowWidth = this.gamesItem.nativeElement.parentElement.clientWidth;
    let itemWidth = this.gamesItem.nativeElement.clientWidth;
    let totalLength = () => itemWidth * this.gamesList.length + 200;
    let divider = Math.ceil(totalLength()/rowWidth);
    this.moreGames = this.gamesList.slice(divider);
    this.gamesList = this.gamesList.splice(0,(this.gamesList.length-divider));
    this.renderer.listen(window, 'resize', this.debounce((event) => {
      let difference = totalLength() - this.gamesItem.nativeElement.parentElement.clientWidth;
      if(this.gamesItem.nativeElement.parentElement.clientWidth > totalLength()){
        this.gamesList.push(this.moreGames.splice(- 1, 1)[0]);
      } else {
        if(this.gamesItem.nativeElement.parentElement.clientWidth < totalLength()){
          this.moreGames.push(this.gamesList.splice(0, 1)[0]);
        }
      }
    }, 50));
  }

  
}