/* eslint-disable react/prop-types */
import ContentCard from "./ContentCard";

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
    <ContentCard
      content={
        <div>
          {media.name}
          <img
            src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`}
            alt={media.title || media.name}
            className="rounded-xl lg:hidden"
          />

          <ContentCard
            content={
              <div>
                <h2>Subscriptions</h2>
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
                  <p>No subscription options found</p>
                )}
              </div>
            }
          />

          <ContentCard
            content={
              <div>
                <h2>Rent</h2>
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
                  <p>No rent options found</p>
                )}
              </div>
            }
          />
          <ContentCard
            content={
              <div>
                <h2>Buy</h2>
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
                  <p>No buy options found</p>
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
