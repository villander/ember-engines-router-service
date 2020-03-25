export let PartialComponentManager;

if (false
/* DEPRECATED_PARTIALS */
) {
  PartialComponentManager = class {
    constructor() {
      this.isDone = true;
    }

  };
}

if (false
/* DEPRECATED_PARTIALS */
&& someOtherThing()) {
  doStuff();
}

if (!false
/* DEPRECATED_PARTIALS */
&& someOtherThing()) {
  doStuff2();
}

if (false
/* DEPRECATED_PARTIALS */
=== false && someOtherThing()) {
  doStuff3();
}

export let ObjectController;

if (true
/* DEPRECATED_CONTROLLERS */
) {
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