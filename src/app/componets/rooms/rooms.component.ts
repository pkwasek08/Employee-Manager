import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RouterLink } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  number: number;
  name: string;
  capacity: number;
  people: number;
  sizeX: number;
  sizeY: number;
  constructor(public roomService: RoomService,
    private _formBuilder: FormBuilder) { }

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

  private viewRoom(id: number) {
  }
}
