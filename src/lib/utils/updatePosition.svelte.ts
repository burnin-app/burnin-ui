import {
    computePosition,
    flip,
    shift,
    size,
    offset,
    autoUpdate,
    type Placement
} from "@floating-ui/dom";


interface MenuPositionOptions {
    placement?: Placement;
    matchTriggerWidth?: boolean;
    offset?: number;
    padding?: number;
}

export function updateMenuPosition(
    trigger: HTMLElement,
    content: HTMLElement,
    {
        placement = "bottom-start",
        matchTriggerWidth = false,
        offset: offsetValue = 1,
          padding: paddingValue = 4
    }: MenuPositionOptions = {}
) {
    return autoUpdate(trigger, content, async () => {
        await computePosition(trigger, content, {
            placement,
            middleware: [
                offset(offsetValue),
                flip(),
                shift({ padding: paddingValue }),

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
