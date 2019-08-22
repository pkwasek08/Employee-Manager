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


  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public roomViewService: RoomViewService,
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    
    let room = this.roomService.getRoomById(this.id);
    this.desksNumber = room.capacity;

    this.desksArray = this.roomViewService.getDeskByIdRoom(this.id);

  }

  //stara metoda
  public setPositions() {
    console.log("Setpositons");
    for (let i = 0; i < this.desksArray.length; i++) {
      let element = document.getElementById(String(i));
      console.log(element);
      console.log(this.desksArray[i].x);
      element.setAttributeNS(null, "x", String(this.desksArray[i].x));
      element.setAttributeNS(null, "y", String(this.desksArray[i].y));
    }
  }
  public savePositions() {
    let element = document.getElementById("desk");
    console.log("save");


    for (let i = 0; i < this.desksArray.length; i++) {
console.log("loop in save");

      let element = document.getElementById(String(this.desksArray[i].id));
      this.yParameters[i] = parseFloat(element.getAttributeNS(null, "y"));
      this.xParameters[i] = parseFloat(element.getAttributeNS(null, "x"));  
      console.log(parseFloat(element.getAttributeNS(null, "y")));
      
    }
    console.log( this.yParameters);
    console.log( this.xParameters);

  }

  public makeDraggable(evt) {

    console.log(this.desksArray);
    console.log( this.roomViewService.getDesk());
    
    
    let selectedElement;
    let offset;
    let svg = evt.target;
    console.log("evt");
    console.log(evt);
    console.log("target");
    
    console.log(evt.target);
    
    /*  let elem = document.getElementById('desk');
      elem.style.color = 'red';*/
      console.log("elo");

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag)

    function startDrag(evt) {
      console.log("start");

      //if(evt.target.classList.contains('draggable'))
      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
      offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));

    }

    function drag(evt) {
console.log("Drag");

      if (selectedElement) {
        evt.preventDefault();
        let coord = getMousePosition(evt);
        if (coord.x - offset.x >= 0 && coord.x - offset.x <= 35
          && coord.y - offset.y >= 0 && coord.y - offset.y <= 17) {
          selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
          selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
        }
      }
    }
    function endDrag(evt) {
      console.log("end");

      selectedElement = null;
     
    }
    function getMousePosition(evt) {
      console.log("mouse");

      let CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }
   // this.savePositions();
  }

  private saveDesks(): void {
    console.log("addDesk");

    for (let i = 0; i < this.desksArray.length; i++) {
      console.log("loop save");
      this.roomViewService.editDesk(this.desksArray[i].id, this.xParameters[i], this.yParameters[i], this.id);
    }
  }

  private addDesks(): void {
     let desk = new Desk (0,0,0, this.id);
     this.desksArray.push(desk);
    this.roomViewService.addDesk(0, 0, 1);
  }
}