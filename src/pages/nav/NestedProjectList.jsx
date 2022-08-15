import React, { useEffect, useState, } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { useAuthContext } from '../../hooks/useAuthContext';
import { projectFirestore } from '../../firebase/config';


export default function NestedProjectList() {
    const [open, setOpen] = useState(false);
    const [userProjects, setUserProjects] = useState([]);
    const auth = useAuthContext();

    useEffect(()=> {
        if (auth.user && !open)
        setUserProjects(queryUserProjects());
    }, [auth, location.pathname]) // location as dependency fixed bug when adding a new project

    function queryUserProjects() {
        let results = [];
		let ref = projectFirestore.collection('test-projects');
		ref = ref.where('owner', '==', auth.user.uid);
        // Add ordering later... something like this:
        // ref = ref.orderBy('createdAt', 'desc');
		ref.onSnapshot(
			(snapshot) => {
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});
			},
			(error) => {
				console.log(error, "couldn't fetch data");
			}
		);
        return results
	}

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="My Projects" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {userProjects.map((project, index)=> (
                        <ListItemButton key={index} to={`/projects/${project.id}`} inset="true">
                            <ListItemIcon sx={{ pl: 2 }}>
                                <SummarizeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={project.name} sx={{ pl: 2 }} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}