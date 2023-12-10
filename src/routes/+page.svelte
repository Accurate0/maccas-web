<script lang="ts">
	import '@material/web/tabs/tabs';
	import '@material/web/icon/icon';
	import '@material/web/tabs/primary-tab';
	import '@material/web/progress/linear-progress';
	import '@material/web/list/list';
	import '@material/web/list/list-item';
	import '@material/web/iconbutton/icon-button';
	import '@material/web/divider/divider';

	import type { PageData } from './$houdini';
	import { UserRole } from '$houdini';
	import { writable, type Writable } from 'svelte/store';
	import Code from '../components/code.svelte';
	export let data: PageData;
	let activeTabIndex = 0;

	const onTabChange = (event: HTMLInputElement) => {
		// @ts-expect-error
		const newActiveTabIndex = event.target!.activeTabIndex as number;
		activeTabIndex = newActiveTabIndex;
	};

	let openDeals: Writable<{ [key: string]: string[] }> = writable({});

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
					<Code deals={$openDeals[deal.dealUuid]} />
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
			<div>Location</div>
		{/if}
	</div>
{/if}
