<script lang="ts">

    interface TabHeaderItemProps {
        name: string;
        id: string;
        activeTabId: string;
        onTabClick?: (tab: string) => void;
        onTabClose?: (tab: string) => void;
        showTabClose?: boolean;
    }

    let {
        name,
        id,
        activeTabId = $bindable(),
        onTabClick,
        onTabClose,
        showTabClose,
    }: TabHeaderItemProps = $props();

    // let context = getContext<{
    //     activeTabId: string;
    // }>("context");

    function handleTabClick(id: string) {
        // context.activeTabId = id;
        activeTabId = id;
        onTabClick?.(id);
    }

    function handleTabClose(id: string) {
        onTabClose?.(id);
    }

    let dragging: boolean = $state(false);
    let draggedIndex: number | null = $state(null);

    function onDragStart(e: DragEvent, index: number) {
        draggedIndex = index;
        dragging = true;

        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move"; // Key: set to "move"
            e.dataTransfer.setData("text/plain", String(index));
        }
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault(); // IMPORTANT for drops to work

        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "move"; // This controls the cursor icon
        }
    }

    function onDrop(e: DragEvent, targetIndex: number) {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer && draggedIndex !== null) {
            const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
            // Swap or reorder items here
            console.log(`Moving item from ${sourceIndex} to ${targetIndex}`);
            // TODO: Implement your reordering logic
        }
        dragging = false;
        draggedIndex = null;
    }

    function onDragEnd(e: DragEvent) {
        dragging = false;
        draggedIndex = null;
        console.log("Drag ended");
    }

    function onDragLeave(e: DragEvent) {
        console.log("Drag leave");
    }
</script>

<button
    class="tab-header-button"
    class:dragging
    type="button"
    onclick={() => handleTabClick(id)}
    draggable="true"
    ondragstart={(e) => onDragStart(e, 1)}
    ondragover={onDragOver}
    ondrop={(e) => onDrop(e, 1)}
    ondragend={onDragEnd}
    ondragleave={onDragLeave}
    class:active={id === activeTabId}
>
    <div class="content">
        <div>{name}</div>

        {#if showTabClose}
            <div
                class="cls-icon"
                aria-label="Close tab"
                onclick={(e) => {
                    e.stopPropagation();
                    handleTabClose(id);
                }}
            >
                ×
            </div>
        {/if}
    </div>
</button>

<style>
    .dragging {
        background-color: red !important;
        cursor: grabbing;
    }
    .tab-header-button {
        padding: var(--tab-header-padding);
        height: var(--tab-height);
        border-radius: var(--tab-header-border-radius);
        background: transparent;
        color: var(--secondary-color);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-width: 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: capitalize;
        border: 1px solid transparent;
    }
    .tab-header-button:hover {
        background: var(--tab-hover-bg);
    }
    .tab-header-button.active {
        background: var(--tab-body-color);
        color: var(--primary-color);
        border: 1px solid var(--border-color);

        &:hover {
            background: var(--tab-hover-bg);
        }
    }

    .content {
        display: flex;
        gap: 30px;
    }

    .cls-icon {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease;
    }

    .content:hover .cls-icon {
        opacity: 1;
        visibility: visible;
    }
</style>
