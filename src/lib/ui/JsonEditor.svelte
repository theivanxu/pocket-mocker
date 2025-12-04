<script lang="ts">
  import { onDestroy, createEventDispatcher, tick } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState } from '@codemirror/state';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';

  export let value: string = '';
  export let height: string = '200px';

  let editorContainer: HTMLDivElement;
  let editorView: EditorView | null = null;
  let initialized = false;

  const dispatch = createEventDispatcher();

  $: if (editorContainer && !initialized && !editorView) {
    tick().then(() => {
      initializeEditor();
    });
  }

  function initializeEditor() {
    if (!editorContainer || initialized || editorView) return;

    if (editorContainer.offsetWidth === 0 && editorContainer.offsetHeight === 0) {
       return; 
    }

    const root = editorContainer.getRootNode();
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    try {
      const startState = EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          javascript(),
          isDark ? oneDark : [],
          EditorView.lineWrapping,
          EditorView.theme({
            "&": { height: "100%", fontSize: "13px" }
          }),
          EditorView.updateListener.of((update:any) => {
            if (update.docChanged) {
              dispatch('change', update.state.doc.toString());
            }
          })
        ]
      });

      editorView = new EditorView({
        state: startState,
        parent: editorContainer,
        root: root instanceof ShadowRoot ? root : undefined
      });

      initialized = true;

    } catch (e:any) {
      throw new Error(e?.message ?? 'has an unkonw error')
    }
  }

  onDestroy(() => {
    if (editorView) {
      editorView.destroy();
      editorView = null;
    }
  });

  $: if (initialized && editorView && value !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: value
      }
    });
  }
  
  $: if (!initialized && editorContainer && editorContainer.offsetHeight > 0) {
     initializeEditor();
  }
</script>

<div class="json-editor-container" style="height: {height};" bind:this={editorContainer}></div>

<style>
  .json-editor-container {
    width: 100%;
    min-height: 200px;
    border: 1px solid var(--pm-border);
    border-radius: 4px;
    background-color: var(--pm-input-bg);
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .json-editor-container:focus-within {
    border-color: var(--pm-primary, #666);
    outline: none;
    box-shadow: 0 0 0 1px var(--pm-primary, #666);
  }

  :global(.cm-scroller::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }
  :global(.cm-scroller::-webkit-scrollbar-track) {
    background: var(--pm-input-bg);
    border-radius: 4px;
  }
  :global(.cm-scroller::-webkit-scrollbar-thumb) {
    background: var(--pm-text-secondary);
    border-radius: 4px;
    border: none; 
  }
  :global(.cm-scroller::-webkit-scrollbar-thumb:hover) {
    background: var(--pm-text-primary);
  }
  :global(.cm-scroller::-webkit-scrollbar-corner) {
    background: transparent;
  }
</style>