(function() {
  var monitors = document.querySelectorAll(".monitors.has-children > .monitors-header");

  for (var i = 0; i < monitors.length; ++i) {
    monitors[i].addEventListener("click", function(event) {
      var parent = this.parentNode;
      var classList = parent.classList;
      var contentWrap = parent.querySelector(".monitors-content-wrap");
      if (classList.contains("open")) {
        classList.remove("open");
        contentWrap.style.maxHeight = 0;
      } else {
        classList.add("open");
        contentWrap.style.maxHeight =
        parent.querySelector(".monitors-content").clientHeight + "px";
      }
    });
  }
})();
