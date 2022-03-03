import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SearchProvider } from './contexts/SearchContext';
import { RosterProvider } from './contexts/RosterContext';
import { ToastProvider } from './contexts/ToastContext';
import { RouterProvider } from './contexts/RouterContext';

import Home from './containers/Home';
import Rosters from './containers/Rosters';
import RosterDetail from './containers/Roster';
import CardReference from './containers/CardReference';
import CardDetail from './containers/CardDetail';
import Import from './containers/Import';
import Collection from './containers/Collection';
import Rules from './containers/Rules';
import Calculator from './containers/Calculator';
import Analytics from './containers/Analytics';

import TopBar from './components/Sidebar';
import Background from './components/Background';

const App = () => {
	return (
		<Router>
			<RouterProvider>
				<Background />
				<TopBar />
				<ToastProvider>
					<SearchProvider>
						<RosterProvider>
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/rosters">
									<Rosters />
								</Route>
								<Route path="/rosters/:id">
									<RosterDetail />
								</Route>
								<Route exact path="/card-reference">
									<CardReference />
								</Route>
								<Route path="/card-reference/:id">
									<CardDetail />
								</Route>
								<Route path="/rules-reference">
									<Rules />
								</Route>
								<Route path="/collection">
									<Collection />
								</Route>
								<Route path="/calculator">
									<Calculator />
								</Route>
								<Route path="/import/:rosterBlob">
									<Import />
								</Route>
								<Route path="/analytics/:rosterId">
									<Analytics />
								</Route>
							</Switch>
						</RosterProvider>
					</SearchProvider>
				</ToastProvider>
			</RouterProvider>
		</Router>
	);
};

export default App;
