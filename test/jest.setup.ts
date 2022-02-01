// Monkey patch Jest so that tests without an implementation are marked as `todo`.
const it = global.it;

const wrappedIt = (description, func) => {
  if (!func) {
    return it.todo(description);
  }

  return it(description, func);
};

global.it = new Proxy(wrappedIt, {
  get: (target, prop) => {
    return it[prop];
  }
});
