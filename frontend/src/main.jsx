import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Locations from './components/Locations.jsx';
import LocationPlaceScreen from './screens/LocationPlaceScreen.jsx';
import PhotographerAbout from './screens/PhotographerAbout.jsx';
import Photographers from './screens/Photographers.jsx';
import ClientDashBoard from './screens/ClientDashBoard.jsx';
import PhotographerDashBoard from './screens/PhotographerDashBoard.jsx';
import LocationOwnerDashBoard from './screens/LocationOwnerDashBoard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/locations/:id" element={<LocationPlaceScreen />} />
      <Route path="/photographers/:id" element={<PhotographerAbout />} />
      <Route path="/photographers" element={<Photographers />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/client-dashboard/:id" element={<ClientDashBoard />} />
        <Route
          path="/photographer-dashboard/:id"
          element={<PhotographerDashBoard />}
        />
        <Route
          path="/owner-dashboard/:id"
          element={<LocationOwnerDashBoard />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
