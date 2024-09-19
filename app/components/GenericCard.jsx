import theme from '../theme';
import { Card, styled } from '@mui/material';

const GenericCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
}));

export default GenericCard;
