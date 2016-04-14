var Formatter = (function() {
  var exports = {};

  // spec: https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#JAR_Manifest
  function parse(manifest) {
    var sectionStrings = manifest.split("\n\n");
    var sections = [];
    sectionStrings.forEach(function(sectionString) {
      sectionString += "\n";
      var re = /([A-Za-z0-9][A-Za-z0-9-_]+):(( [^\r\n]+(\r\n|\n|\r))+)/g;
      var headers = [];
      while ((match = re.exec(sectionString)) !== null) {
        var value = match[2].replace(/\n /g, '').trim();
        headers.push({ name: match[1], value: value });
      }
      sections.push(headers);
    });
    return sections;
  }

  function isPackage(headerName) {
    return headerName.indexOf("-Package") !== -1 || headerName === "Require-Bundle";
  }

  exports.format = function (manifest, formatPackages, sortPackages, sortHeaders) {
    var sections = parse(manifest);
    var result = "";
    sections.forEach(function(section) {
      if (sortHeaders) {
        section.sort(function(a, b) { return a.name.localeCompare(b.name); });
      }

      section.forEach(function(header) {
        if (formatPackages && isPackage(header.name)) {
          var packages = header.value.match(/([^,"]+|"[^"]*")+\s*/g).map(String.trim);
          if (sortPackages) {
            packages.sort();
          }
          var value = packages.join("\n ");
          result += header.name + ":\n " + value + "\n";
        } else {
          result += header.name + ": " + header.value + "\n";
        }
      });

      result += "\n";
    });
    return result;
  };

  return exports;
})();

document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector("#input");
  var output = document.querySelector("#output");
  var formatPackages = document.querySelector("#format-packages");
  var sortPackages = document.querySelector("#sort-packages");
  var sortHeaders = document.querySelector("#sort-headers");
  var setFormattedOutput = function() {
    output.value = Formatter.format(input.value, formatPackages.checked, sortPackages.checked, sortHeaders.checked);
  };
  input.addEventListener("input", setFormattedOutput);
  formatPackages.addEventListener("change", setFormattedOutput);
  sortPackages.addEventListener("change", setFormattedOutput);
  sortHeaders.addEventListener("change", setFormattedOutput);
});
