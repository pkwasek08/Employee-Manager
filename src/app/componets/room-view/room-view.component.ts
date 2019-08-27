import { Component, OnInit, HostListener } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Desk } from 'src/app/models/desk';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { RoomViewService } from 'src/app/services/room-view.service';

export enum KEY_CODE {
  RIGHT_ARROW = 52,
  LEFT_ARROW = 37
}
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
  public selectedElementId: number;
  public offset;
  public svg;
  public scalex: number;
  public scaley: number;
  public screen: string;
  public rotate: number = 0;
  public idDeskArray;

  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public roomViewService: RoomViewService
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    let room = this.roomService.getRoomById(this.id);

    this.scalex = room.sizeX;
    this.scaley = room.sizeY;

    this.screen = "0 0" + " " + String(this.scalex) + " " + String(this.scaley);

    this.desksNumber = room.capacity;

    this.desksArray = this.roomViewService.getDeskByIdRoom(this.id);

    
    this.idDeskArray = this.roomViewService.getDesk().length ;
    console.log(this.idDeskArray);
    console.log(this.roomViewService.getDeskByIdRoom(this.id));
    
    console.log(this.desksArray);
    
  }

  //stara metoda
  public setPositions() {
    for (let i = 0; i < this.desksArray.length; i++) {
      let element = document.getElementById(String(i));

      this.desksArray[i].x = element[i].x;
      this.desksArray[i].y = element[i].y;
    }
  }
  public savePositions() {
    let element = document.getElementById("desk");
    for (let i = 0; i < this.desksArray.length; i++) {

      if (this.desksArray[i] != null) {
        let element = document.getElementById(String(this.desksArray[i].id));
        this.yParameters[i] = parseFloat(element.getAttributeNS(null, "y"));
        this.xParameters[i] = parseFloat(element.getAttributeNS(null, "x"));
        this.desksArray[i].x = parseFloat(element.getAttributeNS(null, "x"));
        this.desksArray[i].y = parseFloat(element.getAttributeNS(null, "y"));
      }
    }
  }

  public startDrag(evt, id: number) {
    this.svg = evt.target;
    //if(evt.target.classList.contains('draggable'))
    this.selectedElement = evt.target;
    this.offset = this.getMousePosition(evt);
    this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
    this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
    this.selectedElementId = id;
    this.savePositions();
  }

  public drag(evt, id: number) {
    let temp = 0;
    if (this.selectedElement) {
      this.svg = evt.target;
      evt.preventDefault();
      let coord = this.getMousePosition(evt);


      if (coord.x - this.offset.x >= 0 && coord.x - this.offset.x <= this.scalex - 20
        && coord.y - this.offset.y >= 0 && coord.y - this.offset.y <= this.scaley - 20) {
        if (this.checkCollision(id, evt) === false) {
          this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
          this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
          this.savePositions();
          // this.desksArray[i].x = coord.x - this.offset.x;
          // this.desksArray[i].y = coord.y - this.offset.y;
          let element = document.getElementById(String(id));
          element.style.opacity = "0.0";
        }
        else {

          let element = document.getElementById(String(id));
          element.style.fill = "red";
          element.style.opacity = "0.6";

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
        if (desksCollision.id != desks.id && (desks.x + 20 >= coord.x - this.offset.x && desks.y + 20 >= coord.y - this.offset.y && desks.x <= coord.x - this.offset.x + 20 && desks.y <= coord.y - this.offset.y + 20)) {
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
    this.selectedElementId = null;
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
      this.roomViewService.editDesk(this.desksArray[i].id, this.desksArray[i].x, this.desksArray[i].y, this.desksArray[i].rotate, this.id);
    }
  }
  private addDesks(): void {
    let desk = new Desk(this.idDeskArray, 0.0, 0.0, 0, this.id);
    this.idDeskArray++;
    this.desksArray.push(desk);
    this.roomViewService.addDesk(0, 0, 0, this.id);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key === "r") {
      this.keyRotate();
    }

  }

  public keyRotate() {
    if (this.selectedElementId != null) {
      this.desksArray[this.selectedElementId].rotate += 90;
      if (this.desksArray[this.selectedElementId].rotate === 360) {
        this.desksArray[this.selectedElementId].rotate = 0;
      }
    }
  }

}