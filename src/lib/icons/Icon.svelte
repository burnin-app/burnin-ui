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
        Files: Icons.Files
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
