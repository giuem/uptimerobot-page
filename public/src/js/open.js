(function() {
  var monitors = document.querySelectorAll(".monitors.has-children");

  for (var i = 0; i < monitors.length; ++i) {
    monitors[i].addEventListener("click", function(event) {
      var classList = this.classList;
      var contentWrap = this.querySelector(".monitors-content-wrap");
      if (classList.contains("open")) {
        classList.remove("open");
        contentWrap.style.maxHeight = 0;
      } else {
        classList.add("open");
        contentWrap.style.maxHeight =
          this.querySelector(".monitors-content").clientHeight + "px";
      }
    });
  }
})();
