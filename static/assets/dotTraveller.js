function dotTraveller(svgId, pathId, dotColor="#FFF0FE", dotRadius = "5", dotOpacity = "0.1") {
    const path = document.getElementById(pathId);
    const pathLength = path.getTotalLength();

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("fill", dotColor);
    dot.setAttribute("fill-opacity", dotOpacity);
    dot.setAttribute("r", dotRadius);
    dot.classList.add("dot-traveller")

    const svg = document.getElementById(svgId);
    svg.appendChild(dot);

    let position = 0;
    let move = false;

    function moveDot() {
        move = !move;
        const point = path.getPointAtLength(position);

        dot.setAttribute("cx", point.x.toString());
        dot.setAttribute("cy", point.y.toString());

        // Increase or reset the position
        if (position < pathLength) {

            if (move) {
                position++;
            }

            window.requestAnimationFrame(moveDot);
        } else {
            dot.setAttribute("fill-opacity", "0");
            setTimeout(() => {
                position = 0
                dot.setAttribute("fill-opacity", dotOpacity);
                moveDot();
            }, 5000);
        }

    }

    moveDot();
}

dotTraveller("slider", "wave-1", "#FECDFC", "1");
dotTraveller("slider", "wave-2", "#FECDFC", "2");
dotTraveller("slider", "wave-3", "#FECDFC", "1");
dotTraveller("slider", "wave-4", "#FECDFC", "2");
dotTraveller("slider", "wave-5", "#FECDFC", "1");