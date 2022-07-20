import {Cast} from './cast.model';

export class Movie{
    #_id!: string;
    #title!: string;
    #year!: number;
    #genre!: [string];
    #casts!: [Cast]
    
    get _id() {return this.#_id;}
    get title() {return this.#title;}
    set title(title:string) {this.#title = title;}
    get year() {return this.#year;}
    get genre() {return this.#genre;}
    get casts() {return this.#casts;}
  
    constructor(id:string, title:string, year:number){
      this.#_id = id;
      this.#title = title;
      this.#year = year;
    }
  }