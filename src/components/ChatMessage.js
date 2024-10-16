const ChatMessage = ({user, message}) => {
    return (
        <div>
            <p> <strong> {user} : </strong> <em className="text-white fw-bold"> {message} </em> </p>
        </div>
    )
}

export default ChatMessage