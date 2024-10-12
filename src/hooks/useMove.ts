import { useState, useEffect } from "react";
const useMove = () => {
  const [isInside, setIsInside] = useState(true);
  useEffect(() => {
    function debounce(fn: Function, wait: number) {
      let timeout: NodeJS.Timeout;
      return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
      };
    }

    function handleMouseMove(event: MouseEvent) {
      if (!isInside) return;

      const elements = Array.from(
        document.querySelectorAll(".Login-trips")
      ) as HTMLElement[];

      elements.forEach((element: HTMLElement) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left + elementRect.width / 2;
        const elementY = elementRect.top + elementRect.height / 2;

        const deltaX = mouseX - elementX;
        const deltaY = mouseY - elementY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const moveX = (deltaX / distance) * -50;
        const moveY = (deltaY / distance) * -50;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }

    const handleMouseMoveDebounced = debounce(handleMouseMove, 1);

    const targetDiv = document.getElementById("loginDisplayDiv");
    document.addEventListener("mousemove", handleMouseMoveDebounced);

    // SHOULD I HAVE IT ALWAYS FLOW?
    // if (targetDiv) {
    //     targetDiv.addEventListener('mouseenter', () => {
    //         // setIsInside(true);
    //         document.addEventListener('mousemove', handleMouseMoveDebounced);
    //     });

    //     targetDiv.addEventListener('mouseleave', () => {
    //         // setIsInside(false);
    //         // document.removeEventListener('mousemove', handleMouseMoveDebounced);
    //         const elements = Array.from(document.querySelectorAll('.Login-trips')) as HTMLElement[];
    //         elements.forEach((element: HTMLElement) => {
    //             element.style.transform = 'translate(0, 0)'; // Reset position to center
    //         });
    //     });
    // }

    return () => {
      if (targetDiv) {
        targetDiv.removeEventListener("mouseenter", () => {
          setIsInside(true);
          document.addEventListener("mousemove", handleMouseMoveDebounced);
        });

        targetDiv.removeEventListener("mouseleave", () => {
          setIsInside(false);
          document.removeEventListener("mousemove", handleMouseMoveDebounced);
          const elements = Array.from(
            document.querySelectorAll(".Login-trips")
          ) as HTMLElement[];
          elements.forEach((element: HTMLElement) => {
            element.style.transform = "translate(0, 0)";
          });
        });
      }
    };
  }, [isInside]);
};

export default useMove;
