<script lang="ts">
     import { onMount } from "svelte";
    import "../lib/style/index.scss";
    onMount(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        document.addEventListener('contextmenu', (event) => {
          event.preventDefault();
        });
    });

    import {Dropdown, IcoBtn, List, Menu} from "$lib";

    let items = $state(["Hello", "Check", "Loser", "Chekcer"]);

</script>
<div class="data">
    <button>Right Click</button>
</div>
