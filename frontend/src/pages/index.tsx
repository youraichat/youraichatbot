import React, {useEffect} from 'react';
import {NextPage} from "next";
import {AppLayout} from "@/layouts";
import {SeoProps} from "@/utils/types/layout.type";
import {ChatForm, ChatList} from "@/components/shared/chat";
import {HistoryHelper} from "@/model/conversation/historyHelper";
import {addMessageFx, initMessagesFx} from "@/model/conversation/effect";
import {useStore} from "effector-react";
import $conversation from "@/model/conversation/store";

const HomePage: NextPage = (props) => {
    const pageSeo: SeoProps = {
        title: "Your AI Chat",
        description: "",
        keywords: ["Chat Bot"],
        url: "https://youraichatbot.com/",
    }

    const historyHelper = new HistoryHelper();
    const {prompt} = useStore($conversation);


    const sendContent = async (message: string) => {
        await addMessageFx({message, prompt});
    }

    useEffect(()=>{
        initMessagesFx();
    }, [])

    return (
        <AppLayout seo={pageSeo}>
            <ChatList/>
            <ChatForm submit={sendContent}/>
        </AppLayout>
    );
};

export default HomePage;