import { Component, OnInit, HostListener } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Desk } from 'src/app/models/desk';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { RoomViewService } from 'src/app/services/room-view.service';
import { DataService } from 'src/app/services/data.service';
import { EmployeeItemComponent } from '../employee-item/employee-item.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { NgbPaginationNumberContext } from '@ng-bootstrap/ng-bootstrap/pagination/pagination';

export enum KEY_CODE {
  RIGHT_ARROW = 52,
  LEFT_ARROW = 37
}
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {

  public desksNumber: number;
  public desksArray: Desk[] = [];
  public temp = 30;
  public id: number;
  public yParameters = [this.desksNumber];
  public xParameters = [this.desksNumber];
  public selectedElement;
  public selectedElementId: number;
  public offset;
  public svg;
  public scalex = 100;
  public scaley = 100;
  public screen: string;
  public rotate = 0;
  public idDeskArray;
  public collision: boolean;
  public employeesList: Employee[] = [];
  public selectedEmployeeId;
  public startPicking = false;
  public deskForNewPerson: number;
  public stretch: number;

  constructor(
    public roomService: RoomService,
    private route: ActivatedRoute,
    public roomViewService: RoomViewService,
    public dataService: DataService,
    public employeeService: EmployeeService
  ) { }

  ngOnInit() {
    let room;
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    if (!(isNaN(this.id))) {
      room = this.roomService.getRoomById(this.id);
    } else {
      room = this.dataService.getRoom();
      this.id = room.id;
    }

    if (room != null) {
      this.scalex = room.sizeX * 10;
      this.scaley = room.sizeY * 10;
      this.screen = "0 0" + " " + String(this.scalex) + " " + String(this.scaley);
      this.desksNumber = room.capacity;
      this.desksArray = this.roomViewService.getDesksByIdRoom(this.id);
      this.idDeskArray = this.roomViewService.getDesk().length;
      const employees = this.employeeService.getEmployee();
      employees.forEach(employee => {
        if (employee.room === this.id) {
          this.employeesList.push(employee);
        }
      });
      if (this.employeesList.length > 0) {
        this.selectedEmployeeId = 0;
      }
    }

    this.stretch = this.scalex * this.scaley;
  }
  //stara metoda
  public setPositions() {
    for (let i = 0; i < this.desksArray.length; i++) {
      const element = document.getElementById(String(i));

      this.desksArray[i].x = element[i].x;
      this.desksArray[i].y = element[i].y;
    }
  }

  public savePositions() {
    this.desksArray.forEach((item, index) => {
      if (item != null) {
        const element = document.getElementById(String(item.id));
        this.yParameters[index] = parseFloat(element.getAttributeNS(null, "y"));
        this.xParameters[index] = parseFloat(element.getAttributeNS(null, "x"));
        this.desksArray[index].x = parseFloat(element.getAttributeNS(null, "x"));
        this.desksArray[index].y = parseFloat(element.getAttributeNS(null, "y"));
      }
    });
  }

  public startDrag(evt, id: number) {
    this.svg = evt.target;
    //if(evt.target.classList.contains('draggable'))
    this.selectedElement = evt.target;
    this.offset = this.getMousePosition(evt);
    this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
    this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
    this.desksArray.forEach((item, index) => {
      if (item.id === id) {
        this.selectedElementId = index;
      }
    });
    this.savePositions();
  }

  public drag(evt, id: number) {
    //let temp = 0;
    if (this.selectedElement) {
      this.svg = evt.target;
      evt.preventDefault();
      const coord = this.getMousePosition(evt);

      if (coord.x - this.offset.x >= 0 && coord.x - this.offset.x <= this.scalex - 20
        && coord.y - this.offset.y >= 0 && coord.y - this.offset.y <= this.scaley - 20) {
        this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
        this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
        this.savePositions();
        this.checkCollision(id, evt);
        // this.desksArray[i].x = coord.x - this.offset.x;
        // this.desksArray[i].y = coord.y - this.offset.y;
      }
    }
  }

  public checkAllCollision(evt) {
    this.desksArray.forEach((desk, index) => {
      this.checkCollision(evt, index);
    });
  }

  public checkCollision(id: number, evt): boolean {
    let temp = 0;
    const coord = this.getMousePosition(evt);

    for (const desks of this.desksArray) {
      if (desks.id === id) {
        continue;
      }

      for (const desksCollision of this.desksArray) {
        if (desksCollision.id !== desks.id && (desks.x + 20 >= coord.x - this.offset.x && desks.y + 20 >= coord.y - this.offset.y &&
          desks.x <= coord.x - this.offset.x + 20 && desks.y <= coord.y - this.offset.y + 20)) {
          temp++;
        }
      }
    }
    if (temp === 0) {
      const element = document.getElementById(String(id));
      element.style.fill = "#808080";
      element.style.opacity = "0.5";
      this.collision = false;
      return false;
    } else {
      temp = 0;
      const element = document.getElementById(String(id));
      element.style.fill = "red";
      element.style.opacity = "0.6";
      this.collision = true;
      return true;
    }
  }

  public endDrag(evt, id: number) {
    this.svg = evt.target;
    this.savePositions();
    this.selectedElement = null;
    this.selectedElementId = null;
    //this.checkAllCollision(evt);
    const element = document.getElementById(String(id));
    //element.style.fill = "#808080";
    if (this.collision === false) { element.style.opacity = "0.0"; }
  }

  private getMousePosition(evt) {
    const CTM = this.svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  private saveDesks(): void {
    if ((isNaN(this.id))) { }
    this.desksArray.forEach(desk => {
      this.roomViewService.editDesk(desk.id, desk.x, desk.y, desk.rotate, this.id, desk.idEmployee);
    });
  }
  private addDesks(): void {
    const desk = new Desk(this.idDeskArray, 0.0, 0.0, 0, this.id, null);
    this.idDeskArray++;
    this.desksArray.push(desk);
    this.roomViewService.addDesk(0, 0, 0, this.id, null);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "r") {
      this.keyRotate();
    }
  }

  public showSelectedEmployee(id: number) {
    const element = document.getElementById(String(id));
    element.style.fill = "#808080";
  }

  public keyRotate() {
    if (this.selectedElementId != null) {
      this.desksArray[this.selectedElementId].rotate += 90;
      if (this.desksArray[this.selectedElementId].rotate === 360) {
        this.desksArray[this.selectedElementId].rotate = 0;
      }
    }
  }

  public selectEmployee(id?: number) {
    let form = document.getElementById("exampleFormControlSelect1") as HTMLSelectElement;
    this.selectedEmployeeId = form.selectedIndex;
  }

  //nie używana
  public checkNewPersonInRoom(): boolean {

    let checking = false;
    if (this.employeesList.length > 0) {
      this.desksArray.forEach(desk => {
        if (desk.idEmployee === this.employeesList[this.selectedEmployeeId].id) {
          checking = true;
        }
      });
    }
    if (checking) {
      return true;
    } else { return false; }
  }

  public startPickingPerson() {
    this.startPicking = true;
  }

  public assignNewPerson(evt, id: number) {
    if (this.startPicking) {
      this.desksArray.forEach((item, index) => {
        if (item.id === id && item.idEmployee === null) {

          this.deskForNewPerson = index;
        }
      });
      const buttonSave = document.getElementById("buttonSave") as HTMLSelectElement;
      buttonSave.disabled = false;
    }
  }

  public saveNewPlacePerson() {
    this.desksArray.forEach((itemDesk) => {
      if (itemDesk.idEmployee === this.employeesList[this.selectedEmployeeId].id) {
        itemDesk.idEmployee = null;
      }
    });
    this.desksArray[this.deskForNewPerson].idEmployee = this.employeesList[this.selectedEmployeeId].id;
    this.saveDesks();
    this.deskForNewPerson = null;
    const buttonSave = document.getElementById("buttonSave") as HTMLSelectElement;
    buttonSave.disabled = true;
  }
}