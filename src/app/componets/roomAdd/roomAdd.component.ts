import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Room } from 'src/app/models/room';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './roomAdd.component.html',
  styleUrls: ['./roomAdd.component.scss']
})
export class RoomAddComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  room: Room;
  number: number;
  name: string;
  capacity: number;
  people: number;
  sizeX: number;
  sizeY: number;
  constructor(public roomService: RoomService,
              public dataService: DataService,
              private _formBuilder: FormBuilder,
              private location: Location) { }
  registrationForm: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private addRoom() {
    this.roomService.addRoom(this.number, this.name, this.capacity, this.people, this.sizeX, this.sizeY);
    this.number = null;
    this.name = '';
    this.capacity = null;
    this.people = null;
  }

  private setRoom(id: number) {
    let idRoom = this.roomService.getRoom().length;
     this.room = new Room(idRoom, this.number, this.name,
      this.capacity, this.people, this.sizeX, this.sizeY);
    this.dataService.setRoom(this.room);
  }

  public processAjaxData() {
    console.log("change url");
    //this.location.replaceState("/addRoom/1")
    //window.history.pushState('page2', 'Title');
  }
}
