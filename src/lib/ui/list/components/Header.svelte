<script lang="ts">
    import { type Snippet } from "svelte";
    import { getListContext } from "../../../context";
    import type { ListContextProps } from "../../../types";
    import { IcoBtn, InputText } from "../../../index";
    import { SearchFilter } from "../../../utils";

    interface HeaderProps {
        children?: Snippet;
        name: string;
        items: any[];
        searchFilter?: SearchFilter<any>;
        allowSearch?: boolean;
    }

    let {
        children,
        name,
        searchFilter,
        allowSearch = false,
        items = $bindable([]),
    }: HeaderProps = $props();
    let context: ListContextProps = getListContext();

    let toggleSearch = $state<boolean>(false);

    function handleFilter() {
        console.log("Filtering");
        if (searchFilter) {
            let i = searchFilter.onSearch(context.search_value);
            items = i;
        }
    }

    /* SLOW SEARCH */
    // let timeout: ReturnType<typeof setTimeout>;

    // function onSearch() {
    //     clearTimeout(timeout);
    //     console.log("Filtering");

    //     timeout = setTimeout(() => {
    //         if (searchFilter) {
    //             let i = searchFilter.onSearch(context.search_value);
    //             items = i;
    //         }
    //     }, 150);
    // }

    function onSearchTrigger() {
        if (toggleSearch) {
            toggleSearch = false;
            nameVisible = true;
            context.search_value = "";
            if (searchFilter) {
                items = searchFilter.resetSearch();
            }
        } else {
            toggleSearch = true;
            nameVisible = false;
            if (searchFilter) {
                searchFilter.prepareSearch(context.search_key, items);
            }
        }
    }

    let nameVisible = $state<boolean>(true);
</script>

<!-- <div class="header-wrapper">
    {#if nameVisible}
        <div class="name">
            {name}
        </div>
    {/if}
    <div class="options">
        {#if allowSearch}
            {#if toggleSearch == false}
                <IcoBtn icon="ArrowUp" onclick={onSearchTrigger} />
            {/if}
            {#if toggleSearch}
                <InputText
                    type="text"
                    bind:value={context.search_value}
                    oninput={handleFilter}
                    placeholder="Search"
                />
                <IcoBtn icon="ArrowUp" onclick={onSearchTrigger} />
            {/if}
        {/if}
        <div class="content">
            {@render children?.()}
        </div>
    </div>
</div> -->
<div class="header-wrapper">
    <div class="content">
        {#if toggleSearch}
            <InputText
                type="text"
                bind:value={context.search_value}
                oninput={handleFilter}
                placeholder="Search"
            />
            <IcoBtn icon="ArrowUp" onclick={onSearchTrigger} />
        {:else}
            <div class="name">
                {name}
            </div>
            <div class="options">
                {#if allowSearch}
                    <div class="search-options">
                        <IcoBtn icon="Search" onclick={onSearchTrigger} />
                    </div>
                {/if}
                {@render userOptions()}
            </div>
        {/if}
    </div>
</div>

{#snippet userOptions()}
    <div class="user-options">
        {@render children?.()}
    </div>
{/snippet}

<style lang="scss">
    .header-wrapper {
        .content {
            display: flex;
            align-items: center;
            height: var(--tab-height);
            padding: 0px 10px;
            justify-content: space-between;

            .name {
                font-weight: 600;
            }
        }
    }

    /* .header-wrapper {
        width: 100%;
        background-color: var(--tab-black);
        height: var(--tab-height);
        border-radius: var(--border-radius);
        padding: 0px 10px;
        display: flex;
        font-weight: 500;
        width: 100%;

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            background-color: red;
            .name {
                font-weight: 600;
            }
        }
    }
    .options {
        display: flex;
        align-items: center;
    } */
</style>
