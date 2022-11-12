import styled from 'styled-components'

const Input = styled.input`
    height: 2rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid green;
    color: gray;

    :disabled {
        background-color: lightgrey;
        border: none;
        color: lightgrey;
        cursor: not-allowed;
    }
`

export default Input
