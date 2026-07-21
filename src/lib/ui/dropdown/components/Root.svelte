<script lang="ts">
    import { type Snippet} from "svelte";
    import { setMenuContext } from "../../../context";
    import type { MenuContextProps } from "../../../types";
    import { globalUIState } from "../../../globalState.svelte";

    interface RootProps {
        children: Snippet;
    }
    const uid: string = $props.id();

    let { children }: RootProps = $props();

    let context = $state<MenuContextProps>({
        id: uid,
        isOpen: false,
        close: onclose,
    });

    function onclose() {
        globalUIState.activeMenuId = null;
        context.isOpen = false;
    }
    setMenuContext(context);
</script>

<div class="dropdown-root">
    {@render children()}
</div>
