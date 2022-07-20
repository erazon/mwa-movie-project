export class Cast{
    #_id!: string;
    #name!: string;
    #debut_year!: number;
    
    get _id() {return this.#_id;}
    get name() {return this.#name;}
    get debut_year() {return this.#debut_year;}
  }