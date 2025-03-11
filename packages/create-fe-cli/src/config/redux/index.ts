const template = `
import { useAppDispatch, useAppSelector } from "@/store";
import { decrement, increment } from "@/store/reducer/counter";
import { useNavigate } from "react-router";

export const PageHelloWorld: React.FC = () => {
  const navigate = useNavigate();
  const toAbout = () => {
    navigate("/demo");
  };
  const counter = useAppSelector((state) => state.counter.value);
  const dipatch = useAppDispatch();
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold underline">PageHelloWorld</p>
        <p>This project was generated with by create-fe-cli template</p>
        <p>use css by Tailwind </p>
        <button onClick={() => toAbout()}>To Demo</button>
        <button onClick={() => dipatch(increment())}>counter++</button>
        <h2>Counter: {counter}</h2>
        <button onClick={() => dipatch(decrement())}>counter--</button>
      </div>
    </>
  );
};

export default PageHelloWorld;
`;

export default template;
