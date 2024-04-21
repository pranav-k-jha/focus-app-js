const circleCoordinates = [];

// function circleIntersect(x0, y0, r0, x1, y1, r1) {
//   return Math.hypot(x0 - x1, y0 - y1) <= r0 + r1;
// }
function circleIntersect(x0, y0, r0, x1, y1, r1) {
  const distanceBetweenCenters = Math.hypot(x0 - x1, y0 - y1);
  const sumOfRadii = r0 + r1;
  return distanceBetweenCenters <= sumOfRadii; // Return true if circles intersect, false otherwise
}


const intersectingCircle = () => {
  const firstCircle = circleCoordinates[0];
  const secondCircle = circleCoordinates[1];
  const x1 = firstCircle.x;
  const y1 = firstCircle.y;
  const r1 = firstCircle.radius;
  const x2 = secondCircle.x;
  const y2 = secondCircle.y;
  const r2 = secondCircle.radius;

  return circleIntersect(x1, y1, r1, x2, y2, r2);
};

document.addEventListener("click", (e) => {
  const totalCircles = document.querySelectorAll(".circle");

  if (totalCircles.length === 2) {
    totalCircles.forEach((circ) => {
      document.body.removeChild(circ);
      circleCoordinates.splice(0, 2);
    });
  }

  const x = e.clientX;
  const y = e.clientY;
  const radius = 100 + Math.floor(Math.random() * 100);
  circleCoordinates.push({ x, y, radius });

  const circle = document.createElement("div");
  circle.classList.add("circle");

  const elementStyle = circle.style;
  elementStyle.top = y - radius + "px";
  elementStyle.left = x - radius + "px";
  elementStyle.width = radius * 2 + "px";
  elementStyle.height = radius * 2 + "px";

  document.body.appendChild(circle);
  if (circleCoordinates.length === 2) {
    const res = intersectingCircle();
    console.log("Intersecting =", res);
  }
});
