// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ element, isAdmin }) => {
//   const auth = useSelector((state) => state.auth);
//   const isAuthenticated = auth.isAuthenticated;
//   const user = auth.user;
//   const navigate = useNavigate();
//   console.log('IsAuthenticated:', auth.isAuthenticated);
//   console.log('User:', auth.user);
//   useEffect(() => {
//     if (isAuthenticated === false) {
//       navigate('/login');
//     } else if (isAdmin && user.role !== 'admin') {
//       navigate('/');
//     }
//   }, [isAuthenticated, isAdmin, user, navigate]);

//   return isAuthenticated ? element : null;
// };

// // import React from 'react';
// // import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// // import store from '../../store';

// // import { combineReducers } from 'redux';
// // const rootReducer = store.reducer;
// // export type IRootState = ReturnType<typeof rootReducer>;
// // import { useSelector } from 'react-redux';

// // const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children })=> {
// //   const auth = useSelector((state: IRootState) => state.auth.isAuthenticated);
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   console.log('IsAuthenticated:', auth);

// //   // If authorized, return an outlet that will render child elements
// //   // If not, return element that will navigate to login page
// //   return children;
// // };

// // https://stackoverflow.com/questions/57472105/react-redux-useselector-typescript-type-for-state
// // https://stackoverflow.com/questions/57472105/react-redux-useselector-typescript-type-for-state/60885506#60885506
// export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    loading === false &&
    (isAuthenticated ? (
      isAdmin && user.role !== 'admin' ? (
        <Navigate to='/' />
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to='/login' />
    ))
  );
};

export default ProtectedRoute;
