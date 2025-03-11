import { useEffect, type FC } from "react";

const Demo: FC = () => {
  useEffect(() => {
    console.log("Demo page loaded");
    return () => {
      console.log("Demo page unloaded");
    };
  }, []);
  return (
    <>
      <p>This is a demo page.</p>
    </>
  );
};

export default Demo;
