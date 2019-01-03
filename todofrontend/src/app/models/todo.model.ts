import v4 from 'uuid'
export class Todo {
    _id:string = v4();
    title: string = "";
    description: string = "";
    date: Date = new Date();
    status: string = "";

  constructor() {

  }

}

