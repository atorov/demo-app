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

const CBitStampData = React.lazy(() => import('./BitStampData'))
const CChatLayout = React.lazy(() => import('./chat/Layout'))
const CChatRoom = React.lazy(() => import('./chat/Room'))
const CDashboard = React.lazy(() => import('./Dashboard'))
const CLogin = React.lazy(() => import('./Login'))
const CPage1 = React.lazy(() => import('./Page1'))

const AppRoutes = () => (
    <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
            <Routes>
                <Route path="/">
                    <Route
                        path="login"
                        element={<CLogin />}
                    />
                    <Route
                        index
                        element={(
                            <PrivateRoute>
                                <CDashboard />
                            </PrivateRoute>
                        )}
                    />
                    {['home', 'dashboard'].map((path) => (
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
                        path="bitstamp-data"
                        element={(
                            <PrivateRoute>
                                <CBitStampData />
                            </PrivateRoute>
                        )}
                    />
                    <Route
                        element={(
                            <PrivateRoute>
                                <CChatLayout />
                            </PrivateRoute>
                        )}
                    >
                        <Route
                            path="chat"
                            element={<CChatRoom />}
                        />
                    </Route>
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
                </Route>
            </Routes>
        </Suspense>
    </ErrorBoundary>
)

export default AppRoutes
