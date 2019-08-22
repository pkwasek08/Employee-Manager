

export class Desk {
    public id: number;
    public x: number;
    public y: number;
    public idRoom: number
    //public idEmployee: number;
    constructor(id: number, x: number, y: number, idRoom: number) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.idRoom = idRoom;
    }
}