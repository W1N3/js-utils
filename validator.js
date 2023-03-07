let V = {};
/*
  parameters:
    type: int
    acceptedValues:
      raw int: '',
      options of int: [int],
      ranged int: {floor, ceil} (both inclusive)
  returns: true | false
*/
V.validateInt = function(i, domain) {
  if (typeof i === 'number' &&
      i.toString().indexOf('.') < -1) {
    if (V
        .validateObject(domain, ['floor', 'ceil'])) {
      return i >= domain.floor && i <= domain.ceil;
    } else if (V.validateArray(domain, 'int')) {
      return domain.includes(i);
    }
  } else {
    return false;
  }
};
/*
  parameters:
    type: float
    acceptedValues:
      raw float: '',
      options of float: [float],
      ranged float: {floor, ceil} (both inclusive)
  returns: true | false
*/
V.validateFloat = function(flt, domain) {
  if (typeof i === 'number') {
    if (V
        .validateObject(domain, ['floor', 'ceil'])) {
      return i >= domain.floor && i <= domain.ceil;
    } else if (V.validateArray(domain, 'float')) {
      return domain.includes(i);
    }
  } else {
    return false;
  }
};
/*
  parameters:
    type: string
    acceptedValues:
      raw string: '',
      filtered by regex string: 'regex',
      options of string: [string]
  returns: true | false
*/
V.validateString = function(str, type) {
  if (typeof str === 'string') {
    if (typeof type === 'string') {
      return value.match(new RegExp(regex, 'i'));
      if (type.length > 0) {
      } else {
        return true;
      }
    } else if (V.validateArray(type, 'string')) {
      return type.includes(str);
    }
  } else {
    return false;
  }
};
/*
  parameters:
  returns: true | false
*/
V.validateArray = function(arr, type) {
  if (Array.isArray(arr)) {
    if (typeof type === 'string' &&
        type.length > 0) {
      arr.every((a) => {
        if (type === 'int') {
          return V.validateInt(a, '');
        } else if (type === 'float') {
          return V.validateFloat(a, '');
        } else if (type === 'string') {
          return V.validateString(a, '');
        }
      }); 
    } else {
      return true;
    }
  }
};
/*
  parameters:
    type: object
    acceptedValues:
      generic object: '',
      structured object: ['keys']
  returns: true | false
*/
V.validateObject = function(obj, keys) {
  if (!!obj && typeof obj === 'object') {
    if(V.validateArray(keys, 'string')) {
      keys.every((k) => {
        return Object.keys(obj).includes(k);
      });
    }
    return boolCheck;
  }
};
/*
  parameters:
    type: int
    acceptedValues:
      raw int: '',
      options of int: [int],
      ranged int: {floor, ceil} (both inclusive)
    type: float
    acceptedValues:
      raw float: '',
      options of float: [float],
      ranged float: {floor, ceil} (both inclusive)
    type: string
    acceptedValues:
      raw string: '',
      filtered by regex string: 'regex',
      options of string: [string]
    type: array
    acceptedValues:
      generic array: '',
      typed array: 'type'
    type: object
    acceptedValues:
      generic object: '',
      structured object: ['keys']

  returns:  true | false
*/
V.genericValidator = function(value, type, acceptedValues = '') {
  if (type === 'object') {
    return V.validateObject(value, acceptedValues);
  } else if (type === 'int') {
    return V.validateInt(value, acceptedValues);
  } else if (type === 'float') {
    return V.validateFloat(value, acceptedValues);
  } else if (type === 'string') {
    return V.validateString(value, acceptedValues);
  } else if (type === 'array') {
    return V.validateArray(value, acceptedValues);
  }
};
return V;

module.exports = V;
