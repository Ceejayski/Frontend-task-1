/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
export default function findOcc(arr, key) {
  const results = [];

  arr.forEach((x) => {
    if (results.some((val) => val[key] === x[key])) {
      results.forEach((k) => {
        if (k[key] === x[key]) {
          k.occurrence++;
        }
      });
    } else {
      const a = {};
      a[key] = x[key];
      a.occurrence = 1;
      results.push(a);
    }
  });

  return results;
}
