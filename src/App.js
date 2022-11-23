import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

import { SearchProvider } from './contexts/SearchContext';
import { RosterProvider } from './contexts/RosterContext';
import { ToastProvider } from './contexts/ToastContext';
import { RouterProvider } from './contexts/RouterContext';
import { MediaProvider } from './contexts/MediaContext';

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
		if (serviceWorkerRegistration && serviceWorkerRegistration.waiting) {
			serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
		}
		window.location.reload(true);
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
				<MediaProvider>
					<ToastProvider>
						<SearchProvider>
							<RouterProvider>
								<Background />
								<TopBar />
								<RosterProvider>
									<Switch>{paths.map((path) => path.route)}</Switch>
								</RosterProvider>
								<Version version="1.1.3" />
							</RouterProvider>
						</SearchProvider>
					</ToastProvider>
				</MediaProvider>
			</Router>
		</>
	);
};

export default App;
