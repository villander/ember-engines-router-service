import Component from '@glimmer/component';
import { later, cancel } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service router;

  @tracked name = this.args.name;
  @tracked clickCount = 0;

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

  @action click() {
    this.clickCount++;
  }

  @action
  refresh() {
    this.router.refresh();
  }

  @action
  refreshRoute() {
    this.router.refresh('new');
  }

  @action
  refreshExternal() {
    this.router.refreshExternal('home');
  }
}
