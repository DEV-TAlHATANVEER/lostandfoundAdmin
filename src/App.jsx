import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from './components';
import { Dashboard, PageNotFound, PostDetail, Login } from './screens';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme/theme';
import { GlobalStyles } from './styles/global/GlobalStyles';
import { login, fetchPosts } from './redux/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const authenticated = useSelector(state => state.auth.authenticated);
  const posts = useSelector(state => state.auth.posts); // Get posts from state
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await AsyncStorage.getItem('authenticated');
      if (isAuth) {
        dispatch(login()).then(() => {
          dispatch(fetchPosts()); // Fetch posts after successful login
        });
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('Fetched posts:', posts); // Print posts to console
    }
  }, [posts]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<BaseLayout />}>
            {authenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/post-detail" element={<PostDetail />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
