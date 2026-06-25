// tailwind-custom-utilities.d.ts
declare module 'tailwind-custom-utilities' {
  import type { PluginCreator } from 'tailwindcss/types/config';

  // Can describe types in more detail if needed.
  // Minimum requirement is to declare that the package exports a Tailwind plugin:
  const plugin: PluginCreator;
  export default plugin;
}
