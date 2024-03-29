// eslint-disable-next-line react/prop-types
const ContentCard = ({ content }) => {
  return (
    <div className="py-2 bg-white/40 rounded-xl px-3 animate-fade-left">
      {content}
    </div>
  );
};

export default ContentCard;
