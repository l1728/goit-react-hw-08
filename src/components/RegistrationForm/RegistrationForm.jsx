import { ErrorMessage, Field, Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';

import style from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    console.log('Submitting values:', values);
    dispatch(register(values))
      .unwrap()
      .then(() => {
        console.log('registration success');
      })
      .catch(error => {
        console.error('registration error', error);
      });
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={style.form} autoComplete="off">
          <div>
            <label className={style.label} htmlFor="name">
              Name
            </label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label className={style.label} htmlFor="email">
              Email
            </label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label className={style.label} htmlFor="password">
              Password
            </label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
