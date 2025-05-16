// import ScrollMagic from "scrollmagic";

export const initFadeInScrollMagic = () => {
  const controller = new ScrollMagic.Controller();
  document
    .querySelectorAll(".posts-container .col-md-4.card-outer")
    .forEach((item) => {
      new ScrollMagic.Scene({
        triggerElement: item.children[0],
        reverse: false,
        triggerHook: 1,
      })
        .setClassToggle(item, "fade-in")
        .addTo(controller);
    });

  return controller;
};