import Message from "../Message/Message";
import EmptyState from "../EmptyState/EmptyState";

const MessagesArea = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-950">
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessagesArea;
