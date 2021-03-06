/**
 * @description Function to filter the first object of the object group with prop in an array of objects
 */
const filterArrObjFirst = (arrObj, prop) => {
  let arrObjNext = [];
  const keys = Object.keys(arrObj[0]);

  arrObj.forEach((obj) => {
    const propName = obj[prop];
    const isTrueFalse = arrObjNext.every((item) => !item[propName]);
    if (isTrueFalse === true) {
      arrObjNext.push({
        ...obj,
        [propName]: true,
      });
    }
  });
  arrObjNext = arrObjNext.map((item) => {
    const objNext = {};
    keys.forEach((key) => {
      objNext[key] = item[key];
    });
    return objNext;
  });

  return arrObjNext;
};

const empty = (mixedVar) => {
  // console.info('empty', { mixedVar })
  if (!mixedVar || mixedVar === "0") {
    return true;
  }

  if (typeof mixedVar === "object") {
    for (var k in mixedVar) {
      return false;
    }
    return true;
  }

  if (
    typeof mixedVar === "object" &&
    Array.isArray(mixedVar) === false &&
    mixedVar.length === 0
  ) {
    return true;
  } else if (Array.isArray(mixedVar) === true && mixedVar.length > 0) {
    return false;
  }
  return false;
};

const mixedVarToArray = (mixedVar) => {
  let output;
  if (mixedVar === undefined) {
    output = [];
  } else if (typeof mixedVar === "string") {
    output = [mixedVar];
  } else {
    output = mixedVar;
  }
  return output;
};

const array_merge = (dataNext, data) => {
  const dataNext1 = mixedVarToArray(dataNext);
  const data1 = mixedVarToArray(data);
  // console.info('array_merge', { dataNext1, data1, dataNext, data })
  return [...data1, ...dataNext1];
};

const array_unique = (data) => {
  // console.info('array_unique', data)
  return [...new Set(data)];
};

const array_filter = (data, param) => {
  return data.filter((item) => item.length > 0);
};

export const getArrToSave = (record, dataInp, caseOption, prop) => {
  const record0 = record && record[0] ? record[0] : "";
  const dataInp0 = dataInp && dataInp[0] ? dataInp[0] : "";
  let dataNext;
  let dataNext0;

  if (caseOption === "add") {
    // console.info('getArrToSave2 [0]', { record0, 'empty(record0)': empty(record0), dataInp0, 'empty(dataInp0)': empty(dataInp0), dataInp, record })
    if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = [];
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record;
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp;
    } else if (empty(record0) === false && empty(dataInp0) === false) {
      dataNext = array_merge(record, dataInp);
      // console.info('getArrToSave [5]', { dataNext, dataInp, record })
      dataNext = array_unique(dataNext);
      // console.info('getArrToSave [6]', { dataNext })
      if (prop && prop !== "" && dataInp0[prop]) {
        dataNext = filterArrObjFirst(dataNext, prop);
      }
    }
  } else if (caseOption === "max") {
    // console.info('getArrToSave2 [0]', { record0, 'empty(record0)': empty(record0), dataInp0, 'empty(dataInp0)': empty(dataInp0), dataInp, record })
    if (empty(record0) === true && empty(dataInp0) === true) {
      dataNext = [];
    } else if (empty(record0) === true && empty(dataInp0) === false) {
      dataNext = dataInp;
    } else if (empty(record0) === false && empty(dataInp0) === true) {
      dataNext = record0;
    } else if (empty(record0) === false && empty(dataInp0) === false) {
      dataNext0 = record0;
      const { level: levelPrev } = record0;
      const { level: levelNext } = dataInp0;
      if (levelPrev < levelNext) {
        dataNext0 = dataInp0;
      }

      dataNext = [dataNext0];
    }
  }

  return dataNext;
};