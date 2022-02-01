// Monkey patch Jest so that tests without an implementation are marked as `todo`.
const originalIt = global.it;

const wrappedIt = (description: string, func: () => void | Promise<void>) => {
  if (!func) {
    return originalIt.todo(description);
  }

  return originalIt(description, func);
};

// TODO: This proxy should be cast to the It interface. However, I'm currently unable to import that
// interface using @babel/preset-typescript.
global.it = new Proxy(wrappedIt, {
  get: (_target: unknown, prop: string) => {
    return originalIt[prop];
  }
}) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
