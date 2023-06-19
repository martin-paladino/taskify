import TaskItem from './TaskItem';
import { useTranslation } from 'react-i18next';
//To-do: todo lo de material en una importacion
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const TaskList = ({ tasks, actions }) => {
    const { t } = useTranslation();
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{t("image")}</StyledTableCell>
                        <StyledTableCell>{t("task")}</StyledTableCell>
                        <StyledTableCell align="right">{t('endDate')}</StyledTableCell>
                        <StyledTableCell align="right">{t("state")}</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            actions={actions}
                            StyledTableCell={StyledTableCell} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;