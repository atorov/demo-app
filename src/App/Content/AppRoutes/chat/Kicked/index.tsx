import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import StyledHeader from '../../../../../shared/components/styled/Header'

const CustomStyledHeader = styled(StyledHeader)`
    padding: 1rem 0;
    color: ${(props) => props.theme.palette.text.error};
`

const Kicked = () => {
    const { state } = useLocation()

    return (
        <CustomStyledHeader>
            {`Oh no! You were kicked for ${state?.kickReason || 'no reason'}!`}
        </CustomStyledHeader>
    )
}

export default Kicked
