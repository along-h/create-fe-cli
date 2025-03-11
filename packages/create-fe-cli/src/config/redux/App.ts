const template = `
import { useRoutes } from "react-router";
import routes from "./router";
import { Suspense } from "react";
import { Loading } from "@/components";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
      </Provider>
    </>
  );
}

export default App;
`;
export default template;
