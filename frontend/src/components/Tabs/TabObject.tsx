// import { v4 as uuid } from 'uuid';

export default abstract class TabObject {
    id: number = Math.floor(Math.random() * 99);
    // id: string = uuid();
}