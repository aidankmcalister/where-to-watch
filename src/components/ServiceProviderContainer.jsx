/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard";
import { StarIcon } from "@heroicons/react/24/solid";

const ProviderItem = ({ name, logoPath }) => (
  <li className="rounded-lg flex flex-col first:ml-0 last:mr-0 mx-1 items-center">
    <img
      src={`https://image.tmdb.org/t/p/original${logoPath}`}
      alt={name}
      className="w-16 rounded-lg"
    />
  </li>
);

export const DividingLine = ({ displayType }) => (
  <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div
      className={`${
        displayType === "mobile" ? "h-0.5" : "h-1"
      } w-full h-0.5 mb-1.5 bg-white/50`}></div>
  </div>
);

const ServiceProviderContainer = ({ media, providers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [providersForUS, setProvidersForUS] = useState({
    flatrate: [],
    rent: [],
    buy: [],
  });

  useEffect(() => {
    function getAllProvidersForUS(providersData) {
      if (!providersData) {
        console.log("No data available.");
        return { flatrate: [], rent: [], buy: [] };
      }

      const countryData = providersData["US"];

      if (!countryData) {
        console.log("No data available for the specified country code: US");
        return { flatrate: [], rent: [], buy: [] };
      }

      const allProviders = { flatrate: [], rent: [], buy: [] };

      ["flatrate", "rent", "buy"].forEach((providerType) => {
        if (countryData[providerType]) {
          countryData[providerType].forEach((provider) => {
            if (provider.provider_name && provider.logo_path) {
              allProviders[providerType].push({
                name: provider.provider_name,
                logoPath: provider.logo_path,
              });
            }
          });
        }
      });

      return allProviders;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const allProviders = await getAllProvidersForUS(providers);
      setProvidersForUS(allProviders);
      setIsLoading(false);
    };

    fetchData();
  }, [providers]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="hidden lg:block w-[65rem]">
        <ContentCard
          content={
            <div className="flex">
              {media.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
                  alt={media.title || media.name}
                  className="rounded-lg w-[500px]"
                />
              ) : (
                <img
                  src="https://placehold.co/2000x3000"
                  alt={media.title || media.name}
                  className="rounded-lg w-[500px]"
                />
              )}
              <div className="w-full border-black mx-4">
                <ContentCard
                  content={
                    <div className="flex justify-between text-gray-700 ">
                      <div>
                        <h3 className="font-semibold text-3xl">
                          {media.title || media.name}
                        </h3>
                        <DividingLine />
                        {(media.first_air_date || media.release_date) && (
                          <p>
                            {media.first_air_date
                              ? media.first_air_date.substring(0, 4)
                              : media.release_date.substring(0, 4)}
                          </p>
                        )}
                      </div>
                      <div className="font-semibold ml-3 whitespace-nowrap flex items-start">
                        <div className="font-semibold flex items-start">
                          <p>
                            {media.vote_average
                              ? media.vote_average.toFixed(1)
                              : "N/A"}{" "}
                            / 10
                          </p>
                          <StarIcon className="w-4 text-yellow-500 ml-1 self-center" />
                        </div>
                      </div>
                    </div>
                  }
                />
                <ContentCard
                  content={
                    <div>
                      <h2 className="text-xl font-semibold text-gray-700">
                        Subscription
                      </h2>
                      <DividingLine />
                      <ul className="flex flex-wrap">
                        {providersForUS.flatrate.map((provider) => (
                          <ProviderItem
                            key={provider.name}
                            name={provider.name}
                            logoPath={provider.logoPath}
                          />
                        ))}
                      </ul>
                      {providersForUS.flatrate.length === 0 && (
                        <p className="text-gray-500 font-light">
                          No subscription options found
                        </p>
                      )}
                    </div>
                  }
                />
                <ContentCard
                  content={
                    <div>
                      <h2 className="mb-1 text-xl font-semibold text-gray-700">
                        Rent
                      </h2>
                      <DividingLine />
                      <ul className="flex flex-wrap">
                        {providersForUS.rent.map((provider) => (
                          <ProviderItem
                            key={provider.name}
                            name={provider.name}
                            logoPath={provider.logoPath}
                          />
                        ))}
                      </ul>
                      {providersForUS.rent.length === 0 && (
                        <p className="text-gray-500 font-light">
                          No rent options found
                        </p>
                      )}
                    </div>
                  }
                />
                <ContentCard
                  content={
                    <div>
                      <h2 className="mb-1 text-xl font-semibold text-gray-700">
                        Buy
                      </h2>
                      <DividingLine />
                      <ul className="flex flex-wrap">
                        {providersForUS.buy.map((provider) => (
                          <ProviderItem
                            key={provider.name}
                            name={provider.name}
                            logoPath={provider.logoPath}
                          />
                        ))}
                      </ul>
                      {providersForUS.buy.length === 0 && (
                        <p className="text-gray-500 font-light">
                          No buy options found
                        </p>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
          }
        />
      </div>

      <div className="lg:hidden">
        <ContentCard
          content={
            <div className="my-1">
              {media.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
                  alt={media.title || media.name}
                  className="rounded-lg"
                />
              ) : (
                <img
                  src="https://placehold.co/3840x2160"
                  alt={media.title || media.name}
                  className="rounded-lg"
                />
              )}
              <ContentCard
                content={
                  <div className="flex justify-between text-gray-700 ">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {media.title || media.name}
                      </h3>
                      <DividingLine />
                      {(media.first_air_date || media.release_date) && (
                        <p>
                          {media.first_air_date
                            ? media.first_air_date.substring(0, 4)
                            : media.release_date.substring(0, 4)}
                        </p>
                      )}
                    </div>
                    <div className="font-semibold ml-3 whitespace-nowrap flex items-start">
                      <div className="font-semibold flex items-start">
                        <p>
                          {media.vote_average
                            ? media.vote_average.toFixed(1)
                            : "N/A"}{" "}
                          / 10
                        </p>
                        <StarIcon className="w-4 text-yellow-500 ml-1 self-center" />
                      </div>
                    </div>
                  </div>
                }
              />
              <ContentCard
                content={
                  <div>
                    <h2 className="text-lg font-medium text-gray-700">
                      Subscription
                    </h2>
                    <DividingLine displayType="mobile" />
                    <ul className="flex flex-wrap">
                      {providersForUS.flatrate.map((provider) => (
                        <ProviderItem
                          key={provider.name}
                          name={provider.name}
                          logoPath={provider.logoPath}
                        />
                      ))}
                    </ul>
                    {providersForUS.flatrate.length === 0 && (
                      <p className="text-gray-500 font-light">
                        No subscription options found
                      </p>
                    )}
                  </div>
                }
              />
              <ContentCard
                content={
                  <div>
                    <h2 className="mb-1 text-lg font-medium text-gray-700">
                      Rent
                    </h2>
                    <DividingLine displayType="mobile" />
                    <ul className="flex flex-wrap">
                      {providersForUS.rent.map((provider) => (
                        <ProviderItem
                          key={provider.name}
                          name={provider.name}
                          logoPath={provider.logoPath}
                        />
                      ))}
                    </ul>
                    {providersForUS.rent.length === 0 && (
                      <p className="text-gray-500 font-light">
                        No rent options found
                      </p>
                    )}
                  </div>
                }
              />
              <ContentCard
                content={
                  <div>
                    <h2 className="mb-1 text-lg font-medium text-gray-700">
                      Buy
                    </h2>
                    <DividingLine displayType="mobile" />
                    <ul className="flex flex-wrap">
                      {providersForUS.buy.map((provider) => (
                        <ProviderItem
                          key={provider.name}
                          name={provider.name}
                          logoPath={provider.logoPath}
                        />
                      ))}
                    </ul>
                    {providersForUS.buy.length === 0 && (
                      <p className="text-gray-500 font-light">
                        No buy options found
                      </p>
                    )}
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ServiceProviderContainer;
