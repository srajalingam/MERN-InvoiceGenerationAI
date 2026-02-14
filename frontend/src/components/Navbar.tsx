
import { Link, useNavigate } from "react-router-dom"
import {navbarStyles} from "../assets/dummyStyles.ts"
import logo from "../assets/logo.png"
import { use, useRef, useState } from "react"
import { SignedOut, useAuth, useClerk, useUser } from "@clerk/clerk-react"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const {user} = useUser();

  const {getToken,isSignedIn} = useAuth();

  const clerk = useClerk();

  const navigate = useNavigate();

  const profileRef  = useRef<HTMLDivElement>(null);

  const TOKEN_KEY = "token";

  const openSignIn = async () => {
    try {
      if(clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      }else{
        navigate("/login");
      }
    }catch (error) {
      console.error("Error during sign-in:", error);
      navigate("/login");
    }

  }

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img src={logo} alt="InvoiceGenie Logo" className={navbarStyles.logoImage} />
              <span className={navbarStyles.logoText}>InvoiceAI</span>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <a href="#features" className={navbarStyles.navLink}>Features</a>
              <a href="#pricing" className={navbarStyles.navLinkInactive}>Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={navbarStyles.authSection}>
              <SignedOut>
                  <button
                    onClick={openSignIn}
                    className={navbarStyles.signInButton}
                    type="button"
                  >Sign In</button>
              </SignedOut>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar