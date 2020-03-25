import Bar from 'bar';
import Baz from 'baz';
export default class extends Bar {
  static create() {
    return new Baz(new this());
  }

}