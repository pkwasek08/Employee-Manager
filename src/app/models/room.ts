export class Room {
    public id: number;
    public number: number;
    public name: string;
    public capacity: number;
    public people: number;
    public sizeX: number;
    public sizeY: number;


    constructor(
        id: number,
        number: number,
        name: string,
        capacity: number,
        people: number,
        sizeX: number,
        sizeY: number,
    ) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.capacity = capacity;
        this.people = people;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}