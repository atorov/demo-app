import { useLocation, useNavigate } from 'react-router-dom'

const Kicked = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    return (
        <>
            <h2>Oh no!</h2>
            <h2>
                {`You were kicked for ${state?.kickReason || 'no reason'}!`}
            </h2>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    Go back home
                </button>
            </div>
        </>
    )
}

export default Kicked
