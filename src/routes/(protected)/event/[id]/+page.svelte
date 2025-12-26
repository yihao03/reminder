<script lang="ts">
  const { data } = $props();
  const event = $derived(data.event);
</script>

<div class="mx-auto max-w-4xl p-4 bg-white border-b">
  <h1 class="text-2xl font-bold">{event.eventName}</h1>
  <div class="mt-4 space-y-2">
    <div class="flex flex-col lg:flex-row rounded-lg bg-gray-100 p-4 gap-4">
      <div class="flex-1">
        <p class="text-gray-600">
          <span class="font-semibold">Organiser:</span>
          {event.organiser}
        </p>
        <p class="text-gray-600">
          <span class="font-semibold">Location:</span>
          {event.isOnline ? "Online" : event.locationName}
        </p>
      </div>
      <div class="flex-1">
        <p class="text-gray-600">
          <span class="font-semibold">Start:</span>
          {new Date(event.startTime).toLocaleString()}
        </p>
        <p class="text-gray-600">
          <span class="font-semibold">End:</span>
          {new Date(event.endTime).toLocaleString()}
        </p>
      </div>
    </div>
    {#if event.details}
      <div class="mt-4">
        <p class="font-semibold text-gray-800">Details:</p>
        <p class="text-gray-600 whitespace-pre-wrap">{event.details}</p>
      </div>
    {/if}
    {#if event.users.length > 0}
      <div class="mt-4">
        <p class="font-semibold text-gray-800">
          Registered Users ({event.users.length}):
        </p>
        <ul class="mt-2 space-y-2">
          {#each event.users as user}
            <li class="flex items-center gap-2">
              {#if user.photoURL}
                <img
                  src={user.photoURL}
                  alt={user.displayName || user.email || "User"}
                  class="w-8 h-8 rounded-full"
                />
              {:else}
                <div
                  class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                >
                  <span class="text-sm text-gray-600"
                    >{(user.displayName ||
                      user.email ||
                      "?")[0].toUpperCase()}</span
                  >
                </div>
              {/if}
              <span class="text-gray-700"
                >{user.displayName || user.email || "Anonymous"}</span
              >
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
