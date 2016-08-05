window.onload = function() {
  var socket = io();
  var picker = document.getElementById("picker");

  picker.oninput = function() {
    socket.emit("select", this.value);
  };
};
