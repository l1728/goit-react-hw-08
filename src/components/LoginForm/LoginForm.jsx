import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import style from './LoginForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log('login success');
      })
      .catch(error => {
        console.log('login error', error);
      });
    resetForm();
  };

  return (
    <div className={style.contRegLogForm}>
      <h2 className={style.titleRegLogForm}>Login,please!</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.regLogForm} autoComplete="off">
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
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
