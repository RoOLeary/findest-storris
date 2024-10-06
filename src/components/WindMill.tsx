export const WindMill = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 65 65"
        viewBox="0 0 65 65"
        id="windmillIcon"
      >
        <line
          x1="1.5"
          x2="63.5"
          y1="63.5"
          y2="63.5"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M27.6 29.2l1-1-3.4-3.4-4.3 4.3h-2.5c.7-4 5.6-7.5 9.4-9.6l.7.7 2.3-2.3 0 0c1-.4 1.6-.7 1.6-.7s2.1.8 4.7 2.3l-.7.7 3.4 3.4 1.5-1.5c2.6 1.9 4.9 4.3 5.3 7L27.6 29.2 27.6 29.2z"
        />
        <path
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M53.4,63.5H11.6c4-8.5,6.9-17.2,8.1-26.5l7.8-7.8h7.9L33,31.6l13.7,13.7C48.4,51.5,50.6,57.6,53.4,63.5z"
        />
        <path
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M43.5,63.5h-22c2.6-10.4,4.3-21.2,4.6-32.8l1.5-1.5h7.9l-2.4,2.4l6.1,6.1C39.9,46.7,41.4,55.2,43.5,63.5z"
        />
        <circle
          cx="32.5"
          cy="32.5"
          r="21.9"
          style={{ fill: 'none', stroke: 'none' }}
        />

        <g id="mill">
          <g id="sail-group">
            <rect
              className="windmill-sail"
              width="21.9"
              height="4.7"
              x="31.6"
              y="35.2"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              transform="rotate(-134.999 42.55 37.573)"
            />
            <rect
              className="windmill-sail"
              width="21.9"
              height="4.7"
              x="11.5"
              y="8.5"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              transform="rotate(-134.999 22.461 10.895)"
            />
            <rect
              className="windmill-sail"
              width="21.9"
              height="4.7"
              x="8.2"
              y="31.9"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              transform="rotate(-45.001 19.121 34.264)"
            />
            <rect
              className="windmill-sail"
              width="21.9"
              height="4.7"
              x="34.9"
              y="11.9"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              transform="rotate(-45.001 45.867 14.244)"
            />

            <line
              x1="53.8"
              x2="34.4"
              y1="45.5"
              y2="26.1"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line
              x1="30.6"
              x2="11.2"
              y1="22.4"
              y2="3"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line
              x1="11.2"
              x2="30.6"
              y1="45.5"
              y2="26.1"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line
              x1="34.4"
              x2="53.8"
              y1="22.4"
              y2="3"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>
          <circle cx="32.5" cy="24.5" r="0.5" fill="none" />
        </g>
        <path
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M34.4,26.1c-1.1,1.1-2.7,1-3.8,0c-1-1-1.1-2.7,0-3.8c1-1,2.7-1,3.8,0C35.4,23.4,35.4,25.1,34.4,26.1z"
        />
      </svg>
    </>
  );
};

export default WindMill;
