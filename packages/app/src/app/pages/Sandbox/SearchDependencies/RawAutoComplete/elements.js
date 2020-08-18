import styled from 'styled-components';
import Color from 'color';

export const InputContainer = styled.div`
  display: flex;
  padding: 0.75em 1em;
  flex: 0 100%;
`;

export const TextInput = styled.div`
  flex: 1;
  position: relative;
`;

export const AutoCompleteInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.45px;
  color: ${props => Color(props.theme.colors.dialog.foreground).rgbString()};
  z-index: 2;
  width: 100%;
`;

const SubInput = styled(AutoCompleteInput)`
  color: ${props =>
    Color(props.theme.colors.dialog.foreground)
      .alpha(0.3)
      .rgbString()};
  background-color: transparent;
  z-index: 1;
  pointer-events: none;
`;

export const PrevInput = styled(SubInput)`
  width: auto;
  flex: initial;
  padding-right: 1ch;
`;

export const SuggestionInput = styled(SubInput)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
