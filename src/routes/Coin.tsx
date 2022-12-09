import { Link, useRouteMatch, Switch, Route, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import {fetchCoinInfo, fetchCoins, fetchCoinTickers} from "../api";
import {useQuery} from "react-query";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.boxBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0;
`;
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  margin: 30px 0;
  height: 15vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  align-items: center;
  color: ${props => props.theme.accentColor};
`;
const Loader = styled.p`
    text-align: center;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isActive : boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  //background-color: rgba(140, 122, 230, 0.2);
  background-color: ${props => props.isActive ? props.theme.accentColor : props.theme.boxBgColor};
  padding: 12px 0;
  border-radius: 10px;
  color: ${props => props.isActive ? "#fff" : props.theme.subTextColor2};
  a {
    display: block;
  }
`;
const HomeBtn = styled.div`
    width: 100%;
    a{
      font-weight: 700;
      padding: 10px 20px;
      background-color: ${props => props.theme.accentColor};
      color: #fff;
      border-radius: 10px;
    }
`;

interface RouteParams{
    coinId: string;
}
interface RouteState {
    name: string;
}
interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}
interface ICoinProps{
    darkMode: boolean;
}

function Coin({darkMode} : ICoinProps){
    const { coinId } = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId)
    );
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
        ["ticker", coinId],
        () => fetchCoinTickers(coinId)
    );
    const loading = infoLoading || tickersLoading;
    return (
            <Container>
                <Header>
                    <HomeBtn>
                        <Link to="/">Home</Link>
                    </HomeBtn>
                    <Title>
                        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                    </Title>
                </Header>
                {loading ? (<Loader>Loading...</Loader>) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    
                    <Switch>
                        <Route path={`/:coinId/price`}>
                            <Price darkMode={darkMode} coinId={coinId} />
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart darkMode={darkMode} coinId={coinId} />
                        </Route>
                    </Switch>
                </>
                )}
        </Container>
    )
}

export default Coin;