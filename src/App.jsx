import { Route, Routes } from "react-router-dom"
import Home, { HomeStack } from "./pages/shared/Home"
import Login from "./pages/shared/Login"
import Register from "./pages/shared/Register"
import AuctionDetails from "./pages/shared/AuctionDetails"
import ProtectedRoute from "./auth/ProtectedRoute"
import Dashboard from "./pages/admin/Dashboard"
import Categories from "./pages/admin/Categories"
import Types from "./pages/admin/Types"
import Products from "./pages/admin/Products"
import Auctions from "./pages/admin/Auctions"
import Bids from "./pages/admin/Bids"
import Users from "./pages/admin/Users"
import Settings from "./pages/admin/Settings"
import NotFound from "./pages/errors/NotFound"
import Denied from "./pages/errors/Denied"
import Profile from "./pages/shared/Profile"
import AppAuctions from "./pages/shared/AppAuctions"

function App() {

  return (
    <Routes>

      <Route path = "/login" element = { <Login /> } />
      <Route path = "/register" element = { <Register /> } />

      <Route path="/" element = { <HomeStack />}>
        <Route index element = { <Home /> } />
      </Route>

      <Route path="/app" element = { <HomeStack />}>
        <Route index element = { <Home /> } />
        <Route path = "details/:auctionId" element = { <AuctionDetails /> } />
        <Route path = "profile" element = { <Profile /> } />
        <Route path = "auctions" element = { <AppAuctions /> } />
      </Route>

      <Route path = "/admin" element = { <ProtectedRoute allowedRoles = {[ 'admin' ]} /> }>
        <Route path = "dashboard" element = { <Dashboard /> } />
        <Route path = "categories" element = { <Categories /> } />
        <Route path = "types" element = { <Types /> } />
        <Route path = "products" element = { <Products /> } />
        <Route path = "auctions" element = { <Auctions /> } />
        <Route path = "bids" element = { <Bids /> } />
        <Route path = "users" element = { <Users /> } />
        <Route path = "profile" element = { <Profile /> } />
        {/* <Route path = "settings" element = { <Settings /> } /> */}
        <Route path = "*" element = { <NotFound /> } />
      </Route>

      <Route path = "/denied" element = { <Denied /> } />
      <Route path = "/*" element = { <NotFound /> } />

    </Routes>
  )
}

export default App
