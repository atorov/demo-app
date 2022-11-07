const Chat = () => (
    <>
        {/* TODO: */}
        <div className="chat-view-container" />

        <p>
            You are chatting as “
            {/* TODO: {name} */}
            ”
        </p>
        <div>
            <input
                // aria-label="Type a message"
                type="text"
                placeholder="Type a message"
                // autoFocus
                autoComplete="off"
            />

            <button
                aria-label="Send"
                type="button"
            >
                Send
            </button>
        </div>
    </>
)

export default Chat
