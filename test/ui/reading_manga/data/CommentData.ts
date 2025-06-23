import { nanoid } from 'nanoid';

export class TestComment {
    comment: string

    constructor(length? : number) {
        this.comment = length ? nanoid(length) : nanoid(12);
    }

    log() {
        console.log('🧪 Test Data:');
        console.log(`Comment: ${this.comment}`);
    }
}