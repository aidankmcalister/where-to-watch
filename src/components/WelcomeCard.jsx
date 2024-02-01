import ContentCard from "./ContentCard";
import { DividingLine } from "./ServiceProviderContainer";

const WelcomeCard = () => {
  return (
    <ContentCard
      content={
        <div className="pt-1.5">
          <DividingLine />
          <h3 className="text-lg my-6 font-medium min-w-60 flex flex-col items-center">
            Welcome to <br />
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              WhereToWatch.io
            </span>
          </h3>
          <DividingLine />
          <p className="text-center mt-3">
            Start searching to find where
            <br /> to stream your favorite show!{" "}
          </p>
        </div>
      }
    />
  );
};

export default WelcomeCard;
