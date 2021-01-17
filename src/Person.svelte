<script>
    import Spinner from 'svelte-spinner'
    import {fade} from 'svelte/transition'
    import {updateItem, deleteItem, getJSON} from './apiCall'
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    export let person

    let state = 'view' // or update 

    let promise = Promise.reject()

    function update(e) {
        const updatedPerson = getJSON(e)
        promise = updateItem({person: updatedPerson, _id: person._id})
            .then((updatedPerson) => person = updatedPerson)
            .then(() => Promise.reject())
        state = 'view'
    }

    function remove() {
        promise = deleteItem(person._id)
            .then(() => dispatch('remove', {_id: person._id}))
    }
</script>

{#await promise}
    <Spinner size="185" color="#8A2BE2" />
{:catch error}
    <div class="person" in:fade>
        {#if error}{error}{/if}
        {#if state === 'view'}
            <p><strong>{person.name}</strong> is <br> {person.age} years old.</p>
            <button on:click={() => state = 'update'}>Edit</button>
            <button on:click={remove}>Remove</button>
        {:else if state === 'update'}
            <form on:submit|preventDefault={update}>
                <input type="text" name="name" value={person.name} placeholder="name"><br>
                <input type="number" name="age" value={person.age} placeholder="age"><br>
                <button type="button" on:click={() => state = 'view'}>Cancel</button>
                <button>Save</button>
            </form>
        {/if}
    </div>
{/await}

<style>
    .person {
        font-size: 1.2rem;
        margin-right: 15px;
        margin-bottom: 15px;
        width: 150px;
        height: 150px;
        padding: 10px;
        border: solid black 2px;
        border-radius: 5px;
        background-color: white;
        text-align: center;
    }
</style>