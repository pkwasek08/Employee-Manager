

export class Desk {
    public id: number;
    public x: number;
    public y: number;
    public rotate: number;
    public idRoom: number
    //public idEmployee: number;
    constructor(id: number, x: number, y: number,rotate:number, idRoom: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.idRoom = idRoom;
    }
}