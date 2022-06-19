import styled from 'styled-components';

const CenterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.w || "100%"};
  height: ${props => props.h || "100%"};

  padding: ${props => {
    return (props.pt || props.p || "0") + "px " +
      (props.pr || props.p || "0") + "px " +
      (props.pb || props.p || "0") + "px " +
      (props.pl || props.p || "0") + "px";
  }};

  margin: ${props => {
    return (props.mt || props.m || "0") + "px " +
      (props.mr || props.m || "0") + "px " +
      (props.mb || props.m || "0") + "px " +
      (props.ml || props.m || "0") + "px";
  }};
`;

export default CenterStyled;
