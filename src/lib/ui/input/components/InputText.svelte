<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    interface InputProps extends HTMLInputAttributes {
        class?: string;
        focusOnMount?: boolean;
        onmount?: () => void;
        ondestroy?: () => void;
        error?: boolean;
    }

    let inputElement:  HTMLInputElement;

    let {
        class: className,
        value = $bindable(),
        error = $bindable(false),
        focusOnMount = false,
        onmount,
        ondestroy,
        ...rest
    }: InputProps = $props();

    onMount(() => {
        if (focusOnMount) {
              inputElement.focus();
        }
        onmount?.();
    })

    onDestroy(() => {
      ondestroy?.();
    })

</script>

<div class="input-wrapper">
    <input bind:this={inputElement} class={`input ${className ?? ""}`} bind:value {...rest}  class:error={error}/>
</div>

<style class="scss">
    .input-wrapper {
        background-color: #373737;
        background-color: var(--tab-black);
        color: #fff;
        display: flex;
        gap: 4px;
        width: 100%;
        height: 100%;
        input {
            border: none;
            color: var(--primary-text-color-w2);
            font-size: 11.5px;
            border-radius: var(--border-radius);
            border: 1.4px solid var(--border-color);
            background-color: var(--input-text-background-color);
            letter-spacing: 0.03em;
            position: relative;
            height: 100%;
            padding: 5px 10px;
            flex-grow: 1;
            min-width: 0;
            &:focus {
                border: 1.4px solid transparent;
            }

            &.error{
                border: 1.4px solid red !important;
            }
        }

    }
</style>
