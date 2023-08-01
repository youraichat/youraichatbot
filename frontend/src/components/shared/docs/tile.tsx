import React, {FC, useState} from 'react';
import {
    Card,
    CardContent,
    Checkbox,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Stack,
    Typography
} from "@mui/material";
import {DeleteOutlined, MoreHoriz} from "@mui/icons-material";
import Image from "next/image";
import {styled} from "@mui/material/styles";
import SquareButton from "@/components/shared/button/square";
import {useStore} from "effector-react";
import $theme from "@/model/theme/store";
import DeleteConformation from "@/components/conversation/confirm";
import {deleteDocApi} from "@/api";

interface Props {
    doc: { filename: string, type: string };
    getHandle: () => void;
    selectDoc: (filename: string) => void;
    deselectDoc: (filename: string) => void;
    selected: boolean;
}

const DocTile: FC<Props> = (props) => {
    const {doc, getHandle, selected, selectDoc, deselectDoc} = props;

    const themeSettings = useStore($theme);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [dlt, setDlt] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteHandle = () => {
        setAnchorEl(null);
        setDlt(true);
    }

    const submitHandle = async (value: boolean) => {
        if (value) {
            await deleteDocApi(doc.filename);
            getHandle();
        }

        setDlt(false)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <DocCardWrap sx={{borderRadius: "12px"}}>
            <DeleteConformation
                open={dlt}
                callback={submitHandle}
                title="Delete File"
                description="Are you sure delete this document?"/>
            <CardContent sx={{pr: 5}} style={{paddingBottom: 16}}>
                <Stack
                    spacing={2}
                    direction="row">
                    <Image
                        alt="PDF Icon"
                        src={doc.type === "TXT" ? "/svgs/txt.svg": "/svgs/pdf.svg"}
                        width={50}
                        height={50}/>
                    <Stack>
                        <Typography fontSize={18}><b>Document</b></Typography>
                        <Typography variant="caption">
                            {doc.filename.substring(0, 15)} {doc.filename.length > 15 && ".. " + doc.filename.slice(-10)}
                        </Typography>
                    </Stack>
                </Stack>
                <SquareButton
                    onClick={handleClick}
                    size="small"
                    color="info"
                    className="action">
                    <MoreHoriz/>
                </SquareButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            borderRadius: "12px",
                            minWidth: 200
                        }
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <MenuList>
                        <MenuItem onClick={deleteHandle}>
                            <ListItemIcon>
                                <DeleteOutlined />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Popover>
                {
                    themeSettings.checkbox &&
                    <Checkbox
                        checked={selected}
                        onChange={(e)=>{
                            e.target.checked ? selectDoc(doc.filename) : deselectDoc(doc.filename)
                        }}
                        size="small"
                        className="list-item-checkbox"
                        color="info"
                        edge="end"
                        inputProps={{ 'aria-labelledby': "id" }}
                    />
                }
            </CardContent>
        </DocCardWrap>
    );
};

const DocCardWrap = styled(Card)`
  position: relative;
  cursor: pointer;
  transition: all .3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px;
  
  .action {
    position: absolute;
    top: 6px;
    right: 8px;
  },
  
  &:hover {
    transform: translateY(-2px);
    transition: all .3s;
    box-shadow: rgba(50, 50, 93, 0.25) 0 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }
`

export default DocTile;