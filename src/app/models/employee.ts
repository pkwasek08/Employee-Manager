import { Room } from './room';

export class Employee 
{
    public  firstName: string;
    public id: number;
    public position: string;
    public salary: number;
  public lastName: string;
  public room: Room;


    constructor(id:number,
        firstName: string,
        lastName: string,
         position: string,
         salary: number,
         room: Room
       )

    {
        this.id = id;
        this.firstName = firstName;
        this.position= position;
        this.salary= salary;
        this.lastName= lastName;
        this.room = room;
    }
}