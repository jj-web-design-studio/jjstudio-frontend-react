const isFourthLine = (pos) => {
  return pos % 4 === 0;
};

const BarLines = (props) => {
  const { spacing, shouldRender } = props;

  const hoverLines = function () {
    let hoverLines = [];
    for (let i = 1; i < 16; i++) {
      hoverLines.push(
        <div
          className="hover-line"
          style={
            shouldRender
              ? {
                  left: spacing * i + "%",
                  opacity: i % 4 === 0 ? 1 : 0.4,
                  borderLeft: isFourthLine(i)
                    ? "1px solid grey"
                    : "1px dotted grey",
                }
              : {}
          }
        />
      );
    }
    return hoverLines;
  };

  return <div>{hoverLines()}</div>;
};

export default BarLines;
