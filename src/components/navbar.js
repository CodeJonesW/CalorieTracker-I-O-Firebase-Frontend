import React from "react"
import logo from "../images/runner_2.png"
import { connect } from "react-redux"
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  // FormInput,
  Collapse
} from "shards-react"

class MyNavBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    }
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    })
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    })
  }

  clearLocal = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div>
        {!localStorage["jwt_token"] && !this.props.userInfo.id ? (
          <Navbar id="navBarSignedOut" type="dark" expand="md">
            <NavbarBrand>
              <img src={logo} alt="logo" />
            </NavbarBrand>

            <NavbarBrand href="/">Calorie Tracker I/O</NavbarBrand>
            <NavbarToggler />
          </Navbar>
        ) : (
          // theme="primary"
          <Navbar id="navBarSignedOut" type="dark" expand="md">
            <NavbarBrand>
              <img src={logo} alt="logo" />
            </NavbarBrand>

            <NavbarBrand href="/">Calorie Tracker I/O</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />

            <Collapse open={this.state.collapseOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/activities">Activities</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/goals">Goals</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/consumptions">Consumptions</NavLink>
                </NavItem>
              </Nav>

              <Nav navbar className="ml-auto">
                <NavItem>
                  <NavLink href="/" onClick={this.clearLocal}>
                    Signout
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return { userInfo: state.user.userInfo }
}

export default connect(mapStateToProps)(MyNavBar)
