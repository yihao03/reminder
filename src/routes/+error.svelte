<script lang="ts">
  import { page } from "$app/state";
  import "./layout.css";
</script>

<div
  class="w-full h-screen flex flex-col items-center justify-center space-y-6 p-8 bg-gray-50"
>
  <div class="flex space-y-4 max-w-md space-x-10">
    <div class="flex flex-col items-end space-y-4">
      <h1 class="text-3xl text-right font-semibold text-red-500">
        Oops! Something went wrong
      </h1>
      <a href="/" class="text-blue-500 hover:underline"> Go back to Home </a>
    </div>
    <div>
      <p class="text-6xl font-bold text-gray-600">
        {`${page.status}`}
      </p>
      <p class="text-gray-700 text-lg">
        {`${page.error?.message || "An unexpected error occurred."}`}
      </p>
      <p class="text-gray-500 text-sm">
        Please try again later or contact support if the issue persists.
      </p>
    </div>
  </div>
</div>
