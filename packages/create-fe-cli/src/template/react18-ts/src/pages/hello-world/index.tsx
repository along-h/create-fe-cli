import { useNavigate } from "react-router";

const PageHelloWorld: React.FC = () => {
  const navigate = useNavigate();
  const toAbout = () => {
    navigate("/demo");
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold underline">PageHelloWorld</p>
        <p>This project was generated with by create-fe-cli template</p>
        <p>use css by Tailwind </p>
        <button onClick={() => toAbout()}>To Demo</button>
      </div>
    </>
  );
};

export default PageHelloWorld;
