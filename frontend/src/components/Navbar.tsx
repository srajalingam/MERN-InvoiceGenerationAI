import { Link, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyles.ts";
import logo from "../assets/logo.png";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { SignedOut, useAuth, useClerk, useUser } from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();

  const { getToken, isSignedIn } = useAuth();

  const clerk = useClerk();

  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);

  const TOKEN_KEY = "token";

  const fetchAndStoreToken = useCallback(async () => {
    try {
      const token = await getToken().catch((error) => {
        console.error("Error fetching token:", error);
        return null;
      });

      if (!token) {
        console.warn("No token received");
        return;
      }
      console.log("Fetched token:", token);
      localStorage.setItem(TOKEN_KEY, token);
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  }, [getToken]);

  //keep token updated in clerk auth state

  useEffect(() => {
    let mounted = true;
    const fetchToken = async () => {
      if (isSignedIn) {
        const t = await fetchAndStoreToken().catch((error) => {
          console.error("Error fetching token on mount:", error);
        });
        if (!t && mounted) {
          await fetchAndStoreToken().catch((error) => {
            console.error("Error fetching token on retry:", error);
            return null;
          });
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    };
    fetchToken();
    return () => {
      mounted = false;
    };
  }, [isSignedIn, fetchAndStoreToken, user]);

  //ater successful sign in, redirect to dashboard

  useEffect(() => {
    if (isSignedIn) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [isSignedIn, navigate]);

  // Close profile popover on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("touchstart", onDocClick);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [profileOpen]);

  const openSignIn = async () => {
    try {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      navigate("/login");
    }
  };

  const openSignUp = async () => {
    try {
      if (clerk && typeof clerk.openSignUp === "function") {
        clerk.openSignUp();
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      navigate("/signup");
    }
  };

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img
                src={logo}
                alt="InvoiceGenie Logo"
                className={navbarStyles.logoImage}
              />
              <span className={navbarStyles.logoText}>InvoiceAI</span>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <a href="#features" className={navbarStyles.navLink}>
                Features
              </a>
              <a href="#pricing" className={navbarStyles.navLinkInactive}>
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={navbarStyles.authSection}>
              <SignedOut>
                <button
                  onClick={openSignIn}
                  className={navbarStyles.signInButton}
                  type="button"
                >
                  Sign In
                </button>
                <button
                  onClick={openSignUp}
                  className={navbarStyles.signUpButton}
                  type="button"
                >
                  Sign Up
                  <svg
                    className={navbarStyles.signUpIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </SignedOut>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
