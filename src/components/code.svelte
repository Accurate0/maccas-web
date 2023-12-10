<script lang="ts">
	export let deals: string[] | undefined;
</script>

{#if (deals ?? []).length > 0}
	<md-list class="rounded pt-0 pb-0">
		{#each deals ?? [] as id, index}
			<md-list-item type="text">
				<div class="flex flex-row gap-8 justify-between items-center">
					<div>
						<md-linear-progress indeterminate></md-linear-progress>
					</div>
					<div>
						<md-icon-button>
							<md-icon>refresh</md-icon>
						</md-icon-button>
						<md-icon-button>
							<md-icon>close</md-icon>
						</md-icon-button>
					</div>
				</div>
			</md-list-item>
			{#if index != (deals ?? []).length - 1}
				<md-divider inset-start inset-end></md-divider>
			{/if}
		{/each}
	</md-list>
{/if}
