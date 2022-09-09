import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";
import { useStore } from "../../stores/store";

export default observer(function LoginForm() {
  const {userStore} = useStore();
  return (
    <Formik
    initialValues={{email: '', password: ''}}
    onSubmit={values => userStore.login(values)}
    >
      {({handleSubmit, isSubmitting}) => (
        <Form className="ui form" on onSubmit={handleSubmit} autoComplete='off'>
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type='password' />
          <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
})