<script>
    import {fly} from 'svelte/transition'
    import {flip} from 'svelte/animate'
    import Spinner from 'svelte-spinner'
    import Person from './Person.svelte'
    import {createItem, readItems, getJSON} from './apiCall'

    let createPromise = Promise.reject()

    function create(e) {
        const item = getJSON(e)
        createPromise = createItem(item)
            .then(personRes => people = [personRes, ...people])
            .then(() => Promise.reject())
    }

    function removeHandler({detail}) {
        people = people.filter(({_id}) => _id !== detail._id)
    }

    let people = []
    let peoplePromise = readItems().then(peopleRes => people = peopleRes.reverse())
</script>

<main>
    <h1>People Creator</h1>
    <section>
        <h2>Create Person</h2>
        {#await createPromise}
            <Spinner size="60" color="#8A2BE2" />
        {:catch error}
            {#if error}{error}{/if}
            <form on:submit|preventDefault={create}>
                <input type="text" name="name" placeholder="name"><br>
                <input type="number" name="age" placeholder="age"><br>
                <button>Add Person</button>
            </form>
        {/await}
    </section>

    <section>
        <h2>People</h2>
        <div style="display: flex; flex-wrap: wrap;">
            {#await peoplePromise}
                <Spinner size="60" color="#8A2BE2" />
            {:then _}
                {#each people as person (person)}
                    <div animate:flip transition:fly={{y: -50, duration: (400 + 500*Math.random())}}>
                        <Person {person} on:remove={removeHandler} />
                    </div>
                {/each}
            {/await}
        </div>
    </section>
</main>

<style>
    main {
        padding: 40px;
        width: 750px;
    }
    section {
        padding: 20px;
    }
</style>