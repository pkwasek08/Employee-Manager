import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private temp: number = 0;
  public nextId: number;

  constructor() {
    
  }

 
}
