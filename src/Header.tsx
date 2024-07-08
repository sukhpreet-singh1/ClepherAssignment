interface HeaderDataType {
  data: {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
  };
}
const Header: React.FC<HeaderDataType> = ({ data }) => {
  return (
    <div>
      <h1 className="font-lexend text-lg">{data["2. Symbol"]}</h1>
      <h1 className="font-lexend text-lg">{data["1. Information"]}</h1>
    </div>
  );
};

export default Header;
