import React from 'react';
import { useSearch } from '../../contexts/SearchContext';
import PageContainer from '../../components/PageContainer';
import RosterList from '../../components/RosterList';

const Rosters = () => {
	const { resetLastAccessedCharacter } = useSearch();

	React.useEffect(() => {
		resetLastAccessedCharacter();
	}, [resetLastAccessedCharacter]);

	return (
		<PageContainer>
			<RosterList />
		</PageContainer>
	);
};

export default Rosters;
