

export class Desk {
    public id: number;
    public x: number;
    public y: number;
    public idRoom: number
    //public idEmployee: number;
    constructor(x: number, y: number, id: number, idRoom: number) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.idRoom = idRoom;
    }
}