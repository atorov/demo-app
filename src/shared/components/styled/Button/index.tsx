import styled from 'styled-components'

const Button = styled.button.attrs((props) => ({
    type: props.type ?? 'button',
}))`
    height: 2rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.palette.background.accent};
    color: ${(props) => props.theme.palette.text.accent};
    font-size: 1rem;
    cursor: pointer;

    :hover {
        background-color: ${(props) => props.theme.palette.background.hover};;
    }

    :disabled {
        background-color: ${(props) => props.theme.palette.background.disabled};
        color: ${(props) => props.theme.palette.text.disabled};
        cursor: not-allowed;
    }
`

export default Button
