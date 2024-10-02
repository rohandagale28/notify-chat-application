export const EmptyChatbox = ({ text }: { text: string }) => {
  return (
    <>
      <div className="chatbox-empty">
        <div className="chatbox-empty-title">{text}</div>
      </div>
    </>
  );
};
