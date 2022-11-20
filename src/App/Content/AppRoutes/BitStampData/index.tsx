import * as React from 'react'

type JsonResponse = {
    channel: string
    data: {
        asks: [string, string][]
        bids: [string, string][]
        microtimestamp: string
        timestamp: string
        _date?: Date
    }
    event: string
}

const BitStampData = () => {
    const [data, setData] = React.useState<JsonResponse['data']>()

    React.useEffect(() => {
        const ws = new WebSocket('wss://ws.bitstamp.net')
        ws.onopen = () => {
            ws.send(JSON.stringify({
                event: 'bts:subscribe',
                data: { channel: 'order_book_btcusd' },
            }))
        }
        ws.onmessage = (event) => {
            const json: NonNullable<JsonResponse> = JSON.parse(event.data)
            try {
                if (json.event === 'data') {
                    setData({
                        ...json.data,
                        asks: json.data.asks.slice(0, 5),
                        bids: json.data.bids.slice(0, 5),
                        _date: new Date(+json.data.microtimestamp / 1000),
                    })
                }
            }
            catch (error) {
                console.error('::: Error:', error)
            }
        }
        return () => {
            if (ws.readyState) { // Not quite correct actually ...
                ws.close()
            }
        }
    }, [])

    return (
        <div
            style={{
                flex: 1,
                overflow: 'auto',
            }}
        >
            <h3>
                <a
                    target="_blank"
                    href="https://bitstamp.net"
                    rel="noreferrer"
                >
                    bitstamp.net Data
                </a>
            </h3>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}

export default BitStampData
