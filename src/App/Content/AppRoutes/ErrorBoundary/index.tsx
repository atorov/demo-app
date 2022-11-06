import { Component } from 'react'
import PropTypes, { InferProps } from 'prop-types'

class ErrorBoundary extends Component<InferProps<typeof ErrorBoundary.propTypes>, any> {
    // eslint-disable-next-line react/static-property-placement
    public static propTypes: any = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
    }

    constructor(props: any) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            error,
        }
    }

    async componentDidCatch(error: any, info: any) {
        console.error('::: Error:', error, info)
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        }

        return (
            <div>
                <h3 style={{ marginTop: '48px', color: '#f00' }}>
                    Something went wrong!
                </h3>
                <p style={{ color: '#f00' }}>
                    Please try again later or contact support
                </p>
                <hr />
                <p style={{ color: '#f00' }}>
                    {String(this.state.error)}
                </p>
            </div>
        )
    }
}

export default ErrorBoundary
