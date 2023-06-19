import { TableRow, styled, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TaskItem = ({ task, actions, StyledTableCell }) => {

    const formattedDate = task.end_date ? new Date(task.end_date).toLocaleDateString('en-CA') : "-";
    const handleChangeCompleted = (e) => {
        e.preventDefault();
        actions.handleUpdateTaskCompleted({ completed: true }, task.id);
    };
    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <img src={task.image || "images/default-image.png"} alt={task.title} style={{ width: '50px', height: 'auto' }} />
            </StyledTableCell>
            <StyledTableCell>{task.title}</StyledTableCell>
            <StyledTableCell align="right">{formattedDate}</StyledTableCell>
            <StyledTableCell align="right">{task.completed ? 'Completed' : 'Pending'}</StyledTableCell>
            <Tooltip title="Delete task">
                <IconButton>
                    <DeleteIcon fontSize='medium' onClick={() => actions.handleDeleteTask(task.id)}></DeleteIcon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark as completed">
                <IconButton>
                    <CheckCircleOutlineIcon fontSize='medium' onClick={handleChangeCompleted}></CheckCircleOutlineIcon>
                </IconButton>
            </Tooltip>
        </StyledTableRow>
    );
};

export default TaskItem;