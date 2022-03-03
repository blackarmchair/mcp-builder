const theme = {
	spacing: [0, 12, 24, 32, 40, 52, 60],
	palette: {
		type: 'dark',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
		white: {
			main: '#FFFFFF',
		},
		myst: {
			main: '#009edc',
			contrastColor: 'rgba(0,0,0,0.87)',
		},
		phys: {
			main: '#db2525',
			contrastColor: 'white',
		},
		enrg: {
			main: 'rgba(251, 239, 45, 0.75)',
			contrastColor: 'rgba(0,0,0,0.87)',
		},
		overlay: {
			main: 'rgba(0, 0, 0, 0.85)',
			headerBg: 'rgba(255, 255, 255, 0.25)',
		},
	},
	typography: {
		allVariants: { color: 'white' },
		body2: {
			color: 'white !important',
		},
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: { variant: 'primary' },
					style: {
						color: '#FFFFFF',
						border: '1px solid #FFFFFF',
						backgroundColor: 'rgba(0, 0, 0, 0.85)',
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.15)',
						},
					},
				},
			],
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(0, 0, 0, 0.85)',
				},
			},
		},
	},
};

export default theme;
