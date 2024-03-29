﻿import React from "react";
import {Grid, List} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities: Activity[]
    selectedActivity: Activity | undefined;
    selectActivity:(id: string) => void;
    cancelSelectActivity: () => void
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting : boolean;
}

export default function ActivityDashboard ({activities,
                                               selectActivity,
                                               selectedActivity,
                                               createOrEdit, deleteActivity,
                                               cancelSelectActivity,submitting, openForm, closeForm, editMode}: Props){
    
       
    return(
            <Grid>
                <Grid.Column width='10'>
                    <List>
                       <ActivityList activities={activities}
                                     submitting={submitting}
                                     deleteActivity={deleteActivity} 
                                     selectActivity={selectActivity}/>
                    </List>
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity}
                                     cancelSelectActivity={cancelSelectActivity}
                                     openForm={openForm}
                    />}
                    { editMode &&
                    <ActivityForm
                        submitting={submitting}
                        closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
                </Grid.Column>
            </Grid>
        )
}
