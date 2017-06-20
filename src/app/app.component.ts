import { DomSanitizer } from '@angular/platform-browser';
import { Component, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  public icons: IconDetail[];
  public result : string = '';

      // pager object
    pageNumber: number = 1;

    // paged items
    pagedItems: IconDetail[];

    pageSize: number = 40;

  constructor(private sanitizer: DomSanitizer, private http: Http) {
    if (!this.loadData()) {
      this.load();
    }
    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('aa'); 
    if (event.keyCode == 37) {
      this.setPage(this.pageNumber - 1);
    } else if (event.keyCode == 39) {
      this.setPage(this.pageNumber + 1);
    }
  }

  public setPage(num: number) {
    this.pageNumber = num;
    this.pagedItems = this.icons.slice(this.pageSize*(this.pageNumber-1), this.pageSize*(this.pageNumber));
  }


  public load(): Promise<any> {
        return this.http.get('assets/icons/icons.json').toPromise().then(x => {
            this.icons = x.json();
            this.setPage(2);
            return x.json();
        });
    }

  public getIconUrl(icon: IconDetail) {
    return 'assets/icons' + icon.FileName;
  }

  public saveData() {
    localStorage.setItem("iconSet", JSON.stringify(this.icons));
  }

  public loadData():boolean {
    if (localStorage.getItem("iconSet")) {
      this.icons = JSON.parse(localStorage.getItem("iconSet"));
      this.setPage(2);
      return true;
    }
    return false;
  }

  public selectItem(icon: IconDetail) {
    icon.selected = !icon.selected;
    this.saveData();
  }

  public show() {
    this.result = JSON.stringify(this.icons);
  }
}

class IconDetail {
    public FileName: string;
    public Tags: string[];
    public selected?: boolean;
}
