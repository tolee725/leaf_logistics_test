import { NavBar } from "components/nav_bar";

type MainLayoutProps = {
  children?: string | JSX.Element | JSX.Element[];
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="content">{children}</div>
    </div>
  );
};

export { MainLayout };
