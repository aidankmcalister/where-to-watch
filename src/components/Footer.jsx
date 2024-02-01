const Footer = () => {
  return (
    <div className="w-screen bg-white/30 px-2 py-4  h-20 flex justify-center absolute left-0 right-0 bottom-0">
      <p>
        Provider information from{" "}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer">
          TMDB
        </a>{" "}
        and{" "}
        <a
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer">
          JustWatch
        </a>
      </p>
    </div>
  );
};

export default Footer;
