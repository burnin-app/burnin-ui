<script lang="ts">
     import { onMount } from "svelte";
    import "../lib/style/index.scss";
    onMount(() => {
        document.documentElement.setAttribute("data-theme", "dark");
    });

    import {Dropdown, IcoBtn, List, Menu} from "$lib";

    let items = $state(["Hello", "Check", "Loser", "Chekcer"]);

</script>
<div class="data">
    <Dropdown.Root>
    <IcoBtn icon="LayoutSideBarRight" size={33} color="red" hoveredColor="pink" tooltip="hello"/>

    </Dropdown.Root>
    <IcoBtn icon="PhotoLib" size={33}  hoveredColor="pink"/>

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
