function getRect(element) {
    return {
      x: parseInt(element.style.left) || 0,
      y: parseInt(element.style.top) || 0,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  
  function isOverlapping(rect1, rect2) {
    return !(
      rect1.x + rect1.width < rect2.x ||
      rect2.x + rect2.width < rect1.x ||
      rect1.y + rect1.height < rect2.y ||
      rect2.y + rect2.height < rect1.y
    );
  }
  
  function generateNonOverlappingPosition(button, others, container) {
    const maxX = container.clientWidth - button.offsetWidth;
    const maxY = container.clientHeight - button.offsetHeight;
  
    let attempts = 0;
    while (attempts < 1000) {
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
  
      const newRect = getRect(button);
      let overlaps = false;
  
      for (const other of others) {
        if (other !== button) {
          const otherRect = getRect(other);
          if (isOverlapping(newRect, otherRect)) {
            overlaps = true;
            break;
          }
        }
      }
  
      if (!overlaps) break;
  
      attempts++;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
  
    const buttons = [btn1, btn2, btn3];
  
    [btn1, btn2].forEach(btn => {
      btn.addEventListener("click", () => {
        generateNonOverlappingPosition(btn, buttons, container);
      });
  
      btn.addEventListener("mouseenter", () => {
        generateNonOverlappingPosition(btn, buttons, container);
      });
    });
  
    // Başlangıçta da konumları ayarla (çakışmasız)
    [btn1, btn2].forEach(btn => {
      generateNonOverlappingPosition(btn, buttons, container);
    });
  });