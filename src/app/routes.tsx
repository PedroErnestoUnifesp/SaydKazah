import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { VenueDetail } from "./pages/VenueDetail";
import { EventDetail } from "./pages/EventDetail";
import { Chat } from "./pages/Chat";
import { Explore } from "./pages/Explore";
import { Profile } from "./pages/Profile";
import { SavedEvents } from "./pages/SavedEvents";
import { Settings } from "./pages/Settings";
import { Info } from "./pages/Info";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "venue/:id", Component: VenueDetail },
      { path: "event/:id", Component: EventDetail },
      { path: "chat", Component: Chat },
      { path: "explore", Component: Explore },
      { path: "profile", Component: Profile },
      { path: "saved", Component: SavedEvents },
      { path: "settings", Component: Settings },
      { path: "info", Component: Info },
      { path: "*", Component: Home },
    ],
  },
]);
