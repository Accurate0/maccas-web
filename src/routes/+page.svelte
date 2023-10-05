<script lang="ts">
  import type { PageServerData } from './$types';
  import { createClient, type ArrayElement } from '$lib';
  import * as Card from '$lib/components/ui/card';
  import moment from 'moment';
  import * as Accordion from '$lib/components/ui/accordion';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Alert from '$lib/components/ui/alert';
  import { Code } from 'radix-icons-svelte';

  const client = createClient();

  const isOfferValid = (deal: ArrayElement<PageServerData['deals']>) => {
    const from = moment.utc(deal.validFromUtc).add(2, 'hours');
    const to = moment.utc(deal.validToUtc).add(2, 'hours');
    const now = new Date();

    return moment.utc(now).isBetween(from, to);
  };

  const promiseMap: {
    [key: string]: Promise<any>;
  } = {};

  const addDeal = async (uuid: string) => {
    const params = {
      params: { query: { store: data.config!.storeId }, path: { deal_id: uuid } },
      headers: { Authorization: `Bearer ${data.jwt}` }
    };

    return client.POST('/deals/{deal_id}', params);
  };

  const handleOnClick = async (uuid: string) => {
    if (promiseMap[uuid] == undefined) {
      const promise = addDeal(uuid);
      promiseMap[uuid] = promise;
    } else {
      delete promiseMap[uuid];
      await client.DELETE('/deals/{deal_id}', {
        params: { query: { store: data.config!.storeId }, path: { deal_id: uuid } },
        headers: { Authorization: `Bearer ${data.jwt}` }
      });
    }
  };

  export let data: PageServerData;
</script>

<svelte:head>
  <title>Maccas</title>
</svelte:head>
<div>
  <div class="p-8">
    <Accordion.Root multiple>
      {#each data.deals ?? [] as deal}
        <Accordion.Item value={deal.dealUuid}>
          <Accordion.Trigger on:click={() => handleOnClick(deal.dealUuid)}>
            <Card.Header
              ><img alt={deal.shortName} src={deal.imageUrl} class="w-[90px]" /></Card.Header
            >
            <Card.Content>
              <Card.Title>{deal.shortName}</Card.Title>
              <Card.Description class="pt-2"
                >{isOfferValid(deal) ? '✅' : '❌'} {deal.count} available</Card.Description
              >
            </Card.Content>
          </Accordion.Trigger>
          <Accordion.Content>
            <Alert.Root>
              {#await promiseMap[deal.dealUuid]}
                <Skeleton class="h-6 w-auto" />
              {:then response}
                <div class="grid grid-cols-2">
                  <div class="self-center">
                    <Code />
                  </div>
                  <div>
                    <code>
                      {response.data.randomCode}
                    </code>
                  </div>
                </div>
              {/await}
            </Alert.Root>
          </Accordion.Content>
        </Accordion.Item>

        <!-- <Card.Footer>
            <Button class="w-full">Select</Button>
          </Card.Footer> -->
      {/each}
    </Accordion.Root>
  </div>
</div>
