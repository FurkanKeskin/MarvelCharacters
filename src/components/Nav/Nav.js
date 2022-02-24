// import Link from '../Link/Link';
import { NavLink } from 'react-router-dom';
import './nav.scss';

export default function Nav(props) {
    return (
        <nav className="mainnav">
            <NavLink activeClassName="activeLink" to="/">
                Home
            </NavLink>
        </nav>
    );
}
