import React, { useState } from "react";
import apiHelper from "src/utils/apiHelper";

import {
    Card,
    Table,
    Button,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TextField,
    FormControl,
    Grid,
} from '@mui/material';

export default function AptListItem({ id, access, dong, floor, ho, aptList, setAptList }) {

    const [aptDong, setAptDong] = useState(dong);

    const handleDongChange = (e) => {
      setAptDong(e.target.value);
    }

    const handleDeleteTemplate = async (e, id, access) => {
        let newAptList = [...aptList];
        if(access){
            // const res = await apiHelper.delete();
            const res = true;
            if(res){
                newAptList = aptList.filter((apt) => apt.id !== id);    
            }
        }else{
            newAptList = aptList.filter((apt) => apt.id !== id);
        }
        setAptList(newAptList);
    }

    const handleAptSave = async (e, id) => {
        // const res = await apiHelper.delete();
        const res = true;
    }

    const rows = [];
    const cells = [];
    for (let i = 0; i < floor; i+=1){
        rows.push(i+1);
    }
    for(let j = 0; j < ho; j+=1){
        cells.push((j+1).toString().padStart(2, '0'));
    }

    return (
        <Card sx={{p: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={1}>동</Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <TextField size='small' name="aptDong" variant="outlined" label="Ex) 101" value={aptDong||''} onChange={handleDongChange}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={7} textAlign={'right'}>
                    <Button size='small' color='error' variant="contained" onClick={(e) => handleDeleteTemplate(e, id, access)}>
                        삭제
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
                <TableContainer>
                    <Table size="small">
                        <TableBody>
                            {rows.reverse().map((row) => {
                                // eslint-disable-next-line
                                return (
                                    <TableRow hover tabIndex={-1}>
                                        {cells.map((cell) => {
                                            // eslint-disable-next-line
                                            return (
                                                <TableCell align='center'>
                                                    {row}{cell}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid sx={{mt: 2}} textAlign={"right"}>
                <Button size='small' variant="contained" onClick={(e) => handleAptSave(e, id)}>
                    정보저장
                </Button>
            </Grid>
        </Card>
    )
}