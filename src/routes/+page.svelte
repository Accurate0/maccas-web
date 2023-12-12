<script lang="ts">
	import '@material/web/tabs/tabs';
	import '@material/web/icon/icon';
	import '@material/web/tabs/primary-tab';
	import '@material/web/progress/linear-progress';
	import '@material/web/list/list';
	import '@material/web/list/list-item';
	import '@material/web/iconbutton/icon-button';
	import '@material/web/divider/divider';
	import '@material/web/textfield/outlined-text-field';
	import '@material/web/button/filled-button';

	import type { PageData } from './$houdini';
	import { UserRole } from '$houdini';
	import { writable, type Writable } from 'svelte/store';
	import Code from '../components/code.svelte';

	export let data: PageData;

	export let form: import('./$types').ActionData;

	let activeTabIndex = 2;

	const onTabChange = (event: HTMLInputElement) => {
		// @ts-expect-error
		const newActiveTabIndex = event.target!.activeTabIndex as number;
		activeTabIndex = newActiveTabIndex;
	};

	let openDeals: Writable<{ [key: string]: string[] }> = writable({});
	const removeDeal = (uuid: string, id: string) => {
		openDeals.set({ ...$openDeals, [uuid]: $openDeals[uuid].filter((c) => c !== id) });
	};

	$: ({ Index } = data);
	$: showPoints =
		$Index.data?.user.role === UserRole.ADMIN || $Index.data?.user.role === UserRole.PRIVILEGED;
	$: pointsIndex = showPoints ? 1 : -1;
	$: locationIndex = showPoints ? 2 : 1;
</script>

<svelte:head>
	<title>Maccas</title>
</svelte:head>

<md-tabs id="tabs" on:change={onTabChange} {activeTabIndex}>
	<!-- FIXME: this md-tab and active should not be required... it gets added after HMR and is required for it to work -->
	<md-primary-tab md-tab="" active="" hasIcon>
		<md-icon slot="icon">savings</md-icon>
		Deals
	</md-primary-tab>
	{#if showPoints}
		<md-primary-tab md-tab="" hasIcon>
			<md-icon slot="icon">loyalty</md-icon>
			Points
		</md-primary-tab>
	{/if}
	<md-primary-tab md-tab="" hasIcon>
		<md-icon slot="icon">near_me</md-icon>
		Location
	</md-primary-tab>
</md-tabs>

{#if $Index.data}
	<div class="grid grid-flow-row gap-4 container mx-auto p-4">
		{#if activeTabIndex === 0}
			{#each $Index.data.deal.currentDeals as deal}
				<div class="border rounded p-4 grid grid-flow-row gap-4">
					<button
						class="grid grid-flow-col w-full gap-8 justify-between text-left"
						on:click={() => {
							const id = crypto.randomUUID();
							openDeals.update((c) => ({
								...c,
								[deal.dealUuid]: [...(c[deal.dealUuid] ?? []), id]
							}));
						}}
					>
						<div class="grid grid-flow-row">
							<h2 class="font-medium">{deal.shortName}</h2>
							<p><small class="text-xs">{deal.count} available</small></p>
						</div>
						<img src={deal.imageUrl} alt={deal.shortName} class="h-24" />
					</button>
					<Code deals={$openDeals[deal.dealUuid]} uuid={deal.dealUuid} remove={removeDeal} />
				</div>
			{/each}
		{/if}

		{#if activeTabIndex === pointsIndex}
			{#each $Index.data.points.filter((p) => p.totalPoints >= 2500) as points}
				<button class="grid grid-flow-col w-full gap-8 justify-between border rounded p-4">
					<h2>{points.totalPoints}</h2>
					<div class="flex">
						{#if points.totalPoints >= 2500}
							<md-icon>local_cafe</md-icon>
						{/if}

						{#if points.totalPoints >= 5000}
							<md-icon>icecream</md-icon>
						{/if}

						{#if points.totalPoints >= 7500}
							<md-icon>lunch_dining</md-icon>
						{/if}
					</div>
				</button>
			{/each}
		{/if}

		{#if activeTabIndex === locationIndex}
			<form method="POST" action="?/searchLocation">
				<div class="grid grid-flow-row gap-4 w-full max-w-md container mx-auto">
					<h3 class="text-xl font-medium">Location</h3>
					<md-outlined-text-field
						class="w-full max-w-sm items-center gap-2"
						label="Location"
						name="query"
						required
					/>
					<md-filled-button class="w-full max-w-sm items-center gap-2">Search</md-filled-button>
				</div>
			</form>
			{JSON.stringify(form?.location)}
		{/if}
	</div>
{/if}
