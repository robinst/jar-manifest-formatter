document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector("#input");
  var output = document.querySelector("#output");
  var sortHeaders = document.querySelector("#sort-headers");
  var formatLists = document.querySelector("#format-lists");
  var sortLists = document.querySelector("#sort-lists");
  var sortAttributes = document.querySelector("#sort-attributes");
  var setFormattedOutput = function() {
    output.value = Formatter.format(input.value, {
      sortHeaders: sortHeaders.checked,
      formatLists: formatLists.checked,
      sortLists: sortLists.checked,
      sortAttributes: sortAttributes.checked,
    });
  };
  input.addEventListener("input", setFormattedOutput);
  sortHeaders.addEventListener("change", setFormattedOutput);
  formatLists.addEventListener("change", setFormattedOutput);
  sortLists.addEventListener("change", setFormattedOutput);
  sortAttributes.addEventListener("change", setFormattedOutput);
});
