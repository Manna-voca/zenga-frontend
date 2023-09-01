import React from "react";
import { ReactComponent as CameraImg } from "../images/camera.svg";

interface Props {
    image? : any;
    handleProfileImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputProfile = ({image, handleProfileImageUpload}: Props) => {
    return(
        <>
            <div
                style={{ height: '98px', width: '98px',
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center'
            }}>
                <label
                    htmlFor="ex_file"
                    style={{ width: '98px', height: '98px',
                            display: 'inline-block'
                }}>
                    <div
                        style={{ height: '98px', width: '98px',
                                borderRadius: '500px', cursor: 'pointer',
                                border: '1px solid var(--surface-outline, rgba(10, 10, 10, 0.10))',
                                background: 'var(--surface-surface, #FAFAFA)',
                                display: 'flex', justifyContent: 'center',
                                alignItems: 'center'
                    }}>
                        {image !== undefined ? (
                            <div
                                style={{ backgroundImage: `url(${image})`, height: '98px',
                                        width: '98px', borderRadius: '500px',
                                        backgroundPosition: '50% 50%', backgroundSize: 'cover'
                            }}></div>
                        ) : (
                            <CameraImg width={32} height={32}/>
                        )}
                    </div>
                    <input
                        style={{ width: '0', height: '0' }}
                        type="file"
                        id="ex_file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleProfileImageUpload}
                    />
                </label>
            </div>
        </>
    );
}

export default InputProfile;