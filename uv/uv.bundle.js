javascript
(function () {
  // Helper function to create an element with attributes
  var createElementWithAttributes = function (tag, attributes) {
    var element = document.createElement(tag);

    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    return element;
  };

  // Helper function to append a script
  var appendScript = function (src) {
    var script = createElementWithAttributes("script", {
      src: src,
      crossorigin: "anonymous",
    });
    document.body.appendChild(script);
  };

  var uv = {
    init: function () {
      this.loadStyles();
      this.loadScripts();
    },

    loadStyles: function () {
      var mainStyles = createElementWithAttributes("link", {
        rel: "stylesheet",
        href: "/uv/uv.styles.css",
      });

      document.head.appendChild(mainStyles);
    },

    loadScripts: function () {
      appendScript("/uv/uv.bundle.js");
      appendScript("https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js");
    },
  };

  uv.init();
})();
