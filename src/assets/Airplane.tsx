import React from "react";

interface Props {
  height?: number;
  width?: number;
  color: string;
}
export const AirplaneIcon = ({ color, height, width }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.297435 16.7608L4.14836 18.5783L3.33164 19.0133C3.10203 19.1471 3.00032 19.4589 3.10203 19.7301L4.21154 22.4545C4.26547 22.5884 4.36564 22.694 4.48584 22.7434C4.60449 22.8015 4.7401 22.8015 4.85875 22.7434L13.3003 18.219L13.4066 16.9352L13.5545 15.2181C13.5715 14.9891 13.7487 14.8218 13.9475 14.8429C14.0769 14.8553 14.1894 14.9468 14.2434 15.0842C14.2742 15.1476 14.288 15.2216 14.2834 15.2956L13.3049 27.1444C13.5237 27.3276 13.798 27.3945 14.0631 27.3364C14.436 27.2237 14.7673 26.7253 15.0416 25.9046L18.9572 12.5869L19.0697 12.2083C19.1267 11.9864 19.3302 11.8596 19.5259 11.9248C19.72 11.9917 19.831 12.2241 19.774 12.446C19.7693 12.4566 19.7678 12.4672 19.7647 12.476L19.3825 13.7528L18.9526 15.2181L25.5634 11.6782C27.4727 10.6585 28.4543 8.59447 27.7948 6.9848C27.4203 6.14298 26.7038 5.57061 25.8824 5.4579C24.9702 5.30116 24.0379 5.46494 23.2088 5.92812L15.7227 9.92059L7.68646 6.33494C6.67403 5.89994 5.87118 5.91051 5.30872 6.37545C4.83718 6.81749 4.56905 7.48319 4.57984 8.18236C4.58446 8.35671 4.66305 8.52226 4.78941 8.62264L10.2029 12.8617L7.09935 14.54L1.89698 13.0519C1.68432 12.9938 1.46242 13.1029 1.35455 13.3196L0.0632056 15.9718C-0.0693189 16.2413 0.0138942 16.5812 0.249665 16.7326C0.265075 16.7432 0.282026 16.752 0.297435 16.7608Z"
        fill={color}
      />
    </svg>
  );
};