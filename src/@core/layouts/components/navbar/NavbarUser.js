// ** Dropdowns Imports
import GSTCalculator from "./GSTCalculator"
import NotificationDropdown from "./NotificationDropdown"
import UserDropdown from "./UserDropdown"
import NavbarSearch from './NavbarSearch'

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <NavbarSearch />
      <GSTCalculator />
      <NotificationDropdown />
      {/* <UserDropdown /> */}
    </ul>
  )
}
export default NavbarUser
