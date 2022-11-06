import * as React from 'react'
import { Suspense } from 'react'
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import Fallback from './Fallback'
import PrivateRoute from './PrivateRoute'

const CDashboard = React.lazy(() => import('./Dashboard'))
const CLogin = React.lazy(() => import('./Login'))
const CPage1 = React.lazy(() => import('./Page1'))

const AppRoutes = () => (
    <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
            <Routes>
                <Route
                    path="/login"
                    element={<CLogin />}
                />
                {['/', 'dashboard'].map((path) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <PrivateRoute>
                                <CDashboard />
                            </PrivateRoute>
                        )}
                    />
                ))}
                <Route
                    path="page1"
                    element={(
                        <PrivateRoute>
                            <CPage1 />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="*"
                    element={<Navigate replace to="/" />}
                />
            </Routes>
        </Suspense>
    </ErrorBoundary>
)

export default AppRoutes
