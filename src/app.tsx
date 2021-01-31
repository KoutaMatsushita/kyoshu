import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import { Loading } from "./components/Loading";
import { NotFound } from "./components/NotFound";

const IndexPage = React.lazy(() => import("./pages"));
const RoomPage = React.lazy(() => import("./pages/rooms/[id]"));

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={IndexPage} />
      <Route path="/rooms/:id">{(params) => <RoomPage roomId={params.id} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
};
