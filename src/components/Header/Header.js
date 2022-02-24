import './header.scss';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="masthead">
      <h1>
        <Link to="/">{props.characters}</Link>
      </h1>
      <Nav />
    </header>
  );
}
