<script lang="ts" generics="T">
    import {Button, type ButtonProps, Dropdown, Menu} from "../../../index";
    import Icon from "../../../icons/Icon.svelte";
    interface ComboBoxProps extends ButtonProps{
      menuItems: T[]
      selected_item: T
      displayValue?: (item: T) => string;
    }

    let {menuItems = $bindable<T[]>(), selected_item = $bindable<T>(), displayValue, ...rest} : ComboBoxProps = $props();

    function displayFun(item: T){
      if (displayValue){
        return displayValue(item)
      }else {
        return item
      }
    }

</script>

<Dropdown.Root>
    <Dropdown.Trigger>
        <Button {...rest} style="width: 100%;">
            <div class="content-wrapper">
                <div class="content">
                    {displayFun(selected_item)}
                </div>
                <div class="icon">
                   <Icon name="ArrowUp"/>
                </div>
            </div>
        </Button>
    </Dropdown.Trigger>
    <Menu.Content matchTriggerWidth>
        {#each menuItems as item, i }
            <Menu.Item onclick={() => selected_item = item}>
                {displayFun(item)}
            </Menu.Item>
        {/each}
    </Menu.Content>
</Dropdown.Root>

<style lang="scss">
    .content-wrapper{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

    }
</style>
