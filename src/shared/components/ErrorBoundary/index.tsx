import React, { Component } from 'react'

type Props = {
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        }
    }

    public async componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('::: Error:', error, info)
    }

    public render() {
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
