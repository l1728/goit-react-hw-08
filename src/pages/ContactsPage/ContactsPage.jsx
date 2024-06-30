import DocumentTitle from '../../components/DocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoading } from '../../redux/contacts/selectors.js';
import { fetchContacts } from '../../redux/contacts/operations.js';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      <div>{isLoading && 'Request in progress...'}</div>
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
