import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Profile from "../pages/Profile/Profile";
import ChatPage from "../pages/ChatPage/ChatPage";
import ChatHome from "../pages/ChatPage/ChatHome";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import GroupChat from "../pages/GroupChat/GroupChat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/chat",
            element: (
              <PrivateRoute>
                <ChatHome />
              </PrivateRoute>
            ),
          },
          {
            path: "/chat/:id",
            element: (
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/update-profile",
        element: <Profile />,
      },
      {
        path: "/group/:id",
        element: <GroupChat />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default routes;
