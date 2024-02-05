/* eslint-disable react/prop-types */
import ContentCard from "./ContentCard";
import FeaturedTVList from "./FeaturedTVList";
import FeaturedMoviesList from "./FeaturedMoviesList";
import { DividingLine } from "./ServiceProviderContainer";

const WelcomeCard = ({ handleSelectPassdown }) => {
  return (
    <div className="pt-1.5 md:w-[75vw] max-w-[95vw]">
      <ContentCard
        content={
          <div>
            <DividingLine />
            <h3 className="text-lg lg:text-xl mt-10 mb-7 font-medium min-w-60 flex flex-col items-center">
              Welcome to <br />
              <span className="text-3xl lg:text-7xl font-josefin bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-2 lg:pt-3">
                WhereToWatch.fyi
              </span>
            </h3>
            <div className="w-fit mx-auto mb-8">
              <ContentCard
                content={
                  <p className="text-center lg:text-lg">
                    Start searching to find where
                    <br /> to stream your favorite show!
                  </p>
                }
              />
            </div>
            <div className="mt-7">
              <h1 className="text-xl font-semibold font-josefin">
                Popular Movies
              </h1>
              <DividingLine />
              <FeaturedMoviesList handleSelect={handleSelectPassdown} />
            </div>
            <div className="mt-7">
              <h1 className="text-xl font-semibold font-josefin">
                Popular TV Shows
              </h1>
              <DividingLine />
              <FeaturedTVList handleSelect={handleSelectPassdown} />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default WelcomeCard;
