export const NUM_ROW_INDEX = 0;
export const QWE_ROW_INDEX = 1;
export const ASD_ROW_INDEX = 2;
export const ZXC_ROW_INDEX = 3;

export const NUM_ROW = {
  index: NUM_ROW_INDEX,
  mappings: [
    { keyCode: 49, label: "1" },
    { keyCode: 50, label: "2" },
    { keyCode: 51, label: "3" },
    { keyCode: 52, label: "4" },
    { keyCode: 53, label: "5" },
    { keyCode: 54, label: "6" },
    { keyCode: 55, label: "7" },
    { keyCode: 56, label: "8" },
    { keyCode: 57, label: "9" },
    { keyCode: 48, label: "0" },
    { keyCode: 189, label: "-" },
    { keyCode: 187, label: "=" },
  ],
};

export const QWE_ROW = {
  index: QWE_ROW_INDEX,
  mappings: [
    { keyCode: 81, label: "Q" },
    { keyCode: 87, label: "W" },
    { keyCode: 69, label: "E" },
    { keyCode: 82, label: "R" },
    { keyCode: 84, label: "T" },
    { keyCode: 89, label: "Y" },
    { keyCode: 85, label: "U" },
    { keyCode: 73, label: "I" },
    { keyCode: 79, label: "O" },
    { keyCode: 80, label: "P" },
    { keyCode: 219, label: "[" },
    { keyCode: 221, label: "]" },
  ],
};

export const ASD_ROW = {
  index: ASD_ROW_INDEX,
  mappings: [
    { keyCode: 65, label: "A" },
    { keyCode: 83, label: "S" },
    { keyCode: 68, label: "D" },
    { keyCode: 70, label: "F" },
    { keyCode: 71, label: "G" },
    { keyCode: 72, label: "H" },
    { keyCode: 74, label: "J" },
    { keyCode: 75, label: "K" },
    { keyCode: 76, label: "L" },
    { keyCode: 186, label: ";" },
    { keyCode: 222, label: "'" },
  ],
};

export const ZXC_ROW = {
  index: ZXC_ROW_INDEX,
  mappings: [
    { keyCode: 90, label: "Z" },
    { keyCode: 88, label: "X" },
    { keyCode: 67, label: "C" },
    { keyCode: 86, label: "V" },
    { keyCode: 66, label: "B" },
    { keyCode: 78, label: "N" },
    { keyCode: 77, label: "M" },
    { keyCode: 188, label: "," },
    { keyCode: 190, label: "." },
    { keyCode: 191, label: "/" },
  ],
};

const keyMapping = {
  // Numbers row
  50: "2",
  49: "1",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  48: "0",
  189: "-",
  187: "=",
  // QWE row
  81: "Q",
  87: "W",
  69: "E",
  82: "R",
  84: "T",
  89: "Y",
  85: "U",
  73: "I",
  79: "O",
  80: "P",
  219: "[",
  221: "]",
  // ASD row
  65: "A",
  83: "S",
  68: "D",
  70: "F",
  71: "G",
  72: "H",
  74: "J",
  75: "K",
  76: "L",
  186: ";",
  222: "'",
  // ZXC row
  90: "Z",
  88: "X",
  67: "C",
  86: "V",
  66: "B",
  78: "N",
  77: "M",
  188: ",",
  190: ".",
  191: "/",
};

export const isPlayableKey = function (keyCode) {
  return keyMapping[keyCode] !== null && keyMapping[keyCode] !== undefined;
};
