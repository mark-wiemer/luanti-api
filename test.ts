import ".";

core.register_node("test", {
  description: "test block",

  tiles: [{ name: "test.png" }],

  drawtype: "nodebox",
  node_box: {
    type: "fixed",
    fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
  },

  collision_box: {
    type: "fixed",
    fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
  },
  selection_box: {
    type: "fixed",
    fixed: [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
  },
});
