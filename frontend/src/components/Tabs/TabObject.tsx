import { v4 as uuid } from 'uuid';

export default abstract class TabObject {
    id: string = uuid();
}