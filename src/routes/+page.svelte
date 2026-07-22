<script lang="ts">
     import { onMount } from "svelte";
    import "../lib/style/index.scss";
    onMount(() => {
        document.documentElement.setAttribute("data-theme", "dark");
    });

    import {IcoBtn, List} from "$lib";

    let items = $state(["Hello", "Check", "Loser", "Chekcer"]);

</script>
<div class="data">
    <IcoBtn icon="LayoutSideBarRight" size={33} color="red" hoveredColor="pink"/>

    <List.Root>
        <List.Header
            name="Scene Headers"
            bind:items={items}
        />
        <List.Content>
            {#each items as item, index}
                <List.Item style={"text-transform: uppercase"} id={index}>{index + 1}. {item}</List.Item>
            {/each}
        </List.Content>
    </List.Root>
</div>
