import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const TopBarHeight =
	document.querySelector('#root > .MuiBox-root')?.offsetHeight || 64;
const StyledContainer = styled(Container)(({ theme }) => ({
	overflowY: 'scroll',
	height: `calc(100vh - ${TopBarHeight}px)`,
	paddingBottom: theme.spacing(4),
}));

const PageContainer = ({ children }) => {
	return <StyledContainer maxWidth="md">{children}</StyledContainer>;
};

export default PageContainer;
