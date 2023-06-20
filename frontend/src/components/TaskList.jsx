import TaskItem from './TaskItem';
import { useTranslation } from 'react-i18next';
import {
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

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