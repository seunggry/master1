import styled from "styled-components";

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 50%;
    border: 10px solid ${props => props.borderColor};
`;

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

interface bgColorProps {
    bgColor: string;
    borderColor?: string;
}

function Circle({bgColor, borderColor} : bgColorProps){
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />
    )
}

export default Circle;