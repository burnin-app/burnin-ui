<script lang="ts">
    import type { SvgIconProp } from "./types";
    import type { CompRegistry } from "../types";

    import { type IconNames, Icons } from "./components";

    const registr: CompRegistry = {
        ArrowUp: Icons.ArrowUp,
        Plus: Icons.Plus,
        Close: Icons.Close,
        Search: Icons.Search,
        AlarmBellRing: Icons.AlarmBellRing,
        Home: Icons.Home,
        LayoutSideBarRight: Icons.LayoutSideBarRight,
        TimelineHorizontal: Icons.TimelineRoadMapHorizontal,
        PhotoLib: Icons.PhotoLib,
        PlusNew: Icons.PlusNew,
        FolderOpen: Icons.FolderOpen,
        ArrowDownCircle: Icons.ArrowDownCircle,
        ArrowLeft: Icons.ArrowLeft,
        Box: Icons.Box,
        Bin: Icons.Bin,
        Notes: Icons.Notes,
        Files: Icons.Files,
        InsertSlide: Icons.InsertSlide,
        Dev: Icons.Dev,
        DarkMode: Icons.DarkMode,
        MenuMoreVertical: Icons.MenuMoreVertical,
        StickyNote: Icons.StickyNote,
        Tick: Icons.Tick,
        Pen: Icons.Pen,
        Marker: Icons.Marker,
        Eraser: Icons.Eraser,
        UndoRight: Icons.UndoRight,
        UndoLeft: Icons.UndoLeft,
        Clear: Icons.Clear
    };

    interface IconProps extends SvgIconProp {
        name: IconNames;
        strokeWidth?: number;
    }
    let {
        name,
        color = "#D9D9D9",
        size,
        fill,
        strokeWidth = 1.5,
        ...rest
    }: IconProps = $props();
</script>

{#if name}
    {@const Comp = registr[name]}
    <Comp {color} {size} {fill} {strokeWidth} {...rest} />
{/if}
