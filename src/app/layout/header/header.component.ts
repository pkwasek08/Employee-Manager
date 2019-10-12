import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';

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
    document.getElementById('main').style.opacity = '0.8';

  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('main').style.opacity = '1';
  }
}
