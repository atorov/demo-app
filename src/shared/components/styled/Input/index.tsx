import styled from 'styled-components'

const Input = styled.input`
    height: 2rem;
    padding: 0.5rem;
    border-radius: ${(props) => props.theme.border.radius};
    border: ${(props) => `1px solid ${props.theme.palette.border.accent}`};
    color: ${(props) => props.theme.palette.text.primary};

    :disabled {
        background-color: ${(props) => props.theme.palette.background.disabled};
        border: none;
        color: ${(props) => props.theme.palette.text.disabled};
        cursor: not-allowed;
    }
`

export default Input
