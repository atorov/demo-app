import styled from 'styled-components'
import { GiExitDoor } from 'react-icons/gi'
import { useAuthContext } from '../../auth-context'
import StyledButton from '../../../shared/components/styled/Button'
import StyledText from '../../../shared/components/styled/Text'

const CustomStyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4rem;
    min-height: 4rem;
    padding: 0 0.5rem;
    border-bottom: ${(props) => `1px solid ${props.theme.palette.border.primary}`};
    overflow: hidden;
`

const CustomStyledLogo = styled.img`
    display: block;
    width: 8rem;
`

const CustomStyledUserInfo = styled.div`
    padding: 0 1rem;
`

const CustomStyledUserName = styled(StyledText)`
    color: ${(props) => props.theme.palette.text.accent};
    font-weight: 800;
`

const CustomStyledUserRole = styled(StyledText)`
    font-size: 0.75rem;
`
const CustomStyledUserId = styled(StyledText)`
    font-size: 0.67rem;
`

const CustomStyledButton = styled(StyledButton)`
    display: block;
`

const TopBar = () => {
    const [authData, , { isAuth, logout }] = useAuthContext()

    return (
        <CustomStyledHeader>
            <CustomStyledLogo src="/img/logo.png" />
            <div style={{ flex: 1 }} />
            {isAuth ? (
                <>
                    <CustomStyledUserInfo>
                        <CustomStyledUserName>
                            {authData.data?.name}
                        </CustomStyledUserName>
                        <CustomStyledUserRole>
                            {` (${authData.data?.role})`}
                        </CustomStyledUserRole>
                        <br />
                        <CustomStyledUserId>
                            {authData.data?.userId}
                        </CustomStyledUserId>
                    </CustomStyledUserInfo>
                    <CustomStyledButton onClick={logout}>
                        <GiExitDoor />
                    </CustomStyledButton>
                </>
            ) : null}
        </CustomStyledHeader>
    )
}

export default TopBar
