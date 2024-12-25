const MessageUser = ({ message, auth, selectedConversation }) => {
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        return date.toLocaleTimeString(undefined, options);
    };

    const fromMe = message.senderId === auth.user?.userId;
    const chatClassName = fromMe ? "items-end justify-end" : "items-start";
    const profilePicture = fromMe ? auth.user.profilePicture : selectedConversation.profilePicture;
    const chatColor = fromMe ? "bg-sky-500" : "bg-gray-900";

    return (
        <div className="flex flex-col">
            <div className={`flex gap-2 ${chatClassName}`}>
                {!fromMe && (
                    <img className="w-10 h-10 rounded-full" src={profilePicture} alt="User image" />
                )}
                <div
                    className={`flex flex-col max-w-[75%] py-2 px-4 rounded-lg shadow-md ${
                        fromMe ? "rounded-br-none" : "rounded-tl-none"
                    } ${chatColor}`}
                >
                    <p className="text-sm text-white">{message.message}</p>
                </div>
                {fromMe && (
                    <img className="w-10 h-10 rounded-full" src={profilePicture} alt="User image" />
                )}
            </div>
            <span
                className={`text-[9px] text-gray-200 ${
                    fromMe ? "self-end me-12" : "self-start ms-12"
                } mt-1`}
            >
                {formatTime(message.createdAt)}
            </span>
        </div>
    );
};

export default MessageUser;
