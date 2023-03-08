let validator = {};
/*
  parameters:
    i: int
    domain:
      raw int: '',
      options of int: [int],
      ranged int: {floor, ceil} (both inclusive)
  returns: true | false
*/
validator.validateInt = function(i, domain) {
  if (typeof i === 'number' &&
      i.toString().indexOf('.') < -1) {
    if (validator
        .validateObject(domain, ['floor', 'ceil'])) {
      return i >= domain.floor && i <= domain.ceil;
    } else if (validator.validateArray(domain, 'Int')) {
      return domain.includes(i);
    }
  }
  return false;
};
/*
  parameters:
    flt: float
    domain:
      raw float: '',
      options of float: [float],
      ranged float: {floor, ceil} (both inclusive)
  returns: true | false
*/
validator.validateFloat = function(flt, domain) {
  if (typeof flt === 'number') {
    if (validator
        .validateObject(domain, ['floor', 'ceil'])) {
      return flt >= domain.floor && flt <= domain.ceil;
    } else if (validator.validateArray(domain, 'Float')) {
      return domain.includes(flt);
    }
  }
  return false;
};
/*
  parameters:
    str: string
    type:
      raw string: '',
      filtered by regex string: 'regex',
      options of string: [string]
  returns: true | false
*/
validator.validateString = function(str, type) {
  if (typeof str === 'string') {
    if (typeof type === 'string') {
      if (type.length > 0) {
        return str.match(new RegExp(type, 'i'));
      } else {
        return true;
      }
    } else if (validator.validateArray(type, 'String')) {
      return type.includes(str);
    }
  }
  return false;
};
/*
    arr: array
    type:
      generic array: '',
      typed array: 'Type'
  parameters:
  returns: true | false
*/
validator.validateArray = function(arr, type) {
  if (Array.isArray(arr)) {
    if (typeof type === 'string' &&
        type.length > 0) {
      arr.every((a) => {
        return validator.validateByType(a, type);
      });
    } else {
      return true;
    }
  }
  return false;
};
/*
  parameters:
    obj: object
    keys:
      generic object: '',
      structured object: ['keys']
  returns: true | false
*/
validator.validateObject = function(obj, keys) {
  if (!!obj && typeof obj === 'object') {
    if (typeof keys === 'string' &&
        keys.length == 0) {
      return true;
    }
    if (validator.validateArray(keys, 'String')) {
      return keys.every((k) => {
        return Object.keys(obj).includes(k);
      });
    }
  }
  return false;
};
/*
  parameters:
    type: 'Int'
    acceptedValues:
      raw int: '',
      options of int: [int],
      ranged int: {floor, ceil} (both inclusive)
    type: 'Float'
    acceptedValues:
      raw float: '',
      options of float: [float],
      ranged float: {floor, ceil} (both inclusive)
    type: 'String'
    acceptedValues:
      raw string: '',
      filtered by regex string: 'regex',
      options of string: [string]
    type: 'Array'
    acceptedValues:
      generic array: '',
      typed array: 'type'
    type: 'Object'
    acceptedValues:
      generic object: '',
      structured object: ['keys']

  returns:  true | false
*/
validator.validateByType = function(
  value, type, acceptedValues = '') {
  if (type === 'ByType') return false;
  let fn = 'validate' + type;
  if (fn in validator && typeof validator[fn] === 'function') {
    return validator[fn](value, acceptedValues);
  }
  return false;
};

module.exports = validator;
