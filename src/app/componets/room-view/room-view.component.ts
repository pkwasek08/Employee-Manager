import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Desk } from 'src/app/models/desk';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { RoomViewService } from 'src/app/services/room-view.service';
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {

  //public selectedElement = false;
  public desksNumber: number;
  public desksArray: Desk[] = [];
  public temp: number = 30;
  public id: number;
  public yParameters = [this.desksNumber];
  public xParameters = [this.desksNumber];
  public selectedElement;
  public offset;
  public svg;
  public scalex: number;
  public scaley: number;
  public screen: string;
  public rotate: number = 0;
  public collision: boolean = false;
  public idDeskArray;

  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public roomViewService: RoomViewService,
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.scalex = 40;
    this.scaley = 20;

    this.screen = "0 0 " + this.scalex + " " + this.scaley;

    let room = this.roomService.getRoomById(this.id);
    this.desksNumber = room.capacity;

    this.desksArray = this.roomViewService.getDeskByIdRoom(this.id);
    this.idDeskArray = this.desksArray.length + 1;
  }

  //stara metoda
  public setPositions() {
    console.log("Setpositons");
    for (let i = 0; i < this.desksArray.length; i++) {
      let element = document.getElementById(String(i));

      this.desksArray[i].x = element[i].x;
      this.desksArray[i].y = element[i].y;
    }
  }
  public savePositions() {
    let element = document.getElementById("desk");

    for (let i = 0; i < this.desksArray.length; i++) {

      let element = document.getElementById(String(this.desksArray[i].id));
      this.yParameters[i] = parseFloat(element.getAttributeNS(null, "y"));
      this.xParameters[i] = parseFloat(element.getAttributeNS(null, "x"));
      this.desksArray[i].x = parseFloat(element.getAttributeNS(null, "x"));
      this.desksArray[i].y = parseFloat(element.getAttributeNS(null, "y"));

    }
  }

  public makeDraggable(evt, id: number) {


    this.svg = evt.target;

    /*  let elem = document.getElementById('desk');
      elem.style.color = 'red';*/
    this.svg.addEventListener('mousedown', this.startDrag);
    this.svg.addEventListener('mousemove', this.drag);
    this.svg.addEventListener('mouseup', this.endDrag);
    this.svg.addEventListener('mouseleave', this.endDrag)
    this.savePositions();
  }
  public startDrag(evt, id: number) {
    this.svg = evt.target;

    //if(evt.target.classList.contains('draggable'))
    this.selectedElement = evt.target;
    this.offset = this.getMousePosition(evt);
    this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
    this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
    this.savePositions();
  }

  public drag(evt, id: number) {
    this.svg = evt.target;
    let temp = 0;
    if (this.selectedElement) {
      evt.preventDefault();
      let coord = this.getMousePosition(evt);


      if (coord.x - this.offset.x >= 0 && coord.x - this.offset.x <= this.scalex - 5
        && coord.y - this.offset.y >= 0 && coord.y - this.offset.y <= this.scaley - 5) {
        if (this.checkCollision(id, evt) === false) {
          this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
          this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
          this.savePositions();
          // this.desksArray[i].x = coord.x - this.offset.x;
          // this.desksArray[i].y = coord.y - this.offset.y;
          let element = document.getElementById("field");
          console.log(element);
          element.style.fill = "green";
        }
        else {
         let element = document.getElementById("field");
         console.log(element);
         element.style.fill = "red";
         
        }
      }
    }
    temp = 0;
  }

  public checkCollision(id: number, evt): boolean {
    let temp = 0;
    let coord = this.getMousePosition(evt);

    for (let desks of this.desksArray) {
      if (desks.id === id)
        continue;

      for (let desksCollision of this.desksArray) {
        if (desksCollision.id != desks.id && (desks.x + 5 >= coord.x - this.offset.x && desks.y + 5 >= coord.y - this.offset.y && desks.x <= coord.x - this.offset.x + 5 && desks.y <= coord.y - this.offset.y + 5)) {
          temp++;
        }
      }
    }
    if (temp === 0) {
      return false;
    }
    else {
      temp = 0;
      return true;
    }
  }
  public endDrag(evt) {
    this.svg = evt.target;
    console.log("end");
    this.savePositions();
    this.selectedElement = null;
  }

  private getMousePosition(evt) {

    console.log("halo mouse");

    let CTM = this.svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  private mousedrag(evt, id: number, selectedElement, offset) {

  }
  private saveDesks(): void {
    console.log("addDesk");

    for (let i = 0; i < this.desksArray.length; i++) {
      this.roomViewService.editDesk(this.desksArray[i].id, this.xParameters[i], this.yParameters[i], this.id);
    }
  }
  private addDesks(): void {
    let desk = new Desk(this.idDeskArray, 0.0, 0.0, this.id);
    this.idDeskArray++;
    this.desksArray.push(desk);
    this.roomViewService.addDesk(0, 0, this.id);
  }
}