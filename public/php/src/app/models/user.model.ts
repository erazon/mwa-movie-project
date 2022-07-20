export class User{
    #_id!: string;
    #name!: string;
    #username!: string;
    #password!: string;
    
    get _id() {return this.#_id;}
    get title() {return this.#name;}
    get year() {return this.#username;}
    get genre() {return this.#password;}
  }