<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import BangSearchResults from "./bang-search-results.svelte";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

  const clipboardImg = "/clipboard.svg";
  const clipboardCheckImg = "/clipboard-check.svg";
  const searchEngineUrl = "https://unduck-improved.vercel.app/?q=%s";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: window !== undefined,
        experimental_prefetchInRender: true,
      },
    },
  });

  let currentImg = $state(clipboardImg);
  let searchBangInput = $state("");
</script>

<QueryClientProvider client={queryClient}>
  <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 2rem;"
  >
    <div class="content-container">
      <h1>Unduck Improved</h1>
      <p>
        DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to
        your browser. Enables <a href="https://duckduckgo.com/bang.html" target="_blank"
          >all of DuckDuckGo's bangs.</a
        >
      </p>
      <div class="url-container">
        <input type="text" class="url-input" value={searchEngineUrl} readonly />
        <button
          class="copy-button"
          onclick={() => {
            navigator.clipboard.writeText(searchEngineUrl);
            currentImg = clipboardCheckImg;
            setTimeout(() => {
              currentImg = clipboardImg;
            }, 2000);
          }}
        >
          <img src={currentImg} alt="Copy" />
        </button>
      </div>
      <div class="search-container">
        <h2>Search Bangs</h2>
        <input
          class="url-input"
          type="text"
          placeholder="Search bangs..."
          bind:value={searchBangInput}
        />
        <BangSearchResults searchQuery={searchBangInput.trim()} />
      </div>
    </div>
    <footer class="footer">
      <a href="https://github.com/isak102/unduck" target="_blank">github</a>
    </footer>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>

<!-- svelte-ignore css_unused_selector -->
<style>
  @import "./global.css";

  .url-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
  }

  /* Add this new style */
  .content-container {
    display: flex;
    flex-direction: column;
    max-width: 36rem;
    text-align: center;
    padding: 0 8px;
    gap: 0.5rem;
  }

  /* Update url-input width to be 100% since container will control max width */
  .url-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    background: #f5f5f5;
  }

  .copy-button {
    padding: 8px;
    color: #666;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-button:hover {
    background: #f0f0f0;
  }

  .copy-button:active {
    background: #e5e5e5;
  }

  .copy-button img {
    width: 20px;
    height: 20px;
  }

  .copy-button.copied {
    background: #28a745;
  }

  /* Add footer styles */
  .footer {
    position: fixed;
    bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  .footer a {
    color: #666;
    text-decoration: none;
    font-weight: 500;
  }

  .footer a:hover {
    color: #333;
  }

  .search-container {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
