import styled from 'styled-components'

const Button = styled.button`
    height: 2rem;
    /* line-height: rem; */
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: darkgreen;
    color: yellowgreen;
    cursor: pointer;

    &:hover {
        background-color: green;
    }

    &:disabled {
        background-color: gray;
        color: lightgrey;
        cursor: not-allowed;
    }
`

export default Button
