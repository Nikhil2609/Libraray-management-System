import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const StyledTable = (props: TableProps) => {
    const { columns, data, onEdit, onDelete } = props;
    return (
        <TableContainer component={Paper} elevation={3}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.field} align={column.align || 'center'}>
                                {column.headerName}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && <TableCell align="center">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length > 0 && data.map((row, index) => (
                        <TableRow key={row.id || index}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                            }}>
                            {columns.map((column) => (
                                <TableCell key={column.field} align={column.align || 'center'}>
                                    {row[column.field]}
                                </TableCell>
                            ))}
                            {(onEdit || onDelete) &&
                                <TableCell align="center">
                                    {onEdit &&
                                        <IconButton onClick={() => onEdit(row)}>
                                            <Edit className='textColor' />
                                        </IconButton>
                                    }
                                    {onDelete &&
                                        <IconButton onClick={() => onDelete(row.id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    }
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                    {!(data?.length > 0) && (
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} align='center'>
                                No Record Found
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StyledTable;

interface TableProps {
    columns: any[],
    data: any[],
    onEdit?: Function,
    onDelete?: Function
}
