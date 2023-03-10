import { MainContext } from "contexts/main_context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CountryCode } from "types/main";
import { getCountryCode } from "utils/enum";
import { NavItem } from "./nav_item";

const navItems = [
  { label: "Top News", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Search", path: "/search" },
];

const NavBar = () => {
  const { country, setCountry } = useContext(MainContext);
  const location = useLocation();

  return (
    <div className="nav-bar">
      {navItems.map((item) => {
        return (
          <NavItem key={item.label} active={location.pathname === item.path}>
            <Link to={item.path}>{item.label}</Link>
          </NavItem>
        );
      })}
      <NavItem span />
      {Object.keys(CountryCode).map((key) => {
        const itemValue = getCountryCode(key as keyof typeof CountryCode);
        return (
          <NavItem
            onNavItemClick={() => setCountry(itemValue)}
            key={key}
            active={itemValue === country}
            disabled={location.pathname === "/detail"}
          >
            {key}
          </NavItem>
        );
      })}
    </div>
  );
};

export { NavBar };
