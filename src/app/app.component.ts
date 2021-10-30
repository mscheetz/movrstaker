import { Component } from '@angular/core';
import { CoreService } from './core/core.service';
import { RestService } from './core/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movrstakr';
  constructor(private restSvc: RestService, private coreSvc: CoreService) {    
    this.login();
  }

  login(){
    this.restSvc.getToken()
                .subscribe(res => {
                  this.coreSvc.setCookie(res);
                });
  }

}
