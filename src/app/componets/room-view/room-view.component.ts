import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Desk } from 'src/app/models/desk';
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {

  //public selectedElement = false;
  public desksNumber: number;
  public desksArray: Desk[] = [];
  public temp: number = 5;
  constructor(public roomService: RoomService) {

    let room = this.roomService.getRoomById(1);
    this.desksNumber = room.capacity;

    for (let i = 0; i < this.desksNumber; i++) {
      let desk = new Desk(i+1,i+3);   
      this.desksArray.push(desk);
    }


  }

  public makeDraggable(evt) {
    let selectedElement;
    let offset;
    let svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);

    function startDrag(evt) {
      //if(evt.target.classList.contains('draggable'))
      console.log("start" + evt.target.classList.contains('draggable'));
      selectedElement = evt.target;
      offset = getMousePosition(evt);
      offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
      offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));

    }

    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        let coord = getMousePosition(evt);
        if (coord.x - offset.x >= 0 && coord.x - offset.x <= 25
          && coord.y - offset.y >= 0 && coord.y - offset.y <= 17) {
          selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
          selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
        }
      }
    }
    function endDrag(evt) {
      selectedElement = null;
    }
    function getMousePosition(evt) {
      let CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }

  }


}
