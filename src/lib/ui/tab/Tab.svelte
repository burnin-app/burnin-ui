<script lang="ts">
    import { type Snippet} from "svelte";

    interface TabProps {
        children: Snippet;
        style?: string;
        visible?: boolean;
        activeTabId: string;
    }

    let {
        children,
        style,
        visible = true,
        activeTabId = $bindable(),
    }: TabProps = $props();

    interface ContextProps {
        activeTabId: string;
        tabs: string[];
    }

    let context: ContextProps = $state({
        activeTabId: "",
        tabs: [],
    });
    // setContext("context", context);

    // onMount(() => {
    //     context.activeTabId = activeTabId;
    //     console.log(context.activeTabId);
    // });
</script>

<div class="tab-display-wrapper" class:hidden={!visible}>
    <div class="tab-wrapper" {style}>
        {@render children()}
    </div>
</div>

<style>
    .tab-display-wrapper {
        height: 100%;
        display: block;
        background-color: var(--bg-color);
    }

    .tab-display-wrapper.hidden {
        display: none;
    }

    .tab-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    /*.tab-display-wrapper {
        display: flex;
        flex: 1;
        min-height: 0;
        height: 100%;
        display: block;
        background-color: var(--bg-color);
    }

    .tab-display-wrapper.hidden {
        display: none;
    }

    .tab-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }*/
</style>
