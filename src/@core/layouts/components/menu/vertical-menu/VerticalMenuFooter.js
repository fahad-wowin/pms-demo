// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
    User,
    Mail,
    CheckSquare,
    MessageSquare,
    Settings,
    CreditCard,
    HelpCircle,
    Power,
    Lock
} from "react-feather"

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"

const VerticalMenuFooter = (props) => {

    // ** Props
    const {
        menuCollapsed
    } = props

    return (
        <ul className="nav navbar-nav align-items-center ms-auto mb-1">
            {
                menuCollapsed ? (
                    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
                        <DropdownToggle
                            href="/"
                            tag="a"
                            className="nav-link dropdown-user-link d-flex flex-row"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Avatar
                                img={defaultAvatar}
                                imgHeight="40"
                                imgWidth="40"
                                status="online"
                            />
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <User size={14} className="me-75" />
                                <span className="align-middle">Profile</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <Mail size={14} className="me-75" />
                                <span className="align-middle">Inbox</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <CheckSquare size={14} className="me-75" />
                                <span className="align-middle">Tasks</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <MessageSquare size={14} className="me-75" />
                                <span className="align-middle">Chats</span>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                                tag={Link}
                                to="/pages/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Settings size={14} className="me-75" />
                                <span className="align-middle">Settings</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <CreditCard size={14} className="me-75" />
                                <span className="align-middle">Pricing</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <HelpCircle size={14} className="me-75" />
                                <span className="align-middle">FAQ</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/login">
                                <Power size={14} className="me-75" />
                                <span className="align-middle">Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                ) : (
                    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
                        <DropdownToggle
                            href="/"
                            tag="a"
                            className=" dropdown-user-link d-flex flex-row"
                            onClick={(e) => e.preventDefault()}
                        >
                            <div className="mx-1 user-nav text-end d-flex flex-column">
                                <span className="user-name fw-bold text-secondary">John Doe</span>
                                <span className="user-status text-secondary">Admin</span>
                            </div>
                            <Avatar
                                img={defaultAvatar}
                                imgHeight="40"
                                imgWidth="40"
                                status="online"
                            />
                        </DropdownToggle>
                        <DropdownMenu end>
                            {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <User size={14} className="me-75" />
                                <span className="align-middle">Profile</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <Mail size={14} className="me-75" />
                                <span className="align-middle">Inbox</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <CheckSquare size={14} className="me-75" />
                                <span className="align-middle">Tasks</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <MessageSquare size={14} className="me-75" />
                                <span className="align-middle">Chats</span>
                            </DropdownItem>
                            <DropdownItem divider /> */}
                             {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <CreditCard size={14} className="me-75" />
                                <span className="align-middle">Pricing</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
                                <HelpCircle size={14} className="me-75" />
                                <span className="align-middle">FAQ</span>
                            </DropdownItem> */}
                            <DropdownItem
                                tag={Link}
                                to="/changepassword"
                            >
                                <Lock size={14} className="me-75" />
                                <span className="align-middle">Change Password</span>
                            </DropdownItem>
                            <DropdownItem
                                tag={Link}
                                to="/pages/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Settings size={14} className="me-75" />
                                <span className="align-middle">Settings</span>
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/login">
                                <Power size={14} className="me-75" />
                                <span className="align-middle">Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )
            }

        </ul>
    )
}

export default VerticalMenuFooter
