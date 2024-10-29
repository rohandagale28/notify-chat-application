export const EmptyChatbox = ({ text }: { text: string }) => {
  return (
    <>
      <div className="flex flex-col justify-center align-center h-full items-center w-full">
        <div className="chatbox-empty-title">{text}</div>
      </div>
    </>
  );
};
