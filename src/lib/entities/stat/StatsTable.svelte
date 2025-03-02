<script lang="ts">
  import type { Stat } from './types'

  export let stats: Stat[]
</script>

<div>
  {#if !Array.isArray(stats)}
    <p>No stats!</p>
  {:else if stats.length === 0}
    <p>No stats yet</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>IP</th>
          <th>User Agent</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {#each stats as stat}
          <tr>
            <td>{stat.country}</td>
            <td>{stat.ip}</td>
            <td>{stat.userAgent}</td>
            <td>{stat.timestamp}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
