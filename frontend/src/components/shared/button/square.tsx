import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

const SquareButton = styled(Button)`
  border-radius: 8px;
  width: 36px;
  height: 36px;
  min-width: auto;
  padding: 0;
  
  &.MuiButton-sizeSmall {
    width: 32px;
    height: 32px;
    svg {
      font-size: 18px;
    }
  }
`

export default SquareButton