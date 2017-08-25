import { BaseEntity } from './../../shared';

const enum Sex {
    'BOY',
    'GIRL'
}

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public nickname?: string,
        public avatar?: string,
        public age?: number,
        public sex?: Sex,
        public email?: string,
        public mobilePhoneNumber?: string,
        public todos?: BaseEntity[],
    ) {
    }
}
