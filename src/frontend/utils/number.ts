export function thousandSeparate(nStr: number | string) {
  nStr = nStr.toString();
  return nStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function range(begin, end, step) {
  function* iter_range(begin, end, step) {
    // Normalize our inputs
    step = step ? step : 1;

    if (typeof end === "undefined") {
      end = begin > 0 ? begin : 0;
      begin = begin < 0 ? begin : 0;
    }

    if (begin == end) {
      return;
    }

    if (begin > end) {
      step = step * -1;
    }

    for (let x = begin; x < end; x += step) {
      yield x;
    }
  }

  return Array.from(iter_range(begin, end, step));
}
