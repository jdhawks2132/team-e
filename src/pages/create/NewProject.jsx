import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Button, Stack, Divider, FormControl, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveIcon from '@mui/icons-material/Save';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

const NewProject =()=> {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [descLength, setDescLength] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateError, setDateError] = useState('');
    const [budget, setBudget] = useState(0);
    const [members, setMembers] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('test-projects');

    // disable submit button if there is a date error or no project name present
    // currently not validating emails
    useEffect(()=> {
        projectName === '' || dateError ? setIsDisabled(true) : setIsDisabled(false)
    }, [projectName, dateError])
    
    function emailSplitter(list) {
        return list.replace(/\s/g, '').split(',')
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsDisabled(true);

        let newProject = {
            "name": projectName,
            "description" : description,
            "startdate": startDate && startDate.toString(), // Dates from the date picker are stored as Moment Objects.
            "enddate": endDate && endDate.toString(),     // Firebase cannot store Moment Objects, so they will convert to ISO strings
            "budget": budget,
            "members": emailSplitter(members.concat("," + user.email)), // Array will include owner's email
            "owner": user.uid
        }
        
        try {
            console.log(newProject)
            await addDocument(newProject)
            // response does not return my newly created doc object, even on successful creation. Need to figure out why.
            console.log(response)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
        <Typography variant="h2">New Project</Typography>
        <Box component="form" id="new-project">
            <Stack spacing={2} mt={2}>
                <TextField
                    id="project-name"
                    type="text"
                    label="Project Name"
                    name="projectName"
                    required
                    helperText="Required"
                    onChange={(e)=> { setProjectName(e.target.value) }}
                />
                <TextField
                    id="description"
                    type="text"
                    label="Description"
                    name="description"
                    multiline
                    rows={6}
                    inputProps={{ maxLength: 2000 }}
                    helperText={descLength+'/2000'}
                    onChange={(e)=> { 
                        setDescription(e.target.value)
                        setDescLength(e.target.value.length)
                    }}
                />
            </Stack>
            <Stack direction="row" spacing={2} my={2} divider={<Divider orientation="vertical" flexItem />}>
                <DatePicker
                    id="start-date"
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                        if (endDate && newValue.isAfter(endDate)) {
                            setStartDate(newValue)
                            setDateError("End Date must be on or after Start Date")
                            return
                        }
                        setDateError('');
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <FormControl error={ dateError ? true : false }>
                    <DatePicker
                        id="end-date"
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            if (startDate && newValue.isBefore(startDate)) {
                                setEndDate(newValue)
                                setDateError("End Date must be on or after Start Date")
                                return
                            }
                            setDateError('');
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    { endDate && <FormHelperText id="end-date-error">{dateError}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="budget">Project Budget</InputLabel>
                    <OutlinedInput
                        id="budget"
                        type="number"
                        label="Project Budget"
                        name="budget"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        onChange={(e)=> { setBudget(e.target.value) }}
                    />
                </FormControl>
            </Stack>
            <TextField
                id="members"
                type="email"
                fullWidth={true}
                multiple
                label="Invite Team Members"
                name="members"
                onChange={(e)=> { setMembers(e.target.value) }}
                helperText="You can enter multiple emails separated by commas"
            />
            <Button mt={2} id="submit-btn" variant="contained" disabled={isDisabled} color="success" onClick={handleSubmit} startIcon={<SaveIcon />}>
                Save Project
            </Button>
        </Box>
        </>
    )
}

export default NewProject