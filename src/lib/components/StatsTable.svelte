<script lang="ts">
  type Stat = {
    country: string
    ip: string
    userAgent: string
    timestamp: string
  }
  export let stats: Stat[]
</script>

<div>
  {#if stats.length === 0}
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
