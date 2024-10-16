const MessageInput = ({message, setMessage, sendMessage}) => {
    return (
        <div className="d-flex">
            <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="form-control me-4"
            />
            <button onClick={sendMessage} className="btn btn-success"> Send </button>
        </div>
    )
}

export default MessageInput