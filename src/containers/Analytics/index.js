import React from 'react';
import { useParams } from 'react-router-dom';
import { useRosters } from '../../contexts/RosterContext';
import PageContainer from '../../components/PageContainer';
import RosterAnalytics from '../../components/Analytics';

const Analytics = () => {
	const { rosterId } = useParams();
	const { selectRoster, selectedRoster } = useRosters();
	React.useEffect(() => {
		if (
			selectedRoster === undefined ||
			selectedRoster?.id?.localeCompare(rosterId)
		) {
			selectRoster(rosterId);
		}
	}, [rosterId, selectRoster, selectedRoster]);

	return (
		<PageContainer>
			{selectedRoster !== undefined && <RosterAnalytics />}
		</PageContainer>
	);
};

export default Analytics;
