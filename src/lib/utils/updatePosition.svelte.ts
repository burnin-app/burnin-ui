import {
    computePosition,
    flip,
    shift,
    size,
    offset,
    autoUpdate,
    type Placement
} from "@floating-ui/dom";

// export async function updateMenuPosition(
//   trigger: HTMLDivElement,
//   content: HTMLDivElement,
// ) {
//   // console.log("trigger", trigger);
//   // console.log("content", content);

//   computePosition(trigger, content, {
//     placement: "bottom-start",
//     middleware: [flip(), shift({ padding: 8 })],
//   }).then(({ x, y }) => {
//     Object.assign(content.style, {
//       left: `${x}px`,
//       top: `${y}px`,
//     });
//   });
// }



interface MenuPositionOptions {
    placement?: Placement;
    matchTriggerWidth?: boolean;
    offset?: number;
}

export function updateMenuPosition(
    trigger: HTMLElement,
    content: HTMLElement,
    {
        placement = "bottom-start",
        matchTriggerWidth = false,
        offset: offsetValue = 1
    }: MenuPositionOptions = {}
) {
    return autoUpdate(trigger, content, async () => {
        await computePosition(trigger, content, {
            placement,
            middleware: [
                offset(offsetValue),
                flip(),
                shift({ padding: 4 }),

                ...(matchTriggerWidth
                    ? [
                          size({
                              apply({ rects, elements }) {
                                  elements.floating.style.width =
                                      `${rects.reference.width}px`;
                              }
                          })
                      ]
                    : [])
            ]
        }).then(({ x, y }) => {
            Object.assign(content.style, {
                left: `${x}px`,
                top: `${y}px`
            });
        });
    });
}
