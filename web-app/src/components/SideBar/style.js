import styled from 'styled-components';

const TitleStyled = styled.button`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.color || "palevioletred"};
`;

export default TitleStyled;
