<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { bangs } from "./bang/bangs";
  import type { Bang } from "./types";

  let {
    searchQuery,
  }: {
    searchQuery: string;
  } = $props();

  const RESULT_COUNT = 50;

  const query = createQuery(() => ({
    queryKey: ["search-bangs", searchQuery],
    enabled: searchQuery.length > 0,
    queryFn: async (): Promise<Bang[]> => {
      return bangs
        .filter((bang) => {
          const bangName = bang.s.toLowerCase();
          const bangCommand = `!${bang.t.toLowerCase()}`;
          const normalizedQuery = searchQuery.toLowerCase();

          if (normalizedQuery.startsWith("!")) {
            return bangCommand.includes(normalizedQuery);
          }

          return (
            bangName.includes(normalizedQuery) ||
            bangCommand.includes(normalizedQuery) ||
            bang.d.toLowerCase().includes(normalizedQuery)
          );
        })
        .slice(0, RESULT_COUNT);
    },
  }));
</script>

{#if query.isLoading}
  <p>Loading...</p>
{:else if query.isError}
  <p>Error: {query.error.message}</p>
{:else if query.data && query.data.length > 0}
  <div class="scroll-container">
    <ul class="bang-results">
      {#each query.data as bang}
        <li class="bang-item {bang.custom ? 'custom-bang' : ''}">
          <div class="bang-header">
            <span class="bang-name">
              {bang.s}
              {#if bang.custom}
                <span class="custom-indicator">[CUSTOM]</span>
              {/if}
            </span>
            <span class="bang-command">!{bang.t}</span>
          </div>
          <p class="bang-description">{bang.d}</p>
          <p class="bang-url">{bang.u}</p>
        </li>
      {/each}
    </ul>
  </div>
{:else if searchQuery.length > 0}
  <p>No bangs found matching "{searchQuery}"</p>
{/if}

<style>
  .custom-bang {
    background-color: #e0f7fa; /* Slightly bluish background for custom bangs */
  }

  .custom-indicator {
    font-size: 0.8rem; /* Subtle font size */
    color: #888; /* Subtle color */
    font-weight: 300; /* Lighter font weight */
  }

  * {
    margin: 0;
  }

  .scroll-container {
    max-height: 400px;
    overflow-y: auto;
    overflow-wrap: break-word;
    margin-top: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .bang-results {
    list-style: none;
    padding: 0;
  }

  .bang-item {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
  }

  .bang-item:hover {
    background-color: #f5f5f5;
  }

  .bang-item.custom-bang:hover {
    background-color: #d1e8eb; /* Slightly darker bluish background for custom bangs on hover */
  }

  .bang-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .bang-name {
    font-weight: bold;
  }

  .bang-command {
    color: #666;
    font-family: monospace;
  }

  .bang-description {
    font-size: 0.9rem;
    color: #555;
  }

  .bang-url {
    font-size: 0.9rem;
    color: #555;
  }
</style>
