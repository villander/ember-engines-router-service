import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked clickCount = 0;

  @action click() {
    this.clickCount++;
  }
}
