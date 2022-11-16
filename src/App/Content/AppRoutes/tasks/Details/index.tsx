import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import StyledText from '../../../../../shared/components/styled/Text'
import type { Task } from '../../../../../shared/types/tasks'
import { useAppContext } from '../../../../app-context'
import { useAuthContext } from '../../../../auth-context'
import getOneTask from '../shared/api/get-one-task'
import Card from '../shared/components/Card'

const Details = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    const params = useParams()

    const queryClient = useQueryClient()

    const {
        isLoading, data, isError, error,
    } = useQuery<Task, Error>(
        ['task', params.taskId],
        ({ queryKey }) => getOneTask(`${appData.api.baseUrl}/tasks/${queryKey[1]}`, String(authData.data?.accessToken)),
        {
            initialData: () => {
                const t = queryClient.getQueryData<Task[]>('tasks')?.find((it) => it.id === params.taskId)
                if (!t) return undefined
                return {
                    ...t,
                    description: undefined,
                    categories: [],
                    updatedAt: null,
                    fetchedAt: undefined,
                    isCachedFromTheList: true,
                }
            },
        },
    )

    return (
        <>
            {isLoading ? <StyledText as="p">Loading...</StyledText> : null}
            {isError ? <StyledText as="p">{error.message}</StyledText> : null}
            {data ? <Card showButtons={false} task={data} /> : null}
            <br />
            <Link to="../">
                {'< Back'}
            </Link>
        </>
    )
}

export default Details
