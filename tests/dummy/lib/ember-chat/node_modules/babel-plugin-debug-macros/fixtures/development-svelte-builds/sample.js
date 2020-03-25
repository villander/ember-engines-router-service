import { DEPRECATED_PARTIALS, DEPRECATED_CONTROLLERS } from '@ember/features';

export let PartialComponentManager;
if (DEPRECATED_PARTIALS) {
  PartialComponentManager = class {
    constructor() {
      this.isDone = true;
    }
  };
}

if (DEPRECATED_PARTIALS && someOtherThing()) {
  doStuff();
}

if (!DEPRECATED_PARTIALS && someOtherThing()) {
  doStuff2();
}

if (DEPRECATED_PARTIALS === false && someOtherThing()) {
  doStuff3();
}

export let ObjectController;
if (DEPRECATED_CONTROLLERS) {
  ObjectController = class {
    constructor() {
      this.isDoneAsWell = true;
    }
  };
}

export default class TheThingToReplaceControllers {
  constructor() {
    this.isNew = true;
  }
}