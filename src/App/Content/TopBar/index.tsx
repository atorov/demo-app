import styled from 'styled-components'
import { GiExitDoor } from 'react-icons/gi'
import { useAuthContext } from '../../auth-context'
import Button from '../../../shared/components/styled/Button'
import Text from '../../../shared/components/styled/Text'

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4rem;
    min-height: 4rem;
    padding: 0 0.5rem;
    border-bottom: 1px solid lightgray;
    overflow: hidden;
`

const StyledLogo = styled.img.attrs((props) => props)`
    display: block;
    width: 8rem;
`

const StyledUserInfo = styled.div`
    padding: 0 1rem;
`

const StyledUserName = styled(Text)`
    color: yellowgreen;
    font-weight: 800;
`

const StyledUserRole = styled(Text)`
    font-size: 0.75rem;
`
const StyledUserId = styled(Text)`
    font-size: 0.67rem;
`

const TopBar = () => {
    const [authData, , { isAuth, logout }] = useAuthContext()

    return (
        <StyledHeader>
            <StyledLogo src="/img/logo.png" />
            <div style={{ flex: 1 }} />
            {isAuth ? (
                <>
                    <StyledUserInfo>
                        <StyledUserName>
                            {authData.data?.name}
                        </StyledUserName>
                        <StyledUserRole>
                            {` (${authData.data?.role})`}
                        </StyledUserRole>
                        <br />
                        <StyledUserId>
                            {authData.data?.userId}
                        </StyledUserId>
                    </StyledUserInfo>
                    <Button
                        style={{ display: 'block' }}
                        onClick={logout}
                    >
                        <GiExitDoor />
                    </Button>
                </>
            ) : null}
        </StyledHeader>
    )
}

export default TopBar
