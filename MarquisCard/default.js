document.addEventListener("DOMContentLoaded", function() {
  [].slice
    .call(document.querySelectorAll(".c-banner__copy"))
    .forEach(function(el, i, list) {
      setTimeout(function() {
        el.classList.remove("u-hide");

        if (i !== list.length - 1) {
          setTimeout(function() {
            el.classList.add("u-hide");
          }, 3e3);
        }
      }, 4e3 * i);
    });
});
