import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const RouterContext = createContext();

export function useRouter() {
	return useContext(RouterContext);
}

export function RouterProvider({ children }) {
	const location = useLocation();
	const history = useHistory();

	const [route, setRoute] = useState({
		to: location.pathname,
		from: location.pathname,
	});

	const navigate = (to) => {
		history.push(to);
	};

	const goBack = () => {
		if (!route.from.localeCompare(route.to)) navigate('/');
		else history.goBack();
	};

	React.useEffect(() => {
		setRoute((prev) => ({ to: location.pathname, from: prev.to }));
	}, [location]);

	return (
		<RouterContext.Provider value={{ route, navigate, goBack }}>
			{children}
		</RouterContext.Provider>
	);
}
