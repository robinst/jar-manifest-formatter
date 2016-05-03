document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector("#input");
  var output = document.querySelector("#output");
  var formatLists = document.querySelector("#format-lists");
  var sortLists = document.querySelector("#sort-lists");
  var sortHeaders = document.querySelector("#sort-headers");
  var setFormattedOutput = function() {
    output.value = Formatter.format(input.value, formatLists.checked, sortLists.checked, sortHeaders.checked);
  };
  input.addEventListener("input", setFormattedOutput);
  formatLists.addEventListener("change", setFormattedOutput);
  sortLists.addEventListener("change", setFormattedOutput);
  sortHeaders.addEventListener("change", setFormattedOutput);
});
