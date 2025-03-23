<script lang="ts">
  const clipboardImg = "/clipboard.svg";
  const clipboardCheckImg = "/clipboard-check.svg";
  const searchEngineUrl = "https://unduck-improved.vercel.app/?q=%s";

  let currentImg = $state(clipboardImg);
</script>

<div
  style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 55vh;"
>
  <div class="content-container">
    <h1>Und*ck Improved</h1>
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
  </div>
  <footer class="footer">
    <a href="https://github.com/isak102/unduck" target="_blank">github</a>
  </footer>
</div>

<!-- svelte-ignore css_unused_selector -->
<style>
  /* Font fallback that closely matches Inter metrics */
  @font-face {
    font-family: "Inter Fallback";
    size-adjust: 107%;
    ascent-override: 90%;
    src: local("Arial");
  }

  :root {
    font-family:
      Inter,
      "Inter Fallback",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    line-height: 1.5;
    font-weight: 400;
    font-size: 16px;
    color: #1a1a1a;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    color: #444444;
  }
  a:hover {
    color: #888888;
  }

  button {
    font: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  input,
  textarea {
    font: inherit;
  }

  /* Add these new styles */
  .url-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
  }

  /* Add this new style */
  .content-container {
    max-width: 36rem;
    text-align: center;
    padding: 0 8px;
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
</style>
