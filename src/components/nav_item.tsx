import classNames from "classnames";

type NavItemProps = {
  span?: boolean;
  active?: boolean;
  onNavItemClick?: () => void;
  children?: JSX.Element | JSX.Element[] | string | null | undefined;
};

const NavItem = ({ span, active, onNavItemClick, children }: NavItemProps) => {
  return (
    <div
      className={classNames("nav-item", { span, active })}
      onClick={onNavItemClick}
    >
      {children}
    </div>
  );
};

export { NavItem };
