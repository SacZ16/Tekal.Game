function notSeen(array, array2, maxSize) {
    let array3=[]
    if (!maxSize || maxSize > array.length) {
      maxSize = array.length;
    }
    let count = 0;
    let i = 0;
    while ( count< maxSize && i < array.length ) {
      if (!array2.includes(array[i])) {
        array3.push(array[i]);
        count++;
      }
      i++;
    }
    return array3
  }
module.exports = { notSeen }