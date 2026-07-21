<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface InputProps extends HTMLInputAttributes {
        class?: string;
    }

    let {
        class: className,
        value = $bindable(),
        ...rest
    }: InputProps = $props();
</script>

<div class="input-wrapper">
    <input class={`input ${className ?? ""}`} bind:value {...rest} />
</div>

<style class="scss">
    .input-wrapper {
        background-color: #373737;
        background-color: var(--tab-black);
        color: #fff;
        width: 100%;
        display: flex;
        gap: 4px;
        width: 100%;
        input {
            border: none;
            color: var(--primary-text-color-w2);
            font-size: 11.5px;
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            background-color: var(--input-text-background-color);
            letter-spacing: 0.03em;
            position: relative;
            height: 100%;
            padding: 5px 10px;
            flex-grow: 1;
            min-width: 0;
            &:focus {
                border: 1px solid transparent;
            }
        }
    }
</style>
