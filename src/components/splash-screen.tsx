
const SplashScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#937DBE]">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-3">
          {/* SVG Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h6v-2h-4z" />
          </svg>

          {/* App Name & Tagline */}
          <div>
            <h1 className="text-white text-4xl font-bold">NextRound</h1>
            <p className="text-white text-lg opacity-80">AI-Powered Mock Interviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
