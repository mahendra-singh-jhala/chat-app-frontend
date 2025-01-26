const ConversationUser = ({ conversation, isSelected, isOnline, onSelect }) => {
    return (
        <div>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""} overflow-auto`}
                onClick={() => onSelect(conversation)}
            >
                <div className="relative me-4">
                    <div className="w-12 rounded-full">
                        <img
                            src={conversation.profilePicture}
                            alt={`${conversation.firstname} ${conversation.lastname}`}
                        />
                        <span
                            className={`top-0 start-9 absolute w-3 h-3 rounded-full ${
                                isOnline ? "bg-green-600 border-2 border-gray-900" : ""
                            }`}
                        ></span>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">
                            {conversation.firstname} {conversation.lastname}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-b my-2 border-slate-400"></div>
        </div>
    );
};

export default ConversationUser;
