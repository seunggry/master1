import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import styled from "styled-components";

const PriceWrap = styled.div`
    overflow: auto;
    min-height: 500px;
`;

const Table = styled.table`
    overflow: hidden;
    font-size: 14px;
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
`;

const Thead = styled.thead`
    background-color: ${props => props.theme.boxBgColor};
    
    td{
      padding: 20px 0;
      text-align: center;
      font-weight: 500;
    }
`;

const Tbody = styled.tbody`
    td{
      padding: 20px 0;
      text-align: center;
      color: ${props => props.theme.subTextColor1};
      border-bottom: 1px solid #ddd;
    }
`;

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

function Price({coinId} :ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["price", coinId],
        () => fetchCoinHistory(coinId)
    );
    return (
        <PriceWrap>
            {isLoading ? "Loading price..." : (
                <Table>
                    <Thead>
                        <tr>
                            <td>시간</td>
                            <td>시작가</td>
                            <td>종료가</td>
                            <td>최고가</td>
                            <td>최저가</td>
                        </tr>
                    </Thead>
                    <Tbody>
                        {data?.map((price) => (
                            <tr key={price.time_open}>
                                <td>{('0' + new Date(price.time_close).getHours()).slice(-2)}:{('0' + new Date(price.time_close).getMinutes()).slice(-2)}</td>
                                <td>${price.open}</td>
                                <td>${price.close}</td>
                                <td>${price.high}</td>
                                <td>${price.low}</td>
                            </tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </PriceWrap>
    )
}

export default Price;