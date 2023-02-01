import classNames from "classnames";

type NavItemProps = {
  span?: boolean;
  active?: boolean;
  disabled?: boolean;
  onNavItemClick?: () => void;
  children?: JSX.Element | JSX.Element[] | string | null | undefined;
};

const NavItem = ({
  span,
  active,
  disabled,
  onNavItemClick,
  children,
}: NavItemProps) => {
  return (
    <div
      className={classNames("nav-item", { span, active, disabled })}
      onClick={disabled ? undefined : onNavItemClick}
    >
      {children}
    </div>
  );
};

export { NavItem };
