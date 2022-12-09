import styled from "styled-components";
import { Link } from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";

//style
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
  overflow: hidden;
`;
const Header = styled.header`
  position: relative;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;
const Coin = styled.li`
  background-color: ${props => props.theme.boxBgColor};
  font-size: 20px;
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  padding: 10px 30px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;
const CoinList = styled.ul``;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.theme.accentColor};
`;
const Loader = styled.p`
    text-align: center;
`;
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;
const Toggle = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  font-weight: 700;
  padding: 10px 20px;
  background-color: ${props => props.theme.accentColor};
  color: #fff;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

//data interface type
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
interface IRouterProps {
    toggleDark: () => void;
}

function Coins( {toggleDark} : IRouterProps ){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
                <Toggle onClick={toggleDark}>Toggle Mode</Toggle>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> :
                <CoinList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{pathname : `/${coin.id}`, state : {name : coin.name}}}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            }
        </Container>
    )
}

export default Coins;