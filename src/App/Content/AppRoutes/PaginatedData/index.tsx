import * as React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import StyledButton from '../../../../shared/components/styled/Button'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import StyledText from '../../../../shared/components/styled/Text'
import type { PaginatedData as TPaginatedData } from '../../../../shared/types/paginated-data'
import { useAppContext } from '../../../app-context'
import { useAuthContext } from '../../../auth-context'

// declare const BUILD_ENV: string

async function getPaginatedData(url: string, accessToken: string): Promise<TPaginatedData> {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
            },
        },
    )
    if (res.status !== 200) {
        throw new Error(`Status code: ${res.status}!`)
    }
    return res.json()
}

const CustomStyledUl = styled.ul`
    padding-left: 3rem;
`

const PaginatedData = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    const [page, setPage] = React.useState(1)
    const { isLoading, data, isError } = useQuery<TPaginatedData>(
        ['paginated-data', page],
        ({ queryKey }) => getPaginatedData(
            `${appData.api.baseUrl}/paginated-data?page=${queryKey[1]}`,
            String(authData.data?.accessToken),
        ),
        { keepPreviousData: true },
    )

    return (
        <StyledContainer>
            <StyledHeader>Paginated Data</StyledHeader>
            <br />

            <StyledButton
                disabled={isLoading || isError || page <= 1}
                onClick={() => {
                    setPage((prev) => prev - 1)
                }}
            >
                {'< Prev page'}
            </StyledButton>
            {` [${page} / ${data?.totalPages ?? '-'}] `}
            <StyledButton
                disabled={isLoading || isError || page >= Number(data?.totalPages)}
                onClick={() => {
                    setPage((prev) => prev + 1)
                }}
            >
                {'Next page >'}
            </StyledButton>
            <br />
            <br />

            {Array(data?.totalPages).fill(null).map((_, idx) => (
                <StyledButton
                    key={idx}
                    disabled={isLoading || isError}
                    onClick={() => setPage(idx + 1)}
                >
                    {idx + 1}
                </StyledButton>
            ))}
            <br />
            <br />

            <StyledText>
                {`Page: ${data?.page || '-'} | `}
            </StyledText>
            <StyledText>
                {`Count: ${data?.count || '-'} | `}
            </StyledText>
            <StyledText>
                {`Count/page: ${data?.countPerPage || '-'} | `}
            </StyledText>
            <StyledText>
                {`Total: ${data?.totalCount || '-'} | `}
            </StyledText>
            <StyledText>
                {`Pages: ${data?.totalPages || '-'}`}
            </StyledText>
            <br />
            <br />

            <CustomStyledUl>
                {data?.items.map((it) => (
                    <StyledText key={it.id} as="li">
                        {it.text}
                    </StyledText>
                ))}
            </CustomStyledUl>
        </StyledContainer>
    )
}

export default PaginatedData
