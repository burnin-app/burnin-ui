import {
    computePosition,
    flip,
    shift,
    size,
    offset,
    autoUpdate,
    type Placement,
    type VirtualElement
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


interface ContextMenuPositionOptions {
    padding?: number;
}

export function updateContextMenuPosition(
    x: number,
    y: number,
    content: HTMLElement,
    { padding: paddingValue = 4 }: ContextMenuPositionOptions = {}
) {
    const virtualEl: VirtualElement = {
        getBoundingClientRect() {
            return {
                width: 0,
                height: 0,
                x,
                y,
                top: y,
                left: x,
                right: x,
                bottom: y
            };
        }
    };

    return autoUpdate(document.body, content, async () => {
        const { x: menuX, y: menuY } = await computePosition(virtualEl, content, {
            placement: "bottom-start",
            middleware: [
                offset(2),
                flip(),
                shift({ padding: paddingValue })
            ]
        });

        Object.assign(content.style, {
            left: `${menuX}px`,
            top: `${menuY}px`
        });
    });
}
