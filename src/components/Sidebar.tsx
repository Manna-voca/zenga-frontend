import React from "react";
import ChannelList from "./ChannelList";

const Sidebar = () => {
    return(
        <>
            <div style={{ width: '300px', height: '100%',
                        position: 'fixed', top: '0px',
                        backgroundColor: 'white', zIndex: '2',
                        overflow: 'scroll'
            }}>
                <div
                    style={{ height: '44px', marginLeft: '20px',
                            fontSize: '21px', fontStyle: 'normal',
                            fontWeight: '600', lineHeight: '150%',
                            display: 'flex', alignItems: 'center'
                }}>
                    <span>채널 변경</span>
                </div>
                <ChannelList type="new"></ChannelList>
                <ChannelList name="가나다"></ChannelList>
                <ChannelList name="라마바"></ChannelList>
                <ChannelList name="사아자"></ChannelList>
                <ChannelList name="차카타"></ChannelList>
                <ChannelList name="파하"></ChannelList>
                <ChannelList name="moa"></ChannelList>
                <ChannelList name="zenga"></ChannelList>
                <ChannelList name="만나보카"></ChannelList>
                <ChannelList name="석방"></ChannelList>
                <ChannelList name="가나다"></ChannelList>
                <ChannelList name="라마바"></ChannelList>
                <ChannelList name="사아자"></ChannelList>
                <ChannelList name="차카타"></ChannelList>
                <ChannelList name="파하"></ChannelList>
                <ChannelList name="moa"></ChannelList>
                <ChannelList name="zenga"></ChannelList>
                <ChannelList name="만나보카"></ChannelList>
                <ChannelList name="석방"></ChannelList>
            </div>
        </>
    );
}

export default Sidebar;