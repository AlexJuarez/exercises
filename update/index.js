const duplicate = (obj) => {
  if (Array.isArray(obj)) {
    return obj.slice();
  }

  if (typeof obj === "object" && obj) {
    return Object.assign({}, obj);
  }

  return obj;
};

const commands = {
  $push: (obj, val) => obj.push.apply(obj, val) && obj,
  $unshift: (obj, val) => obj.unshift.apply(obj, val) && obj,
  $splice: (obj, val) => val.map(v => obj.splice.apply(obj, v)) && obj,
  $set: (obj, val) => val,
  $merge: (obj, val) => Object.assign(obj, val),
  $apply: (obj, val) => val(obj)
};

module.exports = update = (obj, command) => {
  const keys = Object.keys(command);
  const copy = duplicate(obj);

  for (let key of keys) {
    const val = command[key];

    if(commands.hasOwnProperty(key)) {
      return commands[key](copy, val);
    } else {
      copy[key] = update(copy[key], val);
    }
  }

  return copy;
};
