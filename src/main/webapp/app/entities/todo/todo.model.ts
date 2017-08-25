import { BaseEntity } from './../../shared';

const enum State {
    'SELECT_FOR_DEVELOPER',
    'BACKLOG',
    'IN_PROGRESS',
    'DONE'
}

export class Todo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public startTime?: any,
        public endTime?: any,
        public state?: State,
        public customer?: BaseEntity,
    ) {
    }
}
