import {createContext, useContext} from "react";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";

export type MessageProp = {
    type?: "success" | "error" | "warning" | "info";
    image?: string;
    title?: string;
    message?: string;
    duration?: number | false;
}

export type MessageModel = {
    notify: (props: MessageProp) => void
}

const MessageContext = createContext<MessageModel>({
    notify: () => {
    }
})

export const MessageProvider = (props: any) => {
    const {children} = props;

    const notify = (props: MessageProp) => {
        const {title, message, image, type, duration} = props;

        toast(
            <div
                style={{paddingRight: 12}}>
                <Typography>
                    {title}
                </Typography>
                <Typography variant="caption">
                    {message}
                </Typography>
            </div>,
            {
                type: type,
                autoClose: duration || 5000,
                position: toast.POSITION.BOTTOM_LEFT,
                pauseOnFocusLoss: false,
                hideProgressBar: true
            }
        )
    }

    return (
        <MessageContext.Provider
            value={{notify}}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessage = (): MessageModel => useContext(MessageContext);