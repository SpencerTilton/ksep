//Constants used throughout the application, should populate with constants pulled from other files too

export const ItemTypes = {
  COMP: 'comp',
  PORT: 'port',
  TOOL: 'tool'
};

export const PerksComponents = [
  { name: 'resistor', type: "r" },
  { name: 'inductor', type: "l" },
  { name: 'capacitor', type: "c" },
  { name: 'dcvsource', type: "s" },
  { name: 'diode', type: "d" },
  //{ name: 'transistor', type:"t" }, //remove me eventually. left in for testing
  { name: 'switch', type: "q" },
];

export const Rotations = [
  "EditorItem0",
  "EditorItem90",
  "EditorItem180",
  "EditorItem270"
];
