import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../common/form/MyTextInput";
import MySelectInput from "../../../common/form/MySelectInput";
import MyTextArea from "../../../common/form/MyTextArea";
import { categoryOptions } from "../../../common/options/categoryOptions";
import MyDateInput from "../../../common/form/MyDateInput";

export default observer(function ActivityForm() {
  const {activityStore} = useStore();
  const {loadActivity, loading, loadingInitial} = activityStore;
  const {id} = useParams<{id: string}>();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required()
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />

  return (
    <Segment clearing>
      <Formik
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={activity} 
      onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />

            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
            <MyDateInput
            placeholderText="Date"
            name="date"
            showTimeSelect
            timeCaption="time"
            dateFormat='MMMM d, yyyy h:mm aa'
            />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button loading={loading} floated="right" positive type="submit" content='Submit' />
            <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})