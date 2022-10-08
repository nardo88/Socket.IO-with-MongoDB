import React from "react";

import { generateAvatarFromHash } from "../../utils/helpers";

import "./Avatar.scss";

const Avatar = ({ user, size = 30 }:any) => {
  if (user.avatar) {
    return (
      <img
        className="avatar"
        style={{width: `${size}px`, height: `${size}px`}}
        src={user.avatar}
        alt={`Avatar ${user.fullname}`}
      />
    );
  } else {
    const { color, colorLighten } = generateAvatarFromHash(user.id);
    const firstChar = user.name[0].toUpperCase();
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
          width: `${size}px`,
          height: `${size}px`
        }}
        className="avatar avatar--symbol"
      >
        {firstChar}
      </div>
    );
  }
};



export default Avatar;