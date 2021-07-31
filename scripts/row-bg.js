// a thing to make some components have an equal height in the same row

export const checkRowBgs = function() {
  window.addEventListener('load', () => {
    var columnWrappers = document.querySelectorAll('.column-splitter');
    if (columnWrappers) {
      // go through all the column splitters and see if there's a match for the pod being checked
      for (var splitter = 0; splitter < columnWrappers.length; splitter++) {
        // also check if this should have a bg colour on the outer row?
        var colouredPods = columnWrappers[splitter].querySelectorAll(".row-bg");
        if (colouredPods.length > 0) {
          var colour = "row-bg--blue";
          if (colouredPods[0].classList.contains("row-bg--grey")) {
            colour = "row-bg--grey";
          }
          if (colouredPods[0].classList.contains("row-bg--darkBlue")) {
            colour = "row-bg--darkBlue";
          }
          setRowBG(columnWrappers[splitter], colour);
        }
      }
    }

    function setRowBG(whichRow, colour) {
      var row = whichRow;
      row.classList.add("columns","row-bg",colour);

      var original = row;
      var wrapper = document.createElement("div");
      wrapper.className = "component-content";
      var secondWrapper = document.createElement("div");
      secondWrapper.className = "splitter-wrapper";

      while (original.firstChild) {
          secondWrapper.appendChild(original.firstChild);
      }
      wrapper.appendChild(secondWrapper);
      original.appendChild(wrapper);

    }

  });

}
