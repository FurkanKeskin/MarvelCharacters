import './App.scss';
import Details from './components/Details/Details';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { Switch, Route } from 'react-router-dom';

export default function App() {
    const name = 'Marvel React Assignment';
    return (
        <div className="App">
            <Header title={name} />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/character/:charId">
                    <Details />
                </Route>
            </Switch>
        </div>
    )
}