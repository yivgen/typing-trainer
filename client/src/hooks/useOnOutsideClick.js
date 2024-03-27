import React, { useRef, useEffect } from "react";

/**
 * Calls handleClickOutside when you click outside of ref
 */
function useOutsideClick(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideClick(props) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}