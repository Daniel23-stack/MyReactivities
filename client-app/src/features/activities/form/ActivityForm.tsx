﻿import React, {ChangeEvent, useState} from "react";
import { Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";
import {Channel} from "diagnostics_channel";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit:(activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm ({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props){

    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''

    }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity);
    }
    function handleChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
            const {name, value} = event.target;
            setActivity({...activity,[name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='cancel'/>
            </Form>
        </Segment>
    )
}
