import React, { useEffect } from "react";
import { About, Layout, Main, HireMe, Credits } from "@/components";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const setRootHeight = () => {
  const root = document.getElementById("root");
  if (root) {
    root.style.height = window.innerHeight.toString() + "px";
  }
};

function App() {
  useEffect(() => {
    setRootHeight();
    window.addEventListener("resize", (e) => {
      if ((e.target as typeof window)?.innerWidth < 500) {
        setRootHeight();
      }
    });
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route path="/about" component={About} />
          <Route path="/hire_me" component={HireMe} />
          <Route path="/credits" component={Credits} />
          <Route exact path={["/", "/recipes/:id"]} component={Main} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
