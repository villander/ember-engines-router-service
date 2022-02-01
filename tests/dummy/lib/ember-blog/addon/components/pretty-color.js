import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class extends Component {
  get style() {
    return htmlSafe(`color: ${this.args.name}`);
  }
}
