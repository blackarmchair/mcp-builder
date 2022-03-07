import React, { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSearch } from './SearchContext';
import paths, { HOME_ROUTE } from '../paths';

const RouterContext = createContext();

export function useRouter() {
	return useContext(RouterContext);
}

const getPath = (route) => {
	try {
		return paths.find((path) => {
			const routeDepth = route.to.split('/').filter((elem) => elem.length);
			const pathDepth = path.path.split('/').filter((elem) => elem.length);
			if (routeDepth.length !== pathDepth.length) return false;
			if (routeDepth[0] === pathDepth[0]) return true;
			return false;
		});
	} catch (err) {
		return HOME_ROUTE;
	}
};

export function RouterProvider({ children }) {
	const location = useLocation();
	const history = useHistory();
	const { reset, currentSearchTerms } = useSearch();

	const [route, setRoute] = useState({
		to: location.pathname,
		from: location.pathname,
	});

	const navigate = (to) => {
		history.push(to);
	};

	const goBack = () => {
		const targetPath = getPath(route);
		const backPath =
			!!targetPath && targetPath.hasOwnProperty('backPath')
				? typeof targetPath?.backPath === 'function'
					? targetPath.backPath(location.pathname.split('/').pop())
					: targetPath?.backPath
				: '/';
		navigate(backPath);
	};

	React.useEffect(() => {
		setRoute((prev) => ({ to: location.pathname, from: prev.to }));
	}, [location, reset, currentSearchTerms]);

	return (
		<RouterContext.Provider value={{ route, navigate, goBack }}>
			{children}
		</RouterContext.Provider>
	);
}
