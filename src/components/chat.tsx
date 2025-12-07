import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const c = useChat();

  const handleSubmit = (x) => {
    alert(x);
  };

  return (
    <div>
      {c.messages.map((message) => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <span key={index}>{part.text}</span>;

              // other cases can handle images, tool calls, etc
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Send a message..."
          // onChange={handleInputChange}
          // disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
