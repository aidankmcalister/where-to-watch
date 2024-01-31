const Header = () => {
  return (
    <div className="flex justify-center w-full items-center bg-primary shadow-secondary shadow-sm h-16 bg-[url('src/assets/wave.svg')] bg-no-repeat bg-cover bg-right">
      <a href="/" className="cursor-pointer">
        <h1 className="text-xl">Logo</h1>
      </a>
    </div>
  );
};

export default Header;
