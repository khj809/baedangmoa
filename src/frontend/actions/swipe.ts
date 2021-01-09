export default function swipe(node: HTMLElement) {
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 0;

  function handleMousedown(event) {
    if (event.type.startsWith("touch")) {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    node.dispatchEvent(
      new CustomEvent("swipestart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mouseup", handleMouseup);
    window.addEventListener("touchend", handleMouseup);
    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("touchmove", handleMousemove);
  }

  function handleMousemove(event) {
    let _x = 0;
    let _y = 0;
    if (event.type.startsWith("touch")) {
      _x = event.touches[0].pageX;
      _y = event.touches[0].pageY;
    } else {
      _x = event.clientX;
      _y = event.clientY;
    }
    dx = _x - x;
    dy = _y - y;
  }

  function handleMouseup(event) {
    let horizontal = null;
    let vertical = null;
    if (dx > 0) {
      horizontal = "right";
    } else if (dx < 0) {
      horizontal = "left";
    }
    if (dy > 0) {
      vertical = "down";
    } else if (dy < 0) {
      vertical = "up";
    }

    dx = Math.abs(dx);
    dy = Math.abs(dy);
    if (dx > 0 || dy > 0) {
      node.dispatchEvent(
        new CustomEvent("swipeend", {
          detail: {
            horizontal,
            dx: Math.abs(dx),
            vertical,
            dy: Math.abs(dy),
          },
        })
      );
    }

    x = 0;
    y = 0;
    dx = 0;
    dy = 0;
    window.removeEventListener("mouseup", handleMouseup);
    window.removeEventListener("touchend", handleMouseup);
    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("touchmove", handleMousemove);
  }

  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("touchstart", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
      node.removeEventListener("touchstart", handleMousedown);
    },
  };
}
