const { ACTION, HANDLE_CHANGE_SEED, HANDLE_ADMIN_PASSWORD, HANDLE_ENABLE_ADMIN } = require("./actions");

const seed = Math.round(Math.random() * 1000000);
console.log(`• Seed: ${seed}`);

const PIN = "1358";
console.log(`• Admin password: ${PIN}`);

module.exports = (socket, io) => {
  console.log("Socket connected");

  socket.on("disconnect", (socket) => {
    console.log("Socket disconnected");
  });

  // Seed (to reload clients)
  socket.emit(ACTION, { type: HANDLE_CHANGE_SEED, payload: `${seed}` });

  // Login as Admin
  socket.on(HANDLE_ADMIN_PASSWORD, (payload) => {
    if (!socket.isAdmin && payload === `${PIN}`) {
      socket.isAdmin = true;
      socket.emit(ACTION, { type: HANDLE_ENABLE_ADMIN });
    }
  });
};
