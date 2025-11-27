<script lang="ts">
  import { toasts, removeToast } from './toast-store';
  import { flip } from 'svelte/animate';
  import { fade, fly } from 'svelte/transition';
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <button
      type="button"
      class="toast {toast.type}"
      animate:flip={{ duration: 300 }}
      in:fly={{ y: -20, duration: 300 }}
      out:fade={{ duration: 200 }}
      on:click={() => removeToast(toast.id)}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          removeToast(toast.id);
        }
      }}
      aria-label="{toast.message} (click to dismiss)"
    >
      {toast.message}
    </button>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100000; /* High z-index to appear above everything */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    pointer-events: none; /* Allow clicks to pass through container */
  }

  .toast {
    padding: 12px 16px;
    border-radius: 4px;
    background: var(--pm-bg-secondary, #252525);
    color: var(--pm-text-primary, #e0e0e0);
    font-size: 13px;
    box-shadow: var(--pm-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
    pointer-events: auto;
    cursor: pointer;
    min-width: 240px;
    text-align: left; /* Left align for better readability */
    border: 1px solid var(--pm-border, rgba(255, 255, 255, 0.1));
    border-left-width: 4px; /* Accent border */
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Theme Variants - Accent Colors */
  .toast.info {
    border-left-color: var(--pm-primary, #3b82f6);
  }

  .toast.success {
    border-left-color: #10b981;
  }

  .toast.error {
    border-left-color: #ef4444;
  }

  .toast.warning {
    border-left-color: #f59e0b;
  }
</style>