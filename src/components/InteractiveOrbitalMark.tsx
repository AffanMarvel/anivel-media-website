"use client";

import React, { useState } from "react";

interface InteractiveOrbitalMarkProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * 3D Holographic Kinetic Orbital Mark
 * Based on: https://uiverse.io/Nawsome/cowardly-squid-50
 * Adapted for ANIVEL MEDIA brand identity with #CB2957 crimson and rose gold palette.
 */
export const InteractiveOrbitalMark: React.FC<InteractiveOrbitalMarkProps> = ({
  size = 300,
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Anivel Media 3D Kinetic Mark"
      style={{ width: size, height: size }}
    >
      <style jsx>{`
        .svg-frame {
          position: relative;
          width: 300px;
          height: 300px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          contain: paint layout;
          will-change: transform;
        }

        .svg-frame svg {
          position: absolute;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: calc(10 - var(--j));
          transform-origin: center;
          width: 344px;
          height: 344px;
          fill: none;
          will-change: transform;
        }

        .svg-frame:hover svg,
        .svg-frame.active svg {
          transform: rotate(-80deg) skew(30deg) translateX(calc(45px * var(--i))) translateY(calc(-35px * var(--i)));
        }

        .svg-frame svg #center {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .svg-frame:hover svg #center,
        .svg-frame.active svg #center {
          transform: rotate(-30deg) translateX(45px) translateY(-3px);
        }

        #out2 {
          animation: rotate16 8s ease-in-out infinite alternate;
          transform-origin: center;
        }

        #out3 {
          animation: rotate16 3.5s ease-in-out infinite alternate;
          transform-origin: center;
          stroke: #CB2957;
        }

        #inner3,
        #inner1 {
          animation: rotate16 4.5s ease-in-out infinite alternate;
          transform-origin: center;
        }

        #center1 {
          fill: #CB2957;
          animation: rotate16 2.5s ease-in-out infinite alternate;
          transform-origin: center;
        }

        @keyframes rotate16 {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Ambient Radial Backlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-crimson/15 blur-2xl transition-opacity duration-500 group-hover:bg-crimson/30 group-hover:blur-3xl" />

      <div
        className={`svg-frame ${isHovered ? "active" : ""}`}
        style={{ transform: `scale(${size / 300})` }}
      >
        {/* Layer 1 */}
        <svg style={{ "--i": 0, "--j": 0 } as React.CSSProperties}>
          <g id="out1">
            <path
              d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"
              fill="rgba(203, 41, 87, 0.05)"
            />
            <path
              strokeMiterlimit="16"
              strokeWidth="2"
              stroke="#CB2957"
              strokeOpacity="0.85"
              d="M72 172C72 116.772 116.772 72 172 72C227.228 72 272 116.772 272 172C272 227.228 227.228 272 172 272C116.772 272 72 227.228 72 172ZM197.322 172C197.322 158.015 185.985 146.678 172 146.678C158.015 146.678 146.678 158.015 146.678 172C146.678 185.985 158.015 197.322 172 197.322C185.985 197.322 197.322 185.985 197.322 172Z"
            />
          </g>
        </svg>

        {/* Layer 2 */}
        <svg style={{ "--i": 1, "--j": 1 } as React.CSSProperties}>
          <g id="out2">
            <path
              fill="#E63968"
              fillOpacity="0.75"
              d="M102.892 127.966L105.579 123.75L101.362 121.063L98.6752 125.28L102.892 127.966ZM90.2897 178.19L85.304 178.567L85.6817 183.553L90.6674 183.175L90.2897 178.19ZM94.3752 177.88L94.7529 182.866L99.7386 182.488L99.3609 177.503L94.3752 177.88ZM106.347 130.168L110.564 132.855L113.251 128.638L109.034 125.951L106.347 130.168ZM93.3401 194.968L91.9387 190.168L87.1391 191.569L88.5405 196.369L93.3401 194.968ZM122.814 237.541L119.813 241.54L123.812 244.541L126.813 240.542L122.814 237.541ZM125.273 234.264L129.272 237.265L122.814 237.541Z"
            />
          </g>
        </svg>

        {/* Layer 3 */}
        <svg style={{ "--i": 0, "--j": 2 } as React.CSSProperties}>
          <g id="inner3">
            <path
              fill="#F43F5E"
              fillOpacity="0.8"
              d="M195.136 135.689C188.115 131.215 179.948 128.873 171.624 128.946C163.299 129.019 155.174 131.503 148.232 136.099L148.42 136.382C155.307 131.823 163.368 129.358 171.627 129.286C179.886 129.213 187.988 131.537 194.954 135.975L195.136 135.689Z"
            />
            <path
              fill="#F43F5E"
              fillOpacity="0.8"
              d="M195.136 208.311C188.115 212.784 179.948 215.127 171.624 215.054C163.299 214.981 155.174 212.496 148.232 207.901L148.42 207.618C155.307 212.177 163.368 214.642 171.627 214.714C179.886 214.786 187.988 212.463 194.954 208.025L195.136 208.311Z"
            />
          </g>
          <path
            stroke="#CB2957"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            d="M240.944 172C240.944 187.951 235.414 203.408 225.295 215.738C215.176 228.068 201.095 236.508 185.45 239.62C169.806 242.732 153.567 240.323 139.5 232.804C125.433 225.285 114.408 213.12 108.304 198.384C102.2 183.648 101.394 167.25 106.024 151.987C110.654 136.723 120.434 123.537 133.696 114.675C146.959 105.813 162.884 101.824 178.758 103.388C194.632 104.951 209.472 111.97 220.751 123.249"
            id="out3"
          />
        </svg>

        {/* Layer 4 */}
        <svg style={{ "--i": 1, "--j": 3 } as React.CSSProperties}>
          <g id="inner1">
            <path
              fill="#FB7185"
              fillOpacity="0.85"
              d="M145.949 124.51L148.554 129.259C156.575 124.859 165.672 122.804 174.806 123.331C183.94 123.858 192.741 126.944 200.203 132.236C207.665 137.529 213.488 144.815 217.004 153.261C220.521 161.707 221.59 170.972 220.09 179.997L224.108 180.665L224.102 180.699L229.537 181.607C230.521 175.715 230.594 169.708 229.753 163.795L225.628 164.381C224.987 159.867 223.775 155.429 222.005 151.179C218.097 141.795 211.628 133.699 203.337 127.818C195.045 121.937 185.266 118.508 175.118 117.923C165.302 117.357 155.525 119.474 146.83 124.037C146.535 124.192 146.241 124.349 145.949 124.51Z"
            />
          </g>
        </svg>

        {/* Layer 5: Rotating Glowing Nucleus */}
        <svg style={{ "--i": 2, "--j": 4 } as React.CSSProperties}>
          <path
            fill="#CB2957"
            d="M180.956 186.056C183.849 184.212 186.103 181.521 187.41 178.349C188.717 175.177 189.013 171.679 188.258 168.332C187.503 164.986 185.734 161.954 183.192 159.65C180.649 157.346 177.458 155.883 174.054 155.46C170.649 155.038 167.197 155.676 164.169 157.288C161.14 158.9 158.683 161.407 157.133 164.468C155.582 167.528 155.014 170.992 155.505 174.388C155.997 177.783 157.524 180.944 159.879 183.439L161.129 182.259C159.018 180.021 157.648 177.186 157.207 174.141C156.766 171.096 157.276 167.989 158.667 165.245C160.057 162.5 162.261 160.252 164.977 158.806C167.693 157.36 170.788 156.788 173.842 157.167C176.895 157.546 179.757 158.858 182.037 160.924C184.317 162.99 185.904 165.709 186.581 168.711C187.258 171.712 186.992 174.849 185.82 177.694C184.648 180.539 182.627 182.952 180.032 184.606L180.956 186.056Z"
            id="center1"
          />
          <path
            fill="#FFFFFF"
            d="M172 166.445C175.068 166.445 177.556 168.932 177.556 172C177.556 175.068 175.068 177.556 172 177.556C168.932 177.556 166.444 175.068 166.444 172C166.444 168.932 168.932 166.445 172 166.445ZM172 177.021C174.773 177.021 177.021 174.773 177.021 172C177.021 169.227 174.773 166.979 172 166.979C169.227 166.979 166.979 169.227 166.979 172C166.979 174.773 169.227 177.021 172 177.021Z"
            id="center"
          />
        </svg>
      </div>
    </div>
  );
};
