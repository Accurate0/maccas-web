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
        <Card.Root class="w-full mb-8">
          <Accordion.Item value={deal.dealUuid}>
            <Accordion.Trigger on:click={() => handleOnClick(deal.dealUuid)}>
              <div class="grid-flow-col grid gap-4 place-content-stretch w-full">
                <div class="pl-4">
                  <img alt={deal.shortName} src={deal.imageUrl} class="w-[90px] p-0" />
                </div>
                <div class="pl-4 pt-0 text-left">
                  <div>{deal.shortName}</div>
                  <div class="pt-2 text-left">
                    {isOfferValid(deal) ? '✅' : '❌'}
                    {deal.count} available
                  </div>
                </div>
              </div>
            </Accordion.Trigger>
            <Accordion.Content class="px-4">
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
        </Card.Root>

        <!-- <Card.Footer>
            <Button class="w-full">Select</Button>
          </Card.Footer> -->
      {/each}
    </Accordion.Root>
  </div>
</div>
