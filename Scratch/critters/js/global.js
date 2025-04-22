window.goToPage = function (passageName) {
  window.SugarCube.Engine.play(passageName);
};
// return [0, max)
window.getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
// in-place
window.shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
window.batteryUpdate = (battery, fill = null, max = null) => {
  var max = battery.getAttribute("data-max");
  var fill = battery.getAttribute("data-fill");

  // if no max, default to percent of 100
  var perc = Math.min(max ? (fill / max) * 100 : fill, 100);

  if (!isNaN(fill)) {
    for (let child of battery.children) {
      child.style.height = perc + "%";
    }
  }
};

window.getDiceRoll = (availableResults) => {
  if (availableResults === undefined) return 1 + window.getRandomInt(6);
  return availableResults[window.getRandomInt(availableResults.length)];
};

window.capitalizeFirstLetter = (text) =>
  text.substr(0, 1).toUpperCase() + text.substr(1);

// checkFunc: return true to pass, false to reject
// onSuccessFunc: runs on successful drop
window.addDrag = function (onSuccessFunc, checkFunc) {
  let dragged;

  /* events fired on the draggable target */
  const sources = document.getElementsByClassName("draggable");
  for (let source of sources) {
    // using 'on' to only set once
    source.ondragstart = (event) => {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.classList.add("dragging");
    };

    source.ondragend = (event) => {
      // reset the transparency
      event.target.classList.remove("dragging");
    };
  }

  /* events fired on the drop targets */
  const targets = document.getElementsByClassName("drop-target");
  for (let target of targets) {
    target.ondragover = (event) => {
      // prevent default to allow drop
      event.preventDefault();
    };

    target.ondragenter = (event) => {
      // highlight potential drop target when the draggable element enters it
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("dragover");
      }
    };

    target.ondragleave = (event) => {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    };

    target.ondrop = (event) => {
      if (!dragged) return;
      // prevent default action (open as link for some elements)
      event.preventDefault();
      if (checkFunc !== undefined && !checkFunc(dragged, event.target)) return;
      // move dragged element to the selected drop target
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
        event.target.appendChild(dragged);
        onSuccessFunc(event.target, dragged);
      }
    };
  }
};
