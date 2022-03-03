const isJSONString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const read = (key) => {
  const value = localStorage.getItem(key);
  return isJSONString(value) ? JSON.parse(value) : value;
};

export const create = (key, value) => {
  try {
    // Cannot create a key that already exists
    const alreadyExists = read(key);
    if (alreadyExists) return null;

    // Handle the case that the value is an object
    const parsedValue =
      typeof value === "object" ? JSON.stringify(value) : value;

    // Save the parsed value and return it to prove it worked
    localStorage.setItem(key, parsedValue);
    return parsedValue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const set = (key, value) => {
  try {
    // Handle the case that the value is an object
    const parsedValue =
      typeof value === "object" ? JSON.stringify(value) : value;

    // Save the parsed value and return it to prove it worked
    localStorage.setItem(key, parsedValue);
    return parsedValue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const push = (key, value) => {
  try {
    // Cannot update on a key that doesn't already exist
    const existingValue = read(key);
    const isArray = Array.isArray(existingValue);
    if (!existingValue || !isArray) return null;

    const newValue = [...existingValue, value];
    localStorage.setItem(key, JSON.stringify(newValue));
    return newValue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const filter = (key, cb) => {
  try {
    // Cannot update on a key that doesn't already exist
    const existingValue = read(key);
    const isArray = Array.isArray(existingValue);
    if (!existingValue || !isArray) return null;

    const newValue = existingValue.filter(cb);
    localStorage.setItem(key, JSON.stringify(newValue));
    return newValue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const remove = (key) => {
  try {
    // Cannot delete a key that doesn't already exist
    const alreadyExists = read(key);
    if (!alreadyExists) return null;

    // Delete the key/value
    localStorage.removeItem(key);
    return "";
  } catch (err) {
    console.error(err);
    return null;
  }
};
