import { later, cancel } from '@ember/runloop';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked name = this.args.name;

  constructor() {
    super(...arguments);

    this._later = later(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      this.name = 'Jerry';
    }, 50);
  }

  willDestroy() {
    cancel(this._later);
    super.willDestroy(...arguments);
  }
}
