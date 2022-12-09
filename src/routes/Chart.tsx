import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    darkMode: boolean;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId, darkMode} : ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId)
    );
    return (
        <div>
            {isLoading ? "Loading chart..." : (
                <ApexChart
                    type = "candlestick"
                    series={[
                        {
                            name: "candle",
                            data: data?.map((price) => {
                                return {x: `${('0' + new Date(price.time_close).getHours()).slice(-2)}:${('0' + new Date(price.time_close).getMinutes()).slice(-2)}`, y : [price.open, price.high, price.low, price.close]}
                            }) as []
                        },
                    ]}
                    options={{
                        theme: {
                          mode : darkMode ? "dark" : "light"
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 2,
                        },
                        xaxis: {
                            // type: 'datetime',
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: {
                                // rotate: -45,
                            },
                            tooltip: {enabled: false}
                        },
                        yaxis: {
                            tooltip: {enabled: false}
                        },
                    }}
                    plotoptions={{
                        candlestick: {
                            colors: {
                                upward: '#0be881',
                                downward: '#0097e6'
                            },
                            wick: {
                                useFillColor: true
                            }
                        }
                    }}
                />
            )}
        </div>
    )
}

export default Chart;