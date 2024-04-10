import React, {useEffect} from 'react';
import {logined} from './features/users/usersSlice';
import isAuthenticated from './init/isAuthenticated';
import LoginPage from './pages/LoginPage/LoginPage';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import Tabs from './Tabs/Tabs';

const ViewTab = () => {
  return <Tabs />;
};

const ViewLoginPage = () => {
  return <LoginPage />;
};

const IsAuthorization = () => {
  const {isLogined} = useAppSelector(select => select.isLogined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isAuthenticated().then(authenticated => {
      if (authenticated) {
        dispatch(logined());
      }
    });
  }, [isLogined]);
  return isLogined ? <ViewTab /> : <LoginPage />;
};

export default IsAuthorization;
