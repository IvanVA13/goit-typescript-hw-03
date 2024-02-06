interface IKey {
  getSignature(): number;
}

class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.round(Math.random() * 10000000);
  }

  getSignature(): number {
    return this.signature;
  }
}

interface IPerson {
  getKey(): Key;
}

class Person implements IPerson {
  constructor(private key: Key) {
    this.key = key;
  }
  getKey(): Key {
    return key;
  }
}

abstract class House {
  protected door: boolean;
  protected tenants: IPerson[] = [];
  constructor(protected key: Key) {
    this.key = key;
    this.door = false;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }
  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
