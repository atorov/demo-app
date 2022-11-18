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
const CChatKicked = React.lazy(() => import('./chat/Kicked'))
const CChatLayout = React.lazy(() => import('./chat/Layout'))
const CChatRoom = React.lazy(() => import('./chat/Room'))
const CDashboard = React.lazy(() => import('./Dashboard'))
const CLogin = React.lazy(() => import('./Login'))
const CInfiniteQueries = React.lazy(() => import('./InfiniteQueries'))
const CPaginatedData = React.lazy(() => import('./PaginatedData'))
const CTaskDetails = React.lazy(() => import('./tasks/Details'))
const CTasksLayout = React.lazy(() => import('./tasks/Layout'))
const CTasksList = React.lazy(() => import('./tasks/List'))

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
                        <Route path="chat">
                            <Route
                                path="room"
                                element={<CChatRoom />}
                            />
                            <Route
                                path="kicked"
                                element={<CChatKicked />}
                            />
                        </Route>
                    </Route>
                    <Route
                        element={(
                            <PrivateRoute>
                                <CTasksLayout />
                            </PrivateRoute>
                        )}
                    >
                        <Route path="tasks">
                            <Route
                                index
                                element={<CTasksList />}
                            />
                            <Route
                                path=":taskId"
                                element={<CTaskDetails />}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="paginated-data"
                        element={(
                            <PrivateRoute>
                                <CPaginatedData />
                            </PrivateRoute>
                        )}
                    />
                    <Route
                        path="infinite-queries"
                        element={(
                            <PrivateRoute>
                                <CInfiniteQueries />
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
