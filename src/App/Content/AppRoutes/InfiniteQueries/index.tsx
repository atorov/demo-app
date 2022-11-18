// import * as React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import StyledButton from '../../../../shared/components/styled/Button'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import StyledText from '../../../../shared/components/styled/Text'
import type { PaginatedData as TPaginatedData } from '../../../../shared/types/paginated-data'
import { useAppContext } from '../../../app-context'
import { useAuthContext } from '../../../auth-context'

async function getMoreData(url: string, accessToken: string): Promise<TPaginatedData> {
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

const InfiniteQueries = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    const {
        isLoading, isFetching, isFetchingNextPage, data, isError, error, hasNextPage, fetchNextPage,
    } = useInfiniteQuery<TPaginatedData, Error>(
        ['infinite-queries'],
        ({ pageParam = 1 }) => getMoreData(
            `${appData.api.baseUrl}/paginated-data?page=${pageParam}`,
            String(authData.data?.accessToken),
        ),
        {
            getNextPageParam: (lastPage, pages) => {
                if (pages.length < lastPage.totalPages) {
                    return pages.length + 1
                }
                return undefined
            },
        },
    )

    return (
        <StyledContainer>
            <StyledHeader>Infinite Queries</StyledHeader>
            <br />

            {isLoading ? (
                <StyledText as="p">Loading...</StyledText>
            ) : null}

            {isFetching ? (
                <StyledText as="p">Fetching...</StyledText>
            ) : null}

            {isFetchingNextPage ? (
                <StyledText as="p">Fetching next page...</StyledText>
            ) : null}

            {isError ? (
                <StyledText as="p">{error.message}</StyledText>
            ) : null}

            <br />
            <CustomStyledUl>
                {data?.pages.map((pit, pidx) => pit.items.map((it) => (
                    <StyledText key={it.id} as="li">
                        {`page: ${pidx + 1}, item: ${it.text}`}
                    </StyledText>
                )))}
            </CustomStyledUl>
            <br />

            <StyledButton
                disabled={isFetching || isError || !hasNextPage}
                onClick={() => fetchNextPage()}
            >
                Fetch more
            </StyledButton>
        </StyledContainer>
    )
}

export default InfiniteQueries
