export class Position 
{
    public id : number;
    public name : string;
    public  minWage : number;
    public maxWage : number;


    constructor(
        id: number,
        name: string,
        minWage: number,
        maxWage: number
       )

    {
        this.id = id;
        this.name = name;
        this.minWage = minWage;
        this.maxWage = maxWage;
    }
}