import { Component, 
         AfterViewInit, 
         ElementRef, 
         ViewChild, 
         HostListener,
         Renderer2 } from '@angular/core';

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

  moreGames: any[] = [];

  constructor(private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      // let li = this.gamesItem.nativeElement.clientWidth,
      //     ul = this.gamesRow.nativeElement.clientWidth,
      //     games = this.gamesList.length + 1,
      //     brakepoint1 = ul/(li*games),
      //     brakepoint2 = ul - (li*games);
      // if(brakepoint1 > 1) {
      //   this.gamesList.push(this.moreGames.splice(0, 1)[0]);
      // } else if(brakepoint2 < 0){
      //   this.moreGames.unshift(this.gamesList.splice(-1, 1)[0]);
      // }
      return true;
    }

  debounce (fn, delay) {
    var t;
    return function () {
      clearTimeout(t)
      t = setTimeout(fn, delay)
    }
  }

  ngAfterViewInit() {
    let li = this.gamesItem.nativeElement.clientWidth,
        ul = this.gamesRow.nativeElement.clientWidth,
        divider =  Math.floor(ul/li) - 1;

    this.moreGames = this.gamesList.slice(divider);
    this.gamesList = this.gamesList.splice(0, divider);

    //for trying @HostListener comment this renderer and no debounce needed
    this.renderer.listen(window, 'resize', this.debounce((event) => {
      let li = this.gamesItem.nativeElement.clientWidth,
            ul = this.gamesRow.nativeElement.clientWidth,
            games = this.gamesList.length + 1,
            brakepointRight = ul/(li*games),
            brakepointLeft = ul - (li*games);
        if(brakepointRight > 1) {
          this.gamesList.push(this.moreGames.splice(0, 1)[0]);
        } else if(brakepointLeft < 0){
          this.moreGames.unshift(this.gamesList.splice(-1, 1)[0]);
        }
    }, 250));
  }
}