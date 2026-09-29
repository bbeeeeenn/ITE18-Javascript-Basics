const container = document.getElementById("container");
const resetButton = document.getElementById("resetButton");

const initializeGrid = (dimension) => {
  container.replaceChildren();
  for (let i = 0; i < dimension * dimension; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.width = `${100 / dimension}%`;
    tile.style.height = `${100 / dimension}%`;
    tile.interactions = 0;

    container.appendChild(tile);
  }
};
initializeGrid(16);

container.addEventListener(
  "mouseenter",
  (e) => {
    if (!e.target.classList.contains("tile")) return;
    e.target.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    e.target.interactions += 10;
    e.target.style.filter = `brightness(${100 - e.target.interactions}%)`;
  },
  true,
);

resetButton.addEventListener("click", () => {
  let dimension = 0;
  while (isNaN(dimension) || dimension <= 0 || dimension > 100) {
    dimension = Number.parseInt(prompt("Dimension:"), 10);
  }
  initializeGrid(dimension);
});
