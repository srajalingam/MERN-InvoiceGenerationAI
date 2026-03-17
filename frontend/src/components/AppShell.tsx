import { useClerk, useUser } from "@clerk/clerk-react";
import { appShellStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const InvoiceIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CreateIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const ProfileIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/* ----- SidebarLink ----- */
const SidebarLink = ({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
        ${appShellStyles.sidebarLink}
        ${
          isActive
            ? appShellStyles.sidebarLinkActive
            : appShellStyles.sidebarLinkInactive
        }
      `}
  >
    {({ isActive }) => (
      <>
        <div
          className={`${appShellStyles.sidebarIcon} ${
            isActive
              ? appShellStyles.sidebarIconActive
              : appShellStyles.sidebarIconInactive
          }`}
        >
          {icon}
        </div>
        {children}
      </>
    )}
  </NavLink>
);

function AppShell() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const signOutHandler = async (): Promise<void> => {
    await signOut();
  };

  const displayName = (() => {
    if (!user) return "User";
    const name = user.fullName || user.firstName || user.username || "";
    const email = user.emailAddresses?.[0]?.emailAddress || "";
    return name.trim() || email.split?.("@")?.[0] || "User";
  })();

  const firstName = () => {
    const parts = displayName.split(" ").filter(Boolean);
    return parts.length ? parts[0] : displayName;
  };

  const initials = () => {
    const parts = displayName.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (
    <div className={appShellStyles.root}>
      <div className={appShellStyles.layout}>
        <aside className={`${appShellStyles.sidebar}`}>
          <div className={appShellStyles.sidebarGradient}></div>
          <div className={appShellStyles.sidebarContainer}>
            <Link to="/" className={appShellStyles.logoLink}>
              <div className="relative">
                <img
                  src={logo}
                  alt="Logo"
                  className={appShellStyles.logoImage}
                />
                <div className="absolute inset-0 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div className={appShellStyles.logoTextContainer}>
                <span className={appShellStyles.logoText}>InvoiceAI</span>
                <span className={appShellStyles.logoUnderline}></span>
              </div>
            </Link>
          </div>
          <nav className={appShellStyles.nav}>
            <SidebarLink to="/app/dashboard" icon={<DashboardIcon />}>
              Dashboard
            </SidebarLink>
            <SidebarLink to="/app/invoices" icon={<InvoiceIcon />}>
              Invoices
            </SidebarLink>
            <SidebarLink to="/app/create-invoice" icon={<CreateIcon />}>
              Create Invoice
            </SidebarLink>
            <SidebarLink to="/app/business" icon={<ProfileIcon />}>
              Business Profile
            </SidebarLink>
            <button
              onClick={() => {
                signOutHandler();
              }}
              className={appShellStyles.sidebarLink}
            >
              <div className={appShellStyles.sidebarIcon}>
                <LogoutIcon />
              </div>
              Logout
            </button>
          </nav>
        </aside>
        <div className={`${appShellStyles.welcomeContainer} w-full`}>
          <div className="flex flex-row justify-between items-center w-full">
            <header>
              <h2 className={appShellStyles.welcomeTitle}>
                Welcome back,{" "}
                <span className={appShellStyles.welcomeName}>
                  {firstName() || initials()}
                </span>
                !
              </h2>
              <p className={appShellStyles.welcomeSubtitle}>
                Ready to create your first invoice? Head over to the dashboard
                to get started.
              </p>
            </header>
            <div>
              <button
                onClick={() => navigate("app/create-invoice")}
                className={appShellStyles.ctaButton}
              >
                <CreateIcon className={appShellStyles.ctaIcon}></CreateIcon>
                <span className="xs:hidden">Create</span>
              </button>
              <div className={appShellStyles.userSectionDesktop}>
                <div className={appShellStyles.userInfo}>
                  <div className={appShellStyles.userName}>{displayName}</div>
                  <div className={appShellStyles.userEmail}>
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={appShellStyles.main}>
            <div className={appShellStyles.mainContainer}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
