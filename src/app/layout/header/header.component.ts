import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
  }
}
