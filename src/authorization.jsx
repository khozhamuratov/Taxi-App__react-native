import React, {useEffect, useState} from 'react';
import Loader from './components/Loader/Loader';
import {logined} from './features/users/usersSlice';
import isAuthenticated from './init/isAuthenticated';
import LoginPage from './pages/LoginPage/LoginPage';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import Tabs from './Tabs/Tabs';

const IsAuthorization = () => {
  const {isLogined} = useAppSelector(select => select.isLogined);
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    isAuthenticated().then(authenticated => {
      setLoader(false);
      if (authenticated) {
        dispatch(logined());
      }
    });
  }, [isLogined]);
  return isLogined ? <Tabs /> : loader ? <Loader /> : <LoginPage />;
};

export default IsAuthorization;
