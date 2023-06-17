import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TaskItem = ({ task, StyledTableCell }) => {

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <img src={task.image} alt={task.title} />
            </StyledTableCell>
            <StyledTableCell>{task.title}</StyledTableCell>
            <StyledTableCell align="right">{task.endDate}</StyledTableCell>
            <StyledTableCell align="right">{task.completed ? 'Yes' : 'No'}</StyledTableCell>
        </StyledTableRow>
    );
};

export default TaskItem;