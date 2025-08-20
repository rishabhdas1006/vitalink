const initializeSignaling = (io) => {
	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on("join-room", (roomId) => {
			socket.join(roomId);
			socket.data.roomId = roomId;
			console.log(`User ${socket.id} joined room ${roomId}`);
			socket.to(roomId).emit("user-joined", { peerId: socket.id });
		});

		socket.on("offer", (payload) => {
			io.to(payload.target).emit("offer", {
				sdp: payload.sdp,
				callerId: socket.id,
			});
		});

		socket.on("answer", (payload) => {
			io.to(payload.target).emit("answer", {
				sdp: payload.sdp,
				responderId: socket.id,
			});
		});

		socket.on("ice-candidate", (payload) => {
			io.to(payload.target).emit("ice-candidate", {
				candidate: payload.candidate,
				senderId: socket.id,
			});
		});

		socket.on("disconnect", () => {
			console.log(`User disconnected: ${socket.id}`);
			const roomId = socket.data.roomId;
			if (roomId) {
				socket
					.to(roomId)
					.emit("user-disconnected", { peerId: socket.id });
			}
		});
	});
};

export default initializeSignaling;
