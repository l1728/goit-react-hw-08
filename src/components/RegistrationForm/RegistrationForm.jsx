import { Field, Formik, Form, ErrorMessage } from 'formik';
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
        console.log('Registration successful! Welcome!');
      })
      .catch(error => {
        console.error('Registration error. Please try again.', error);
      });
    resetForm();
  };

  return (
    <div className={style.contRegLogForm}>
      <h2 className={style.titleRegLogForm}>Register,please!</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.regLogForm} autoComplete="off">
          <div className={style.inputGroup}>
            <label className={style.regLoglabel} htmlFor="name">
              Name
            </label>
            <Field
              className={style.regLogInput}
              type="text"
              name="name"
              id="name"
            />
            <ErrorMessage className={style.error} name="name" component="div" />
          </div>
          <div className={style.inputGroup}>
            <label className={style.regLoglabel} htmlFor="email">
              Email
            </label>
            <Field
              className={style.regLogInput}
              type="email"
              name="email"
              id="email"
            />
            <ErrorMessage
              className={style.error}
              name="email"
              component="div"
            />
          </div>
          <div className={style.inputGroup}>
            <label className={style.regLoglabel} htmlFor="password">
              Password
            </label>
            <Field
              className={style.regLogInput}
              type="password"
              name="password"
              id="password"
            />
            <ErrorMessage
              className={style.error}
              name="password"
              component="div"
            />
          </div>
          <button className={style.regButton} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
