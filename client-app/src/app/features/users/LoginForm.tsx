import { Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";

export default function LoginForm() {
  return (
    <Formik
    initialValues={{email: '', password: ''}}
    onSubmit={values => console.log(values)}
    >
      {({handleSubmit}) => (
        <Form className="ui form" on onSubmit={handleSubmit} autoComplete='off'>
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type='password' />
          <Button positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
}