const getEnumObject = baseObject =>
  new Proxy(baseObject, {
    get(target, property) {
      if (!Object.hasOwn(target, property)) {
        throw new Error(
          `'${property}' property does not exist in the '${target}' object`
        );
      }

      return target[property];
    },

    set(target, property, value) {
      throw new Error(`Cannot modify the '${target}' object`);
    }
  });

export { getEnumObject };
