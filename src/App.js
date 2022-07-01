import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

import { SearchProvider } from './contexts/SearchContext';
import { RosterProvider } from './contexts/RosterContext';
import { ToastProvider } from './contexts/ToastContext';
import { RouterProvider } from './contexts/RouterContext';

import paths from './paths';

import TopBar from './components/Sidebar';
import Background from './components/Background';
import Version from './components/Version';

const App = () => {
	const [appHasUpdates, setAppHasUpdates] = React.useState(false);
	const [serviceWorkerRegistration, setServiceWorkerRegistration] =
		React.useState();

	React.useEffect(() => {
		window.addEventListener('applicationUpdate', (e) => {
			setAppHasUpdates(true);
			setServiceWorkerRegistration(e.detail.reg);
		});
		window.addEventListener('load', function () {
			setTimeout(() => {
				window.scrollTo(0, 1);
			}, 0);
		});
	}, []);

	const handleAppUpgrade = () => {
		setAppHasUpdates(false);
		serviceWorkerRegistration.unregister().then(() => window.location.reload());
	};

	return (
		<>
			{appHasUpdates && (
				<Alert
					severity="success"
					action={
						<Button size="small" onClick={handleAppUpgrade}>
							Upgrade
						</Button>
					}
				>
					A new version of FridayAI is available.
				</Alert>
			)}
			<Router>
				<ToastProvider>
					<SearchProvider>
						<RouterProvider>
							<Background />
							<TopBar />
							<RosterProvider>
								<Switch>{paths.map((path) => path.route)}</Switch>
							</RosterProvider>
							<Version version="1.0.1" />
						</RouterProvider>
					</SearchProvider>
				</ToastProvider>
			</Router>
		</>
	);
};

export default App;
