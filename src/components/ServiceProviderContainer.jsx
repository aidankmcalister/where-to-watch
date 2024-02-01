/* eslint-disable react/prop-types */
import ContentCard from "./ContentCard";
import { StarIcon } from "@heroicons/react/24/solid";

const ProviderItem = ({ name, logoPath }) => (
  <li className="rounded-lg flex flex-col first:ml-0 last:mr-0 mx-1 items-center">
    <img
      src={`https://image.tmdb.org/t/p/w200${logoPath}`}
      alt={name}
      className="w-16 rounded-lg"
    />
    {/* <h1>{name}</h1> */}
  </li>
);

const DividingLine = () => (
  <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="w-full h-0.5 mb-1.5 bg-white/50"></div>
  </div>
);

const ServiceProviderContainer = ({ media, providers }) => {
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

  const providersForUS = getAllProvidersForUS(providers);
  console.log(media);
  return (
    <ContentCard
      content={
        <div className="my-1">
          {media.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`}
              alt={media.title || media.name}
              className="rounded-lg lg:hidden"
            />
          ) : (
            <img
              src="https://placehold.co/3840x2160"
              alt={media.title || media.name}
              className="rounded-lg lg:hidden"
            />
          )}
          <ContentCard
            content={
              <div className="flex justify-between text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg">
                    {media.title || media.name}
                  </h3>
                  <DividingLine />
                  {media.first_air_date ? (
                    <p>{media.first_air_date.substring(0, 4)}</p>
                  ) : (
                    <p>{media.release_date.substring(0, 4)}</p>
                  )}
                </div>
                <div className="font-semibold flex items-start">
                  <div className="font-semibold flex items-start">
                    <p>{media.vote_average.toFixed(1)} / 10</p>
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
                  Subscriptions
                </h2>
                <DividingLine />
                {providersForUS.flatrate.length > 0 ? (
                  <ul className="flex">
                    {providersForUS.flatrate.map((provider) => (
                      <ProviderItem
                        key={provider.name}
                        name={provider.name}
                        logoPath={provider.logoPath}
                      />
                    ))}
                  </ul>
                ) : (
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
                <h2 className="mb-1 text-lg font-medium text-gray-700">Rent</h2>
                <DividingLine />
                {providersForUS.rent.length > 0 ? (
                  <ul className="flex">
                    {providersForUS.rent.map((provider) => (
                      <ProviderItem
                        key={provider.name}
                        name={provider.name}
                        logoPath={provider.logoPath}
                      />
                    ))}
                  </ul>
                ) : (
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
                <h2 className="mb-1 text-lg font-medium text-gray-700">Buy</h2>
                <DividingLine />
                {providersForUS.buy.length > 0 ? (
                  <ul className="flex">
                    {providersForUS.buy.map((provider) => (
                      <ProviderItem
                        key={provider.name}
                        name={provider.name}
                        logoPath={provider.logoPath}
                      />
                    ))}
                  </ul>
                ) : (
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
  );
};

export default ServiceProviderContainer;
