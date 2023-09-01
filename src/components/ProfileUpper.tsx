import React from "react";
import CircularImage from "./CircularImage";

interface Props{
    image : string;
    name : string;
    text? : string;
};

const ProfileUpper = ({image, name, text}: Props) => {
    return(
        <>
            <div
                style={{ display: 'flex', gap: '28px',
                        alignItems: 'flex-start'
            }}>
                <CircularImage
                    size="98"
                    image={image}
                />
                <div
                    style={{ display: 'flex', flexDirection: 'column',
                            gap: '4px'
                }}>
                    <div
                        style={{ fontSize: '14px', fontStyle: 'normal',
                                fontWeight: '500', lineHeight: '150%',
                                color: 'var(--on-surface-active, #0A0A0A)'
                    }}>
                        {name}
                    </div>
                    <div
                        style={{ fontSize: '12px', fontStyle: 'normal',
                                fontWeight: '400', lineHeight: '160%',
                                color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                height: '60px', maxWidth: '334px',
                                width: '100%'
                    }}>
                        {text}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUpper;