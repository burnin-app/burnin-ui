<script lang="ts">
    import { type Snippet, setContext} from "svelte";
    import { setMenuContext } from "../../../context";
    import type { MenuContextProps } from "../../../types";

    interface RootProps {
        children: Snippet;
    }
    const componentId = crypto.randomUUID();
    setContext("componentId", componentId);

    let { children }: RootProps = $props();

    let context = $state<MenuContextProps>({
        id: componentId,
    });

    setMenuContext(context);
</script>

<div class="dropdown-root">
    {@render children()}
</div>
