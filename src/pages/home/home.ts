import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppState } from '../../app/models/app.state';
import { Store } from '@ngrx/store';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,  private store: Store<AppState>) {
    this.store.select(_=>_.hello).subscribe(console.log);
    
  }

}
