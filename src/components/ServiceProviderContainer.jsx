/* eslint-disable react/prop-types */
import MessageCard from "./MessageCard";

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

  return (
    <div className="m-4">
      {media.name}
      <img
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={media.title || media.name}
        className="rounded-lg"
      />

      <div>
        <h2>Subscriptions</h2>
        {providersForUS.flatrate.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3">
            {providersForUS.flatrate.map((provider) => (
              <li
                key={provider.name}
                className="p-1 rounded-lg bg-gray-500 flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${provider.logoPath}`}
                  alt={provider.name}
                  className="w-16 rounded-lg"
                />
                <h1>{provider.name}</h1>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard text="No subscription options found" />
        )}
      </div>

      <div>
        <h2>Rent</h2>
        {providersForUS.rent.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3">
            {providersForUS.rent.map((provider) => (
              <li
                key={provider.name}
                className="p-1 rounded-lg bg-gray-500 flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${provider.logoPath}`}
                  alt={provider.name}
                  className="w-16 rounded-lg"
                />
                <h1>{provider.name}</h1>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard text="No rent options found" />
        )}
      </div>

      <div>
        <h2>Buy</h2>
        {providersForUS.buy.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3">
            {providersForUS.buy.map((provider) => (
              <li
                key={provider.name}
                className="p-1 rounded-lg bg-gray-500 flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${provider.logoPath}`}
                  alt={provider.name}
                  className="w-16 rounded-lg"
                />
                <h1>{provider.name}</h1>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard text="No buy options found" />
        )}
      </div>
    </div>
  );
};

export default ServiceProviderContainer;
