var Formatter = (function() {
  var exports = {};

  // spec: https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#JAR_Manifest
  function parse(manifest) {
    var sectionStrings = manifest.split("\n\n");
    var sections = [];
    sectionStrings.forEach(sectionString => {
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

  function shouldFormat(name) {
    var names = ["Require-Bundle", "Bundle-ClassPath", "Embedded-Artifacts"];
    return name.indexOf("-Package") !== -1 || names.indexOf(name) !== -1;
  }

  exports.format = function (manifest, { sortHeaders, formatLists, sortLists, sortAttributes }) {
    var sections = parse(manifest);
    var result = "";
    sections.forEach(section => {
      if (sortHeaders) {
        section.sort((a, b) => a.name.localeCompare(b.name));
      }

      section.forEach(header => {
        if (formatLists && shouldFormat(header.name)) {
          var clauses = header.value.match(/([^,"]+|"[^"]*")+\s*/g)
              .map(s => s.trim());
          if (sortLists) {
            clauses.sort();
          }
          // https://docs.osgi.org/specification/osgi.core/7.0.0/framework.module.html#framework.common.header.syntax
          if (sortAttributes) {
            clauses = clauses.map(clause => clause.match(/([^;"]+|"[^"]*")+\s*/g)
                .sort().join(";"));
          }
          var value = clauses.join("\n ");
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

if (typeof exports !== 'undefined') {
  exports.format = Formatter.format;
}
