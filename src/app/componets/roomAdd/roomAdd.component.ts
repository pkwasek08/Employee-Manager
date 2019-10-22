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
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  room: Room;
  number: number;
  value: string;
  name: string;
  capacity: number;
  people = 0;
  weightRoom: number;
  lengthRoom: number;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  constructor(public roomService: RoomService,
    public dataService: DataService,
    private _formBuilder: FormBuilder,
    private location: Location) { }
  registrationForm: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+[a-zA-Z]?$'), Validators.max(1000)])],
      secondCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]+\ \?)+$')])],
      thirdCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(1000)])],
     // fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(20)])],
      sixthCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.max(20)])],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public elo()
  {
    console.log(this.number);
    
    console.log("elo");
    
  }
  private addRoom() {
    console.log(this.number,this.people);
    
    this.roomService.addRoom(this.number, this.name, this.capacity, this.people, this.weightRoom, this.lengthRoom);
    /*  this.number = null;
      this.name = '';
      this.capacity = null;
      this.people = null;*/
  }

  private setRoom(id: number) {
    let idRoom = this.roomService.getRoom().length;
    this.room = new Room(idRoom, this.number, this.name,
      this.capacity, this.people, this.weightRoom, this.lengthRoom);
    this.dataService.setRoom(this.room);
  }

  public processAjaxData() {
    console.log("change url");
    //this.location.replaceState("/addRoom/1")
    //window.history.pushState('page2', 'Title');
  }
}
