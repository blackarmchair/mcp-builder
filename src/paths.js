import { Route } from 'react-router-dom';
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

export const HOME_ROUTE = {
	path: '/',
	route: (
		<Route exact path="/" key="home">
			<Home />
		</Route>
	),
	backPath: '/',
	resetSearch: true,
};

const paths = [
	HOME_ROUTE,
	{
		path: '/rosters',
		route: (
			<Route exact path="/rosters" key="rosters">
				<Rosters />
			</Route>
		),
		backPath: '/',
		resetSearch: true,
	},
	{
		path: '/rosters/:id',
		route: (
			<Route exact path="/rosters/:id" key="rosterDetail">
				<RosterDetail />
			</Route>
		),
		backPath: '/rosters',
		resetSearch: true,
	},
	{
		path: '/card-reference',
		route: (
			<Route exact path="/card-reference" key="cardReference">
				<CardReference />
			</Route>
		),
		backPath: '/',
		resetSearch: false,
	},
	{
		path: '/card-reference/:id',
		route: (
			<Route exact path="/card-reference/:id" key="cardDetail">
				<CardDetail />
			</Route>
		),
		backPath: '/card-reference',
		resetSearch: false,
	},
	{
		path: '/rules-reference',
		route: (
			<Route exact path="/rules-reference" key="rulesReference">
				<Rules />
			</Route>
		),
		backPath: '/',
		resetSearch: true,
	},
	{
		path: '/collection',
		route: (
			<Route exact path="/collection" key="collection">
				<Collection />
			</Route>
		),
		backPath: '/',
		resetSearch: true,
	},
	{
		path: '/calculator',
		route: (
			<Route exact path="/calculator" key="calculator">
				<Calculator />
			</Route>
		),
		backPath: '/',
		resetSearch: true,
	},
	{
		path: '/import/:rosterBlob',
		route: (
			<Route exact path="/import/:rosterBlob" key="import">
				<Import />
			</Route>
		),
		backPath: '/',
		resetSearch: true,
	},
	{
		path: '/analytics/:rosterId',
		route: (
			<Route exact path="/analytics/:rosterId" key="analytics">
				<Analytics />
			</Route>
		),
		backPath: (selectedRosterId) => `/rosters/${selectedRosterId}`,
		resetSearch: true,
	},
];

export default paths;
