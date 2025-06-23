// utils/TestUser.ts
import { nanoid } from 'nanoid';

export class TestUser {
    username: string;
    email: string;
    password: string;

    constructor(passwordLength? : number) {
        this.username = 'testuser_' + nanoid();
        this.email = this.username + '@gmail.com';
        this.password = passwordLength ? nanoid(passwordLength) : nanoid(12);
    }

    log() {
        console.log('🧪 Test Data:');
        console.log(`Username: ${this.username}`);
        console.log(`Email: ${this.email}`);
        console.log(`Password: ${this.password}`);
    }
}
